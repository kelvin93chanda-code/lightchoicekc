// =====================================
// LIGHT CHOICE POS
// ANALYTICS DASHBOARD
// =====================================

function loadDashboard() {

    const sales = loadSales();
    const products = loadProducts();

    let todaySales = 0;
    let weekSales = 0;
    let monthSales = 0;
    let inventoryValue = 0;

    const today = new Date();

    const productCounter = {};

    products.forEach(product => {

        inventoryValue += product.stock * product.price;

    });

    sales.forEach(sale => {

        const saleDate = new Date(sale.date);

        const diffDays =
            (today - saleDate) / (1000 * 60 * 60 * 24);

        if (saleDate.toDateString() === today.toDateString()) {

            todaySales += sale.total;

        }

        if (diffDays <= 7) {

            weekSales += sale.total;

        }

        if (

            saleDate.getMonth() === today.getMonth() &&
            saleDate.getFullYear() === today.getFullYear()

        ) {

            monthSales += sale.total;

        }

        sale.items.forEach(item => {

            if (!productCounter[item.name]) {

                productCounter[item.name] = 0;

            }

            if (item.saleType === "weight") {

                productCounter[item.name] += item.weight;

            } else {

                productCounter[item.name] += item.quantity;

            }

        });

    });

    document.getElementById("today-sales").textContent =
        "K" + todaySales.toFixed(2);

    document.getElementById("week-sales").textContent =
        "K" + weekSales.toFixed(2);

    document.getElementById("month-sales").textContent =
        "K" + monthSales.toFixed(2);

    document.getElementById("inventory-value").textContent =
        "K" + inventoryValue.toFixed(2);

    showBestSelling(productCounter);

    showLowStock(products);

    showRecentSales(sales);

}

function showBestSelling(counter) {

    const table = document.getElementById("best-selling");

    if (!table) return;

    table.innerHTML = "";

    const sorted = Object.entries(counter)

        .sort((a, b) => b[1] - a[1])

        .slice(0, 10);

    sorted.forEach(item => {

        table.innerHTML += `

        <tr>

            <td>${item[0]}</td>

            <td>${item[1]}</td>

        </tr>

        `;

    });

}

function showLowStock(products) {

    const table = document.getElementById("low-stock");

    if (!table) return;

    table.innerHTML = "";

    products.forEach(product => {

        if (product.stock <= product.minimumStock) {

            table.innerHTML += `

            <tr>

                <td>${product.name}</td>

                <td>${product.stock}</td>

            </tr>

            `;

        }

    });

}

function showRecentSales(sales) {

    const table = document.getElementById("recent-sales");

    if (!table) return;

    table.innerHTML = "";

    sales
        .slice()
        .reverse()
        .slice(0, 10)
        .forEach(sale => {

            table.innerHTML += `

            <tr>

                <td>${sale.invoice}</td>

                <td>${sale.payment}</td>

                <td>K${sale.total.toFixed(2)}</td>

            </tr>

            `;

        });

}

document.addEventListener("DOMContentLoaded", () => {

    loadDashboard();

});