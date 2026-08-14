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

function currentUser(){

    return JSON.parse(

        localStorage.getItem("currentUser")

    );

}

// =====================================
// CHECK PERMISSION
// =====================================

function hasPermission(page){

    const user = currentUser();

    if(!user){

        return false;

    }

    const permissions =

        PERMISSIONS[user.role];

    if(!permissions){

        return false;

    }

    if(permissions.includes("*")){

        return true;

    }

    return permissions.includes(page);

}

// =====================================
// PROTECT PAGE
// =====================================

function protectPage(page){

    if(!hasPermission(page)){

        alert(

            "Access denied.\n\nYou do not have permission to open this page."

        );

        window.location.href="dashboard.html";

    }

}

// =====================================
// SHOW ONLY ALLOWED MENU ITEMS
// =====================================

function applyMenuPermissions(){

    const pages = [

        "dashboard",
        "pos",
        "products",
        "categories",
        "inventory",
        "kitchen",
        "reports",
        "employees",
        "expenses",
        "backup",
        "shifts",
        "settings"

    ];

    pages.forEach(page => {

        const menu =

            document.getElementById(
                "menu-" + page
            );

        if(!menu) return;

        if(hasPermission(page)){

            menu.style.display = "";

        }

        else{

            menu.style.display = "none";

        }

    });

}