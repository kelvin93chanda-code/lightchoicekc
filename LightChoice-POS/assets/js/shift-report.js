// =====================================
// LOAD LAST CLOSED SHIFT
// =====================================

function loadShiftReport(){

    const history =
        JSON.parse(localStorage.getItem("shiftHistory")) || [];

    if(history.length === 0){

        alert("No closed shifts found.");

        return;

    }

    const shift =
        history[history.length - 1];

    document.getElementById("report-date").textContent =
        new Date().toLocaleString();

    document.getElementById("cashier").textContent =
        shift.cashier || "-";

    document.getElementById("started").textContent =
        shift.startTime || "-";

    document.getElementById("closed").textContent =
        shift.endTime || "-";

    document.getElementById("opening-cash").textContent =
        "K" + Number(shift.openingCash || 0).toFixed(2);

    document.getElementById("sales").textContent =
        "K" + Number(shift.sales || 0).toFixed(2);

    document.getElementById("expected-cash").textContent =
        "K" + Number(shift.expectedCash || 0).toFixed(2);

    document.getElementById("actual-cash").textContent =
        "K" + Number(shift.closingCash || 0).toFixed(2);

    const diff =
        Number(shift.difference || 0);

    const diffEl =
        document.getElementById("difference");

    diffEl.textContent =
        "K" + diff.toFixed(2);

    if(diff < 0){

        diffEl.style.color = "#c62828";

    }else if(diff > 0){

        diffEl.style.color = "#2e7d32";

    }else{

        diffEl.style.color = "#0B6B3A";

    }

}

document.addEventListener("DOMContentLoaded", loadShiftReport);