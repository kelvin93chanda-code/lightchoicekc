document.addEventListener("DOMContentLoaded", () => {

    applyMenuPermissions();

    if(typeof loadDashboardStats==="function"){

    loadDashboardStats();

}

});

document.addEventListener("DOMContentLoaded", () => {

    const user = getCurrentUser();

    if(user){

        document.getElementById("logged-user").textContent =
            user.fullname;

        document.getElementById("logged-role").textContent =
            user.role;

    }

});