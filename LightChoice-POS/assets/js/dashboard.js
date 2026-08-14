// =====================================
// LIGHT CHOICE POS
// DASHBOARD
// =====================================

// -------------------------------------
// Dashboard Statistics
// -------------------------------------

function loadDashboardStats() {

    const sales =
        JSON.parse(localStorage.getItem("sales")) || [];

    const products =
        JSON.parse(localStorage.getItem("products")) || [];

    let todaySales = 0;
    let todayOrders = 0;

    const today =
        new Date().toLocaleDateString();

    sales.forEach(sale => {

        const saleDate =
            new Date(sale.date).toLocaleDateString();

        if (saleDate === today) {

            todaySales += Number(sale.total || 0);
            todayOrders++;

        }

    });

    const lowStock =
        products.filter(p => Number(p.stock || 0) <= 5).length;

    const salesEl =
        document.getElementById("today-sales");

    const ordersEl =
        document.getElementById("today-orders");

    const productsEl =
        document.getElementById("total-products");

    const lowStockEl =
        document.getElementById("low-stock-count");

    if (salesEl)
        salesEl.textContent = "K" + todaySales.toFixed(2);

    if (ordersEl)
        ordersEl.textContent = todayOrders;

    if (productsEl)
        productsEl.textContent = products.length;

    if (lowStockEl)
        lowStockEl.textContent = lowStock;

}

// -------------------------------------
// Recent Sales
// -------------------------------------

function loadRecentSales() {

    const body =
        document.getElementById("recent-sales-body");

    if (!body) return;

    const sales =
        JSON.parse(localStorage.getItem("sales")) || [];

    body.innerHTML = "";

    if (sales.length === 0) {

        body.innerHTML = `

        <tr>
            <td colspan="3" style="text-align:center;padding:20px;">
                No sales available.
            </td>
        </tr>`;

        return;

    }

    const recent =
        sales.slice().reverse().slice(0, 10);

    recent.forEach(sale => {

        body.innerHTML += `

        <tr>
            <td>${sale.invoice || "-"}</td>
            <td>${sale.payment || "-"}</td>
            <td>K${Number(sale.total || 0).toFixed(2)}</td>
        </tr>`;

    });

}

// -------------------------------------
// Low Stock Products
// -------------------------------------

function loadLowStockProducts() {

    const body =
        document.getElementById("low-stock-body");

    if (!body) return;

    const products =
        JSON.parse(localStorage.getItem("products")) || [];

    const lowStock =
        products.filter(p => Number(p.stock || 0) <= 5);

    body.innerHTML = "";

    if (lowStock.length === 0) {

        body.innerHTML = `

        <tr>
            <td colspan="2" style="text-align:center;padding:20px;">
                No low stock products.
            </td>
        </tr>`;

        return;

    }

    lowStock.slice(0, 10).forEach(product => {

        const stock =
            Number(product.stock || 0);

        const badgeClass =
            stock === 0 ? "critical" : "warning";

        body.innerHTML += `

        <tr>
            <td>${product.name || "Unknown"}</td>
            <td>
                <span class="stock-badge ${badgeClass}">
                    ${stock} ${product.unit || ""}
                </span>
            </td>
        </tr>`;

    });

}

// -------------------------------------
// Best Selling Products
// -------------------------------------

function loadBestSellingProducts() {

    const container =
        document.getElementById("best-selling-list");

    if (!container) return;

    const sales =
        JSON.parse(localStorage.getItem("sales")) || [];

    const totals = {};

    sales.forEach(sale => {

        if (!sale.items) return;

        sale.items.forEach(item => {

            const name = item.name || "Unknown";
            const qty = Number(item.quantity || 0);

            totals[name] = (totals[name] || 0) + qty;

        });

    });

    const topProducts =

        Object.entries(totals)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5);

    container.innerHTML = "";

    if (topProducts.length === 0) {

        container.innerHTML = `

        <p style="text-align:center;padding:20px;">
            No sales yet.
        </p>`;

        return;

    }

    topProducts.forEach(([name, qty], index) => {

        container.innerHTML += `

        <div class="best-item">

            <div class="best-left">

                <div class="rank">${index + 1}</div>

                <div class="best-name">${name}</div>

            </div>

            <div class="best-qty">
                ${qty} sold
            </div>

        </div>`;

    });

}

// -------------------------------------
// Initialize Dashboard
// -------------------------------------

document.addEventListener("DOMContentLoaded", () => {

    loadDashboardStats();
    loadRecentSales();
    loadLowStockProducts();
    loadBestSellingProducts();

});