// =====================================
// LOGIN
// =====================================

function loginUser() {

    const username =
        document.getElementById("username").value.trim();

    const password =
        document.getElementById("password").value;

    const errorEl =
        document.getElementById("login-error");

    errorEl.textContent = "";

    // Validation
    if (username === "" || password === "") {

        errorEl.textContent =
            "Enter username and password.";

        return;

    }

    // Authenticate
    if (login(username, password)) {

        // Redirect ALL users to dashboard
        window.location.href = "../index.html";

    } else {

        errorEl.textContent =
            "Invalid username or password.";

    }

}