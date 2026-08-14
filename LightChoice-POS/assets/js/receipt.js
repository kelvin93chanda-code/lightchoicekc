// =====================================
// LIGHT CHOICE POS
// THERMAL RECEIPT
// =====================================

function formatMoney(value){

    return "K" + Number(value).toFixed(2);

}

function generateReceipt(sale){

    const lines = [];

    lines.push("================================");
    lines.push("       LIGHT CHOICE POS");
    lines.push("     Chambishi Main Market");
    lines.push("================================");

    lines.push("Receipt : " + sale.invoice);
    lines.push("Date    : " + sale.date);
    lines.push("Cashier : " + (sale.cashier || "Cashier"));

    lines.push("--------------------------------");
(sale.items || []).forEach(item => {

    lines.push(item.name);

    // Weight products
    if(item.weight){

        const itemTotal = item.weight * item.pricePerKg;

        lines.push(
            item.weight.toFixed(2) + "kg x " +
            formatMoney(item.pricePerKg) + "   " +
            formatMoney(itemTotal)
        );

    }

    // Piece products
    else{

        const itemTotal = item.quantity * item.price;

        lines.push(
            item.quantity + " x " +
            formatMoney(item.price) + "   " +
            formatMoney(itemTotal)
        );

    }

    lines.push("");

});

    lines.push("--------------------------------");

    lines.push(
        "Subtotal        " +
        formatMoney(sale.subtotal || sale.total)
    );

    lines.push(
        "Discount        " +
        formatMoney(sale.discount || 0)
    );

    lines.push("--------------------------------");

    lines.push(
        "TOTAL           " +
        formatMoney(sale.total)
    );

    lines.push("");

    lines.push(
        "Payment         " +
        (sale.payment || "Cash")
    );

    lines.push(
        "Cash            " +
        formatMoney(sale.cashReceived || sale.total)
    );

    lines.push(
        "Change          " +
        formatMoney(sale.change || 0)
    );

    lines.push("================================");
    lines.push("   Thank you for shopping with us");
    lines.push("================================");

    return lines.join("\n");

}

function showReceipt(sale){

    const modal =
        document.getElementById("receipt-modal");

    const content =
        document.getElementById("receipt-content");

    content.textContent =
        generateReceipt(sale);

    modal.style.display = "flex";

}

function closeReceipt(){

    document.getElementById("receipt-modal").style.display =
        "none";

}

function printReceipt(){

    const content =
        document.getElementById("receipt-content").textContent;

    const printWindow =
        window.open("", "", "width=320,height=600");

    printWindow.document.write(`
        <html>
        <head>
            <title>Receipt</title>
            <style>
                body{
                    font-family:Courier New, monospace;
                    width:58mm;
                    margin:0;
                    padding:8px;
                    font-size:12px;
                    line-height:1.3;
                    white-space:pre-wrap;
                }
            </style>
        </head>
        <body>
${content}
        </body>
        </html>
    `);

    printWindow.document.close();

    printWindow.focus();

    setTimeout(() => {

        printWindow.print();

        printWindow.close();

    }, 500);

}