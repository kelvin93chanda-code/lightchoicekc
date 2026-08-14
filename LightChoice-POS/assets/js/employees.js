// =====================================
// EMPLOYEE MANAGEMENT
// =====================================

document.addEventListener("DOMContentLoaded", () => {

    const user = getCurrentUser();

    if (user) {

        document.getElementById("logged-user").textContent =
            user.fullname;

        document.getElementById("logged-role").textContent =
            user.role;

    }

    loadEmployeeTable();

    document.getElementById("search-user")
        .addEventListener("input", loadEmployeeTable);

});

// =====================================
// LOAD EMPLOYEES
// =====================================

function loadEmployeeTable() {

    const users = loadUsers();

    const search =
        document.getElementById("search-user")
        .value.toLowerCase();

    const table =
        document.getElementById("employee-table");

    table.innerHTML = "";

    const filtered = users.filter(user =>

        user.fullname.toLowerCase().includes(search) ||
        user.username.toLowerCase().includes(search) ||
        user.role.toLowerCase().includes(search)

    );

    if (filtered.length === 0) {

        table.innerHTML = `

        <tr>
            <td colspan="5" style="text-align:center;padding:20px;">
                No employees found.
            </td>
        </tr>`;

        return;

    }

    filtered.forEach(user => {

        table.innerHTML += `

        <tr>

            <td>${user.fullname}</td>

            <td>${user.username}</td>

            <td>
                <span class="role-badge ${user.role.toLowerCase()}">
                    ${user.role}
                </span>
            </td>

            <td>
                <span class="status-badge ${user.active ? "active" : "inactive"}">
                    ${user.active ? "Active" : "Inactive"}
                </span>
            </td>

            <td class="actions"> <button class="edit-btn" onclick="editUser(${user.id})"> Edit </button> <button class="reset-btn" onclick="resetPassword(${user.id})"> Reset </button> <button class="status-btn" onclick="toggleEmployeeStatus(${user.id})"> ${user.active ? "Deactivate" : "Activate"} </button> </td>

        </tr>`;

    });

}

// =====================================
// OPEN MODAL
// =====================================

function openEmployeeModal() {

    document.getElementById("modal-title").textContent =
        "Add Employee";

    document.getElementById("employee-id").value = "";

    document.getElementById("employee-name").value = "";

    document.getElementById("employee-username").value = "";

    document.getElementById("employee-password").value = "";

    document.getElementById("employee-role").value = "Cashier";

    document.getElementById("employee-status").value = "true";

    document.getElementById("employee-modal").style.display = "flex";

}

// =====================================
// CLOSE MODAL
// =====================================

function closeEmployeeModal() {

    document.getElementById("employee-modal").style.display = "none";

}

// =====================================
// SAVE EMPLOYEE
// =====================================

function saveEmployee() {

    const id =
        document.getElementById("employee-id").value;

    const fullname =
        document.getElementById("employee-name").value.trim();

    const username =
        document.getElementById("employee-username").value.trim();

    const password =
        document.getElementById("employee-password").value;

    const role =
        document.getElementById("employee-role").value;

    const active =
        document.getElementById("employee-status").value === "true";

    if (!fullname || !username || !password) {

        alert("Please complete all fields.");

        return;

    }

    const users = loadUsers();

    const duplicate = users.find(user =>

        user.username === username &&
        user.id != id

    );

    if (duplicate) {

        alert("Username already exists.");

        return;

    }

    if (id) {

        const employee = users.find(user => user.id == id);

        employee.fullname = fullname;
        employee.username = username;
        employee.password = password;
        employee.role = role;
        employee.active = active;

    } else {

        users.push({

            id: Date.now(),
            fullname,
            username,
            password,
            role,
            active

        });

    }

    saveUsers(users);

    closeEmployeeModal();

    loadEmployeeTable();

    alert("Employee saved successfully.");

}

// =====================================
// EDIT EMPLOYEE
// =====================================

function editUser(id) {

    const users = loadUsers();

    const employee = users.find(user => user.id == id);

    if (!employee) return;

    document.getElementById("modal-title").textContent =
        "Edit Employee";

    document.getElementById("employee-id").value =
        employee.id;

    document.getElementById("employee-name").value =
        employee.fullname;

    document.getElementById("employee-username").value =
        employee.username;

    document.getElementById("employee-password").value =
        employee.password;

    document.getElementById("employee-role").value =
        employee.role;

    document.getElementById("employee-status").value =
        employee.active.toString();

    document.getElementById("employee-modal").style.display =
        "flex";

}

// =====================================
// RESET PASSWORD
// =====================================

function resetPassword(id) {

    const users = loadUsers();

    const employee = users.find(user => user.id == id);

    if (!employee) return;

    const newPassword = prompt(

        "Enter new password for " + employee.fullname

    );

    if (!newPassword || newPassword.trim() === "") {

        return;

    }

    employee.password = newPassword.trim();

    saveUsers(users);

    alert("Password reset successfully.");

}

// =====================================
// ACTIVATE / DEACTIVATE EMPLOYEE
// =====================================

function toggleEmployeeStatus(id) {

    const currentUser = getCurrentUser();

    let users = loadUsers();

    const employee = users.find(user => user.id == id);

    if (!employee) return;

    // Prevent deactivating yourself
    if (currentUser && currentUser.id == id) {

        alert("You cannot deactivate your own account while logged in.");

        return;

    }

    // Prevent deactivating the last active Admin
    if (employee.role === "Admin" && employee.active) {

        const activeAdmins = users.filter(user =>

            user.role === "Admin" && user.active

        ).length;

        if (activeAdmins === 1) {

            alert("The last active Admin cannot be deactivated.");

            return;

        }

    }

    employee.active = !employee.active;

    saveUsers(users);

    loadEmployeeTable();

    alert(

        employee.fullname +

        (employee.active
            ? " has been activated."
            : " has been deactivated.")

    );

}

// =====================================
// DELETE EMPLOYEE
// =====================================

function deleteUser(id) {

    const currentUser = getCurrentUser();

    if (currentUser && currentUser.id == id) {

        alert("You cannot delete your own account while logged in.");

        return;

    }

    let users = loadUsers();

    const employee = users.find(user => user.id == id);

    if (!employee) return;

    const adminCount = users.filter(user =>

        user.role === "Admin" &&
        user.active

    ).length;

    if (employee.role === "Admin" && adminCount === 1) {

        alert("The last Admin cannot be deleted.");

        return;

    }

    if (!confirm("Delete " + employee.fullname + "?")) {

        return;

    }

    users = users.filter(user => user.id != id);

    saveUsers(users);

    loadEmployeeTable();

    alert("Employee deleted successfully.");

}