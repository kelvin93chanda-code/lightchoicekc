// =====================================
// DOWNLOAD BACKUP
// =====================================

function downloadBackup() {

    const backup = {

        products:
            JSON.parse(localStorage.getItem("products")) || [],

        sales:
            JSON.parse(localStorage.getItem("sales")) || [],

        expenses:
            JSON.parse(localStorage.getItem("expenses")) || [],

        users:
            JSON.parse(localStorage.getItem("users")) || [],

        shiftHistory:
            JSON.parse(localStorage.getItem("shiftHistory")) || [],

        currentShift:
            JSON.parse(localStorage.getItem("currentShift")) || null,

        backupDate:
            new Date().toLocaleString(),

        version:
            "Light Choice POS v1.0"

    };

    const json =
        JSON.stringify(backup, null, 4);

    const blob =
        new Blob([json], { type: "application/json" });

    const url =
        URL.createObjectURL(blob);

    const a =
        document.createElement("a");

    const now = new Date();

    const fileName =
        "LightChoice_Backup_" +
        now.getFullYear() + "-" +
        String(now.getMonth() + 1).padStart(2, "0") + "-" +
        String(now.getDate()).padStart(2, "0") + "_" +
        String(now.getHours()).padStart(2, "0") +
        String(now.getMinutes()).padStart(2, "0") +
        String(now.getSeconds()).padStart(2, "0") +
        ".json";

    a.href = url;

    a.download = fileName;

    document.body.appendChild(a);

    a.click();

    document.body.removeChild(a);

    URL.revokeObjectURL(url);

    localStorage.setItem(
        "lastBackup",
        new Date().toLocaleString()
    );
loadBackupInfo();
checkBackupStatus();

alert("Backup downloaded successfully.");

}

// =====================================
// RESTORE BACKUP
// =====================================

function restoreBackup() {

    const fileInput =
        document.getElementById("backup-file");

    if (!fileInput.files.length) {

        alert("Please select a backup file.");

        return;

    }

    const file = fileInput.files[0];

    const reader = new FileReader();

    reader.onload = function (event) {

        try {

            const backup = JSON.parse(event.target.result);

            // Validate backup
            if (
                backup.products === undefined ||
                backup.sales === undefined ||
                backup.users === undefined
            ) {

                alert("Invalid backup file.");

                return;

            }

            // Restore Products
            localStorage.setItem(
                "products",
                JSON.stringify(backup.products)
            );

            // Restore Sales
            localStorage.setItem(
                "sales",
                JSON.stringify(backup.sales)
            );

            // Restore Expenses
            localStorage.setItem(
                "expenses",
                JSON.stringify(backup.expenses || [])
            );

            // Restore Users
            localStorage.setItem(
                "users",
                JSON.stringify(backup.users)
            );

            // Restore Shift History
            localStorage.setItem(
                "shiftHistory",
                JSON.stringify(backup.shiftHistory || [])
            );

            // Restore Current Shift
            if (backup.currentShift) {

                localStorage.setItem(
                    "currentShift",
                    JSON.stringify(backup.currentShift)
                );

            } else {

                localStorage.removeItem("currentShift");

            }

            // Save restore date
            localStorage.setItem(
                "lastBackup",
                new Date().toLocaleString()
            );

            alert("Backup restored successfully!\n\nThe system will now reload.");

            loadBackupInfo();
            loadBackupInfo();

            checkBackupStatus();

            location.reload();

        }

        catch (error) {

            console.error(error);

            alert("The selected file is not a valid Light Choice POS backup.");

        }

    };

    reader.readAsText(file);

}

// =====================================
// LOAD BACKUP INFORMATION
// =====================================

function loadBackupInfo(){

    document.getElementById("last-backup").textContent =
        localStorage.getItem("lastBackup") || "Never";

    document.getElementById("system-version").textContent =
        "Light Choice POS v1.0";

    document.getElementById("backup-products").textContent =
        (JSON.parse(localStorage.getItem("products")) || []).length;

    document.getElementById("backup-sales").textContent =
        (JSON.parse(localStorage.getItem("sales")) || []).length;

    document.getElementById("backup-expenses").textContent =
        (JSON.parse(localStorage.getItem("expenses")) || []).length;

    document.getElementById("backup-users").textContent =
        (JSON.parse(localStorage.getItem("users")) || []).length;

    document.getElementById("backup-shifts").textContent =
        (JSON.parse(localStorage.getItem("shiftHistory")) || []).length;

}

document.addEventListener("DOMContentLoaded", () => {

    loadBackupInfo();

    checkBackupStatus();

});

// =====================================
// CHECK BACKUP STATUS
// =====================================

function checkBackupStatus(){

    const status =
        document.getElementById("backup-status");

    const message =
        document.getElementById("backup-message");

    const lastBackup =
        localStorage.getItem("lastBackup");

    if(!lastBackup){

        status.textContent = "No Backup Found";

        status.className = "status-danger";

        message.textContent =
            "Create your first backup to protect your business data.";

        return;

    }

    const lastDate = new Date(lastBackup);

    const today = new Date();

    const days =
        Math.floor(
            (today - lastDate) /
            (1000 * 60 * 60 * 24)
        );

    if(days <= 3){

        status.textContent = "Backup Status: Up to Date";

        status.className = "status-good";

        message.textContent =
            "Last backup was " + days + " day(s) ago.";

    }

    else if(days <= 7){

        status.textContent = "Backup Status: Reminder";

        status.className = "status-warning";

        message.textContent =
            "Last backup was " + days + " day(s) ago. Consider creating a new backup.";

    }

    else{

        status.textContent = "Backup Status: Overdue";

        status.className = "status-danger";

        message.textContent =
            "Last backup was " + days + " day(s) ago. Please back up your data.";

    }

}