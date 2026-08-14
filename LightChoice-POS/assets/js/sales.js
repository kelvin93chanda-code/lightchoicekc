function loadSalesHistory() {

    const sales = loadSales();

    const table = document.getElementById("sales-table");

    table.innerHTML = "";

    if (sales.length === 0) {

        table.innerHTML = `
            <tr>
                <td colspan="5">No sales found.</td>
            </tr>
        `;

        return;
    }

    sales.forEach((sale, index) => {

        table.innerHTML += `

        <tr>

            <td>${sale.invoice}</td>

            <td>${sale.date}</td>

            <td>${sale.payment}</td>

            <td>K${sale.total.toFixed(2)}</td>

            <td>

                <button onclick="viewSale(${index})">

                    View

                </button>

            </td>

        </tr>

        `;

    });

}

document.addEventListener("DOMContentLoaded", loadSalesHistory);

function viewSale(index) {

    const sales = loadSales();

    const sale = sales[index];

    let message = "";

    message += "Invoice: " + sale.invoice + "\n\n";

    sale.items.forEach(item => {

        if (item.weight) {

            message +=
                item.name +
                " - " +
                item.weight.toFixed(2) +
                "kg\n";

        } else {

            message +=
                item.name +
                " x " +
                item.quantity +
                "\n";

        }

    });

    message += "\n";

    message += "Total: K" + sale.total.toFixed(2);

    alert(message);

}