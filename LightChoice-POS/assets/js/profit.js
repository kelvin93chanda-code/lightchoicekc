// =====================================
// LIGHT CHOICE POS
// PROFIT ENGINE
// =====================================

// Today's Sales
function getTodaySales() {

    const sales = loadSales();

    const today = new Date().toLocaleDateString();

    let total = 0;

    sales.forEach(sale => {

        if (sale.date.includes(today)) {

            total += Number(sale.total);

        }

    });

    return total;

}

// Today's Expenses
function getTodayExpenses() {

    const expenses = loadExpenses();

    const today = new Date().toLocaleDateString();

    let total = 0;

    expenses.forEach(expense => {

        if (expense.date === today) {

            total += Number(expense.amount);

        }

    });

    return total;

}

// Today's Profit
function getTodayProfit() {

    return getTodaySales() - getTodayExpenses();

}

// =====================================
// WEEKLY SALES
// =====================================

function getWeeklySales() {

    const sales = loadSales();

    const weekAgo = new Date();

    weekAgo.setDate(weekAgo.getDate() - 7);

    let total = 0;

    sales.forEach(sale => {

        if (new Date(sale.date) >= weekAgo) {

            total += Number(sale.total);

        }

    });

    return total;

}

// Weekly Expenses
function getWeeklyExpenses() {

    const expenses = loadExpenses();

    const weekAgo = new Date();

    weekAgo.setDate(weekAgo.getDate() - 7);

    let total = 0;

    expenses.forEach(expense => {

        if (new Date(expense.createdAt) >= weekAgo) {

            total += Number(expense.amount);

        }

    });

    return total;

}

// Weekly Profit
function getWeeklyProfit() {

    return getWeeklySales() - getWeeklyExpenses();

}

// =====================================
// MONTHLY PROFIT
// =====================================

function getMonthlySales() {

    const sales = loadSales();

    const month = new Date().getMonth();

    const year = new Date().getFullYear();

    let total = 0;

    sales.forEach(sale => {

        const d = new Date(sale.date);

        if (d.getMonth() === month && d.getFullYear() === year) {

            total += Number(sale.total);

        }

    });

    return total;

}

function getMonthlyExpenses() {

    const expenses = loadExpenses();

    const month = new Date().getMonth();

    const year = new Date().getFullYear();

    let total = 0;

    expenses.forEach(expense => {

        const d = new Date(expense.createdAt);

        if (d.getMonth() === month && d.getFullYear() === year) {

            total += Number(expense.amount);

        }

    });

    return total;

}

function getMonthlyProfit() {

    return getMonthlySales() - getMonthlyExpenses();

}