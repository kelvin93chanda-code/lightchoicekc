// =====================================
// LIGHT CHOICE POS
// SHIFT MANAGEMENT
// =====================================

// Get current logged in user
function getLoggedUser() {

    return JSON.parse(
        localStorage.getItem("currentUser")
    );

}

// Get current shift
function getCurrentShift() { return JSON.parse( localStorage.getItem("currentShift") ); 

    if (typeof updateShiftBanner === "function") { updateShiftBanner(); }
}

// Save current shift
function saveCurrentShift(shift) {

    localStorage.setItem(
        "currentShift",
        JSON.stringify(shift)
    );

}

function showShiftModal() { const modal = document.getElementById("shift-modal"); if (modal) { modal.style.display = "flex"; } } function closeShiftModal() { const modal = document.getElementById("shift-modal"); if (modal) { modal.style.display = "none"; } }

// Get shift history
function getShiftHistory() {

    return JSON.parse(
        localStorage.getItem("shiftHistory")
    ) || [];

}

// Save shift history
function saveShiftHistory(history) {

    localStorage.setItem(
        "shiftHistory",
        JSON.stringify(history)
    );

}

// =====================================
// OPEN SHIFT
// =====================================

function openShift() {

    // Prevent two open shifts
    if (getCurrentShift()) {

        alert("There is already an active shift.");

        return;

    }

    const openingCash = parseFloat(

        document.getElementById("opening-cash").value

    );

    if (isNaN(openingCash)) {

        alert("Please enter opening cash.");

        return;

    }

    const user = getLoggedUser();

    if (!user) {

        alert("Please login first.");

        return;

    }

    const shift = {

        id: Date.now(),

        cashier: user.fullname,

        username: user.username,

        role: user.role,

        openingCash: openingCash,

        closingCash: 0,

        sales: 0,

        expectedCash: openingCash,

        difference: 0,

        startTime: new Date().toLocaleString(),

        endTime: "",

        status: "Open"

    };

    saveCurrentShift(shift);

closeShiftModal();

loadShift();

if (typeof updateShiftBanner === "function") {

    updateShiftBanner();

}

alert("Shift opened successfully.");

}

// =====================================
// LOAD SHIFT
// =====================================
// =====================================
// LOAD SHIFT
// =====================================

function loadShift() {

    const shift = getCurrentShift();

    // If this page does not contain shift details, skip
    const statusEl = document.getElementById("shift-status");

    if (!statusEl) return;

    if (!shift) {

        statusEl.textContent = "No Active Shift";

        document.getElementById("cashier-name").textContent = "-";
        document.getElementById("shift-start").textContent = "-";
        document.getElementById("shift-sales").textContent = "K0.00";

        document.getElementById("opening-cash").disabled = false;

        return;

    }

    statusEl.textContent = "Shift Open";

    document.getElementById("cashier-name").textContent = shift.cashier;
    document.getElementById("shift-start").textContent = shift.startTime;
    document.getElementById("shift-sales").textContent =
        "K" + Number(shift.sales).toFixed(2);

    document.getElementById("opening-cash").value = shift.openingCash;
    document.getElementById("opening-cash").disabled = true;

}
// =====================================
// LOAD SHIFT HISTORY
// =====================================

function loadShiftHistory() {

    const body = document.getElementById("shift-history-body");

    if (!body) return;

    const history = getShiftHistory();

    body.innerHTML = "";

    if (history.length === 0) {

        body.innerHTML = `
            <tr>
                <td colspan="9" style="text-align:center;padding:30px;">
                    No shifts recorded.
                </td>
            </tr>
        `;

        return;

    }

    history.forEach(shift => {

        const openingCash = Number(shift.openingCash || 0);
        const sales = Number(shift.sales || 0);
        const expectedCash = Number(shift.expectedCash || 0);
        const closingCash = Number(shift.closingCash || 0);
        const difference = Number(shift.difference || 0);

        let cls = "zero";

        if (difference > 0) cls = "positive";
        else if (difference < 0) cls = "negative";

        body.innerHTML += `
            <tr>

                <td>${shift.cashier || "-"}</td>

                <td>${shift.startTime || "-"}</td>

                <td>${shift.endTime || "-"}</td>

                <td>K${openingCash.toFixed(2)}</td>

                <td>K${sales.toFixed(2)}</td>

                <td>K${expectedCash.toFixed(2)}</td>

                <td>K${closingCash.toFixed(2)}</td>

                <td class="${cls}">
                    K${difference.toFixed(2)}
                </td>

                <td>${shift.status || "-"}</td>

            </tr>
        `;

    });

}

// =====================================
// START PAGE
// =====================================

document.addEventListener("DOMContentLoaded", () => {

    if(document.getElementById("shift-status")){

        loadShift();

    }

    if(document.getElementById("shift-history-body")){

        loadShiftHistory();

    }

});

// =====================================
// CLOSE SHIFT
// =====================================

function closeShift() {

    const shift = getCurrentShift();

    if (!shift) {

        alert("No active shift.");

        return;

    }

    const closingCash = parseFloat(

        document.getElementById("closing-cash").value

    );

    if (isNaN(closingCash)) {

        alert("Enter the closing cash.");

        return;

    }

    shift.closingCash = closingCash;

    shift.expectedCash =
        shift.openingCash + shift.sales;

    shift.difference =
        closingCash - shift.expectedCash;

    shift.endTime =
        new Date().toLocaleString();

    shift.status = "Closed";

    const history = getShiftHistory();

    history.push({
    ...shift
});

    saveShiftHistory(history);

    localStorage.removeItem("currentShift");

    window.open("shift-report.html", "_blank");

    document.getElementById("opening-cash").value = "";

    document.getElementById("closing-cash").value = "";

    document.getElementById("opening-cash").disabled = false;

    loadShift();

}

