// =====================================
// LIGHT CHOICE POS
// REPORTS
// =====================================

function output(html){

    document.getElementById("report-output").innerHTML = html;

}
function dailySalesReport(){

    const sales = JSON.parse(localStorage.getItem("sales")) || [];

    let html = `

    <h2>Daily Sales Report</h2>

    <table>

        <tr>
            <th>Invoice</th>
            <th>Payment</th>
            <th>Total</th>
        </tr>

    `;

    let total = 0;
    let found = false;

    // Use today's date
    const today = new Date();

    sales.forEach(sale => {

        const d = new Date(sale.date);

        if(
            d.getFullYear() === today.getFullYear() &&
            d.getMonth() === today.getMonth() &&
            d.getDate() === today.getDate()
        ){

            found = true;

            total += Number(sale.total || 0);

            html += `

            <tr>
                <td>${sale.invoice}</td>
                <td>${sale.payment || 'Cash'}</td>
                <td>K${Number(sale.total || 0).toFixed(2)}</td>
            </tr>

            `;

        }

    });

    if(!found){

        html += `

        <tr>
            <td colspan="3" style="text-align:center;padding:20px;">
                No sales recorded today.
            </td>
        </tr>

        `;

    }

    html += `

    </table>

    <h3 style="margin-top:20px;">
        Total Sales: K${total.toFixed(2)}
    </h3>

    `;

    document.getElementById("report-output").innerHTML = html;

}

// =====================================
// EXPENSE REPORT
// =====================================

function expenseReport() {

    const expenses = loadExpenses();

    let html = `

    <h2>Expense Report</h2>

    <table>

        <tr>

            <th>Date</th>

            <th>Name</th>

            <th>Category</th>

            <th>Recorded By</th>

            <th>Amount</th>

        </tr>

    `;

    let total = 0;

    expenses.forEach(expense => {

        total += Number(expense.amount);

        html += `

        <tr>

            <td>${expense.date}</td>

            <td>${expense.name}</td>

            <td>${expense.category}</td>

            <td>${expense.recordedBy}</td>

            <td>K${Number(expense.amount).toFixed(2)}</td>

        </tr>

        `;

    });

    html += `

    </table>

    <h3>Total Expenses : K${total.toFixed(2)}</h3>

    `;

    output(html);

}

function getTodaySales(){

    const sales = loadSales();

    const today = new Date();

    return sales
        .filter(sale => {

            const d = new Date(sale.date);

            return (
                d.getFullYear() === today.getFullYear() &&
                d.getMonth() === today.getMonth() &&
                d.getDate() === today.getDate()
            );

        })
        .reduce((sum, sale) => sum + Number(sale.total || 0), 0);

}

function getTodayExpenses(){

    const expenses = loadExpenses();

    const today = new Date();

    return expenses
        .filter(expense => {

            const d = new Date(expense.date);

            return (
                d.getFullYear() === today.getFullYear() &&
                d.getMonth() === today.getMonth() &&
                d.getDate() === today.getDate()
            );

        })
        .reduce((sum, expense) => sum + Number(expense.amount || 0), 0);

}

function getTodayProfit(){

    return getTodaySales() - getTodayExpenses();

}

// =====================================
// PROFIT REPORT
// =====================================
function profitReport(){

    const sales = JSON.parse(localStorage.getItem("sales")) || [];
    const expenses = JSON.parse(localStorage.getItem("expenses")) || [];

    const today = new Date();

    let totalSales = 0;
    let totalExpenses = 0;

    sales.forEach(sale => {

        const d = new Date(sale.date);

        if(
            d.getFullYear() === today.getFullYear() &&
            d.getMonth() === today.getMonth() &&
            d.getDate() === today.getDate()
        ){
            totalSales += Number(sale.total || 0);
        }

    });

    expenses.forEach(expense => {

        const d = new Date(expense.date);

        if(
            d.getFullYear() === today.getFullYear() &&
            d.getMonth() === today.getMonth() &&
            d.getDate() === today.getDate()
        ){
            totalExpenses += Number(expense.amount || 0);
        }

    });

    const profit = totalSales - totalExpenses;

    document.getElementById("report-output").innerHTML = `

    <h2>Profit Report</h2>

    <table>

        <tr>
            <td>Today's Sales</td>
            <td>K${totalSales.toFixed(2)}</td>
        </tr>

        <tr>
            <td>Today's Expenses</td>
            <td>K${totalExpenses.toFixed(2)}</td>
        </tr>

        <tr>
            <td><strong>Today's Profit</strong></td>
            <td><strong>K${profit.toFixed(2)}</strong></td>
        </tr>

    </table>

    `;

}

// =====================================
// INVENTORY REPORT
// =====================================

function inventoryReport() {

    const products = loadProducts();

    let html = `

    <h2>Inventory Report</h2>

    <table>

        <tr>

            <th>Product</th>

            <th>Stock</th>

            <th>Unit Price</th>

            <th>Value</th>

        </tr>

    `;

    let total = 0;

    products.forEach(product => {

        const value = Number(product.stock) * Number(product.price);

        total += value;

        html += `

        <tr>

            <td>${product.name}</td>

            <td>${product.stock}</td>

            <td>K${Number(product.price).toFixed(2)}</td>

            <td>K${value.toFixed(2)}</td>

        </tr>

        `;

    });

    html += `

    </table>

    <h3>Total Inventory Value : K${total.toFixed(2)}</h3>

    `;

    output(html);

}

// =====================================
// SHIFT REPORT
// =====================================

function shiftReport() {

    const history = getShiftHistory();

    let html = `

    <h2>Shift Report</h2>

    <table>

        <tr>

            <th>Cashier</th>

            <th>Start</th>

            <th>End</th>

            <th>Sales</th>

            <th>Difference</th>

        </tr>

    `;

    history.forEach(shift => {

        html += `

        <tr>

            <td>${shift.cashier}</td>

            <td>${shift.startTime}</td>

            <td>${shift.endTime}</td>

            <td>K${Number(shift.sales).toFixed(2)}</td>

            <td>K${Number(shift.difference).toFixed(2)}</td>

        </tr>

        `;

    });

    html += `</table>`;

    output(html);

}