// =====================================
// LIGHT CHOICE POS
// ROLE PERMISSIONS
// =====================================

const PERMISSIONS = {

    Admin: [
        "*"
    ],

    Manager: [
        "dashboard",
        "pos",
        "products",
        "categories",
        "inventory",
        "kitchen",
        "reports",
        "expenses",
        "shifts"
    ],

    Cashier: [
        "dashboard",
        "pos",
        "shifts"
    ]

};

// =====================================
// GET CURRENT USER
// =====================================

function getCurrentUser() {

    return JSON.parse(
        localStorage.getItem("currentUser")
    );

}

// =====================================
// ROLE CHECKERS
// =====================================

function isAdmin() {

    const user = getCurrentUser();

    return user && user.role === "Admin";

}

function isManager() {

    const user = getCurrentUser();

    return user && user.role === "Manager";

}

function isCashier() {

    const user = getCurrentUser();

    return user && user.role === "Cashier";

}

// =====================================
// CHECK PERMISSION
// =====================================

function hasPermission(page) {

    const user = getCurrentUser();

    if (!user) return false;

    const permissions =
        PERMISSIONS[user.role];

    if (!permissions) return false;

    // Admin has full access
    if (permissions.includes("*")) {

        return true;

    }

    return permissions.includes(page);

}

// =====================================
// PROTECT PAGE
// =====================================

function protectPage(page){

    const user = getCurrentUser();

    if(!user){

        window.location.href = "login.html";
        return;

    }

    const role = user.role;

    const allowed = PERMISSIONS[role] || [];

    if(allowed.includes("*") || allowed.includes(page)){

        return;

    }

    alert("Access denied.");

    // Redirect to the NEW dashboard
 window.location.href = "../index.html";

}

// =====================================
// APPLY MENU PERMISSIONS
// =====================================

function applyMenuPermissions() {

    const menuMap = {

        dashboard: "menu-dashboard",
        pos: "menu-pos",
        products: "menu-products",
        categories: "menu-categories",
        inventory: "menu-inventory",
        kitchen: "menu-kitchen",
        reports: "menu-reports",
        employees: "menu-employees",
        expenses: "menu-expenses",
        shifts: "menu-shifts",
        backup: "menu-backup",
        settings: "menu-settings"

    };

    Object.keys(menuMap).forEach(permission => {

        const element =
            document.getElementById(menuMap[permission]);

        if (!element) return;

        if (!hasPermission(permission)) {

            element.style.display = "none";

        }

    });

}