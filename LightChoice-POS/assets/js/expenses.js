// =====================================
// LIGHT CHOICE POS
// EXPENSE MANAGEMENT
// =====================================

// Load Expenses

function loadExpenses(){

    return JSON.parse(

        localStorage.getItem("expenses")

    ) || [];

}

// Save Expenses

function saveExpenses(expenses){

    localStorage.setItem(

        "expenses",

        JSON.stringify(expenses)

    );

}

// Save One Expense

// =====================================
// SAVE EXPENSE
// =====================================

function saveExpense() {

    const name =
        document.getElementById("expense-name").value.trim();

    const category =
        document.getElementById("expense-category").value;

    const amount =
        parseFloat(document.getElementById("expense-amount").value);

    const description =
        document.getElementById("expense-description").value.trim();

    if (name === "") {

        alert("Please enter the expense name.");

        return;

    }

    if (isNaN(amount) || amount <= 0) {

        alert("Please enter a valid amount.");

        return;

    }

    let user = null;

    if (typeof getCurrentUser === "function") {

        user = getCurrentUser();

    }

    const expense = {

        id: Date.now(),

        name: name,

        category: category,

        amount: amount,

        description: description,

        recordedBy: user ? user.fullname : "Unknown",

        username: user ? user.username : "",

        date: new Date().toLocaleDateString(),

        time: new Date().toLocaleTimeString(),

        createdAt: new Date().toISOString()

    };

    const expenses = loadExpenses();

    expenses.push(expense);

    saveExpenses(expenses);

    alert("Expense saved successfully.");

    clearExpenseForm();

    if(typeof loadDashboard === "function"){

    loadDashboard();

}

}

// =====================================
// CLEAR FORM
// =====================================

function clearExpenseForm() {

    document.getElementById("expense-name").value = "";

    document.getElementById("expense-category").selectedIndex = 0;

    document.getElementById("expense-amount").value = "";

    document.getElementById("expense-description").value = "";

}

// =====================================
// LOAD EXPENSE HISTORY
// =====================================

function loadExpenseHistory() {

    const body = document.getElementById("expense-history-body");

    if (!body) return;

    const expenses = loadExpenses();

    body.innerHTML = "";

    if (expenses.length === 0) {

        body.innerHTML = `

        <tr>

            <td colspan="7"
                style="text-align:center;padding:30px;">

                No expenses recorded.

            </td>

        </tr>

        `;

        return;

    }

    expenses.forEach(expense => {

        body.innerHTML += `

        <tr>

            <td>${expense.date}</td>

            <td>${expense.time}</td>

            <td>${expense.name}</td>

            <td>${expense.category}</td>

            <td class="amount">
                K${Number(expense.amount).toFixed(2)}
            </td>

            <td>${expense.recordedBy}</td>

            <td>${expense.description || "-"}</td>

        </tr>

        `;

    });

}

// =====================================
// START PAGE
// =====================================

document.addEventListener("DOMContentLoaded", () => {

    if (document.getElementById("expense-history-body")) {

        loadExpenseHistory();

    }

});

// =====================================
// SEARCH EXPENSES
// =====================================

document.addEventListener("DOMContentLoaded", () => {

    const search = document.getElementById("search-expense");

    if (!search) return;

    search.addEventListener("input", function () {

        const keyword = this.value.toLowerCase();

        const rows = document.querySelectorAll("#expense-history-body tr");

        rows.forEach(row => {

            row.style.display = row.textContent
                .toLowerCase()
                .includes(keyword)

                ? ""

                : "none";

        });

    });

});