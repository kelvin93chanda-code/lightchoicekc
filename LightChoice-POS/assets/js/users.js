// =====================================
// LIGHT CHOICE POS
// USER MANAGEMENT
// =====================================

// Default Users

const defaultUsers = [

    {
        id: 1,
        username: "admin",
        password: "admin123",
        fullname: "Administrator",
        role: "Admin",
        active: true
    },

    {
        id: 2,
        username: "manager",
        password: "manager123",
        fullname: "Store Manager",
        role: "Manager",
        active: true
    },

    {
        id: 3,
        username: "cashier1",
        password: "cashier123",
        fullname: "Cashier One",
        role: "Cashier",
        active: true
    }

];

// =====================================
// Load Users
// =====================================

function loadUsers() {

    let users = JSON.parse(localStorage.getItem("users"));

    if (!users) {

        users = defaultUsers;

        localStorage.setItem(
            "users",
            JSON.stringify(users)
        );

    }

    return users;

}

// =====================================
// Save Users
// =====================================

function saveUsers(users) {

    localStorage.setItem(
        "users",
        JSON.stringify(users)
    );

}

// =====================================
// Current Logged User
// =====================================

function getCurrentUser() {

    return JSON.parse(
        localStorage.getItem("currentUser")
    );

}

// =====================================
// Login
// =====================================

function login(username, password) {

    const users = loadUsers();

    const user = users.find(user =>

        user.username === username &&
        user.password === password

    );

    if (!user) {

        return false;

    }

    // Block inactive accounts
    if (!user.active) {

        alert("This account is inactive. Contact the administrator.");

        return false;

    }

    localStorage.setItem(
        "currentUser",
        JSON.stringify(user)
    );

    return true;

}

// =====================================
// LOGOUT
// =====================================

function logoutUser(){

    if(!confirm("Are you sure you want to logout?")) return;

    // Remove logged in user
    localStorage.removeItem("currentUser");

    // Redirect to login page
    window.location.href = "pages/login.html";

}

// =====================================
// Check Permission
// =====================================

function hasRole(...roles) {

    const currentUser = getCurrentUser();

    if (!currentUser) return false;

    return roles.includes(currentUser.role);

}