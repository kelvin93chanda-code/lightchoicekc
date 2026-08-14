// =======================================
// Invoice Generator
// =======================================

function generateInvoice(){

    let invoice = localStorage.getItem("invoice");

    if(!invoice){

        invoice = 1;

    }else{

        invoice = Number(invoice) + 1;

    }

    localStorage.setItem("invoice", invoice);

    return "INV-" + String(invoice).padStart(6,"0");

}