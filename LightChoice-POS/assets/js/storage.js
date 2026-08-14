// =======================================
// Storage Manager
// =======================================

function saveSales(sales){

    localStorage.setItem("lightchoice_sales", JSON.stringify(sales));

}

function loadSales(){

    const sales = localStorage.getItem("lightchoice_sales");

    return sales ? JSON.parse(sales) : [];

}