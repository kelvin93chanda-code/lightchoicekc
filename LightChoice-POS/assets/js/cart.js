// =====================================
// Light Choice POS
// cart.js
// PART 1
// =====================================

// =====================================
// CART
// =====================================

let cart = [];

// =====================================
// WEIGHT SALE VARIABLES
// =====================================

let selectedProduct = null;
let selectedWeight = 0;

// =====================================
// SELECT PRODUCT
// =====================================

function selectProduct(productId) {

    const products = loadProducts();

    const product = products.find(p => p.id === productId);

    if (!product) {
        alert("Product not found.");
        return;
    }

    if (product.stock <= 0) {
        alert(product.name + " is out of stock.");
        return;
    }

    // Sold individually
    if (product.saleType === "piece") {

        addToCart(product);

        return;
    }

    // Sold by weight
    selectedProduct = product;

    document.getElementById("weight-title").textContent =
        product.name;

    document.getElementById("price-per-kg").textContent =
        "Price: K" + product.price.toFixed(2) + " per kg";

    document.getElementById("product-weight").value = "";

    document.getElementById("weight-total").textContent =
        "K0.00";

    document.getElementById("weight-modal").style.display =
        "flex";

}

// =====================================
// ADD PIECE PRODUCT
// =====================================

function addToCart(product) {

    const existing = cart.find(item =>

        item.id === product.id &&
        item.saleType === "piece"

    );

    if (existing) {

        if ((existing.quantity + 1) > product.stock) {

            alert("Not enough stock.");

            return;
        }

        existing.quantity++;

    } else {

        cart.push({

            id: product.id,
            barcode: product.barcode,
            name: product.name,
            category: product.category,

            saleType: "piece",

            unit: product.unit,

            price: product.price,

            quantity: 1

        });

    }

    renderCart();

}

// =====================================
// WEIGHT MODAL
// =====================================

document.addEventListener("DOMContentLoaded", () => {

    const weightInput =
        document.getElementById("product-weight");

    if (!weightInput) return;

    weightInput.addEventListener("input", () => {

        if (!selectedProduct) return;

        selectedWeight =
            parseFloat(weightInput.value) || 0;

        const total =
            selectedWeight * selectedProduct.price;

        document.getElementById("weight-total").textContent =
            "K" + total.toFixed(2);

    });

});

// =====================================
// CONFIRM WEIGHT SALE
// =====================================

function confirmWeight() {

    if (!selectedProduct) return;

    if (selectedWeight <= 0) {

        alert("Enter a valid weight.");

        return;
    }

    if (selectedWeight > selectedProduct.stock) {

        alert(
            "Only " +
            selectedProduct.stock.toFixed(2) +
            " kg available."
        );

        return;
    }

    cart.push({

        id: selectedProduct.id,

        barcode: selectedProduct.barcode,

        name: selectedProduct.name,

        category: selectedProduct.category,

        saleType: "weight",

        unit: "kg",

        weight: selectedWeight,

        pricePerKg: selectedProduct.price,

        total: selectedWeight * selectedProduct.price

    });

    closeWeightModal();

    renderCart();

}

// =====================================
// CLOSE WEIGHT MODAL
// =====================================

function closeWeightModal() {

    document.getElementById("weight-modal").style.display =
        "none";

    selectedProduct = null;

    selectedWeight = 0;

}

// =====================================
// RENDER SHOPPING CART
// =====================================

function renderCart() {

    const cartContainer = document.getElementById("cart-items");
    const subtotalElement = document.getElementById("subtotal");
    const totalElement = document.getElementById("cart-total");

    if (!cartContainer) return;

    cartContainer.innerHTML = "";

    let grandTotal = 0;

    // Empty Cart
    if (cart.length === 0) {

        cartContainer.innerHTML = `
            <p style="text-align:center;padding:20px;color:#888;">
                No products added
            </p>
        `;

        subtotalElement.textContent = "K0.00";
        totalElement.textContent = "K0.00";

        calculateChange();

        return;
    }

    cart.forEach((item, index) => {

        let itemTotal = 0;
        let description = "";

        // Weight Product
        if (item.saleType === "weight") {

            itemTotal = item.total;

            description =
                `${item.weight.toFixed(2)} kg × K${item.pricePerKg.toFixed(2)}`;

        }

        // Piece Product
        else {

            itemTotal = item.price * item.quantity;

            description =
                `${item.quantity} × K${item.price.toFixed(2)}`;

        }

        grandTotal += itemTotal;

        cartContainer.innerHTML += `

        <div class="cart-item">

            <div>

                <strong>${item.name}</strong><br>

                <small>${description}</small>

            </div>

            <div style="text-align:right;">

                <strong>
                    K${itemTotal.toFixed(2)}
                </strong>

                <br><br>

                ${
                    item.saleType === "piece"

                    ?

                    `

                    <button onclick="decreaseQuantity(${item.id})">

                        -

                    </button>

                    <span style="margin:0 8px;">

                        ${item.quantity}

                    </span>

                    <button onclick="increaseQuantity(${item.id})">

                        +

                    </button>

                    `

                    :

                    `

                    <button
                        onclick="removeWeightItem(${index})">

                        Remove

                    </button>

                    `

                }

            </div>

        </div>

        <hr>

        `;

    });

    subtotalElement.textContent =
        "K" + grandTotal.toFixed(2);

    totalElement.textContent =
        "K" + grandTotal.toFixed(2);

    calculateChange();

}

// =====================================
// INCREASE QUANTITY
// =====================================

function increaseQuantity(id) {

    const products = loadProducts();

    const stockProduct =
        products.find(p => p.id === id);

    const item =
        cart.find(c =>
            c.id === id &&
            c.saleType === "piece"
        );

    if (!item || !stockProduct) return;

    if (item.quantity >= stockProduct.stock) {

        alert("Maximum stock reached.");

        return;

    }

    item.quantity++;

    renderCart();

}

// =====================================
// DECREASE QUANTITY
// =====================================

function decreaseQuantity(id) {

    const item =
        cart.find(c =>
            c.id === id &&
            c.saleType === "piece"
        );

    if (!item) return;

    item.quantity--;

    if (item.quantity <= 0) {

        cart = cart.filter(c =>

            !(c.id === id &&
              c.saleType === "piece")

        );

    }

    renderCart();

}

// =====================================
// REMOVE WEIGHT ITEM
// =====================================

function removeWeightItem(index) {

    cart.splice(index, 1);

    renderCart();

}

// =====================================
// GET CART TOTAL
// =====================================

function getCartTotal() {

    let total = 0;

    cart.forEach(item => {

        if (item.saleType === "weight") {

            total += item.total;

        } else {

            total += item.price * item.quantity;

        }

    });

    return total;

}

// =====================================
// CALCULATE CHANGE
// =====================================

function calculateChange() {

    const cashInput =
        document.getElementById("cash-received");

    const changeField =
        document.getElementById("change");

    if (!cashInput || !changeField) return;

    const total = getCartTotal();

    if (cart.length === 0) {

        changeField.value = "K0.00";

        return;

    }

    const cash =
        parseFloat(cashInput.value) || 0;

    const change = cash - total;

    if (change < 0) {

        changeField.value = "Insufficient";

    }

    else {

        changeField.value =
            "K" + change.toFixed(2);

    }

}

// =====================================
// CASH INPUT LISTENER
// =====================================

document.addEventListener("DOMContentLoaded", () => {

    const cashInput =
        document.getElementById("cash-received");

    if (!cashInput) return;

    cashInput.addEventListener("input", () => {

        calculateChange();

    });

});

// =====================================
// RESET CHECKOUT
// =====================================

function resetCheckout() {

    document.getElementById("cash-received").value = "";

    document.getElementById("change").value = "K0.00";

}// =====================================
// RENDER SHOPPING CART
// =====================================

function renderCart() {

    const cartContainer = document.getElementById("cart-items");
    const subtotalElement = document.getElementById("subtotal");
    const totalElement = document.getElementById("cart-total");

    if (!cartContainer) return;

    cartContainer.innerHTML = "";

    let grandTotal = 0;

    // Empty Cart
    if (cart.length === 0) {

        cartContainer.innerHTML = `
            <p style="text-align:center;padding:20px;color:#888;">
                No products added
            </p>
        `;

        subtotalElement.textContent = "K0.00";
        totalElement.textContent = "K0.00";

        calculateChange();

        return;
    }

    cart.forEach((item, index) => {

        let itemTotal = 0;
        let description = "";

        // Weight Product
        if (item.saleType === "weight") {

            itemTotal = item.total;

            description =
                `${item.weight.toFixed(2)} kg × K${item.pricePerKg.toFixed(2)}`;

        }

        // Piece Product
        else {

            itemTotal = item.price * item.quantity;

            description =
                `${item.quantity} × K${item.price.toFixed(2)}`;

        }

        grandTotal += itemTotal;

        cartContainer.innerHTML += `

        <div class="cart-item">

            <div>

                <strong>${item.name}</strong><br>

                <small>${description}</small>

            </div>

            <div style="text-align:right;">

                <strong>
                    K${itemTotal.toFixed(2)}
                </strong>

                <br><br>

                ${
                    item.saleType === "piece"

                    ?

                    `

                    <button onclick="decreaseQuantity(${item.id})">

                        -

                    </button>

                    <span style="margin:0 8px;">

                        ${item.quantity}

                    </span>

                    <button onclick="increaseQuantity(${item.id})">

                        +

                    </button>

                    `

                    :

                    `

                    <button
                        onclick="removeWeightItem(${index})">

                        Remove

                    </button>

                    `

                }

            </div>

        </div>

        <hr>

        `;

    });

    subtotalElement.textContent =
        "K" + grandTotal.toFixed(2);

    totalElement.textContent =
        "K" + grandTotal.toFixed(2);

    calculateChange();

}

// =====================================
// INCREASE QUANTITY
// =====================================

function increaseQuantity(id) {

    const products = loadProducts();

    const stockProduct =
        products.find(p => p.id === id);

    const item =
        cart.find(c =>
            c.id === id &&
            c.saleType === "piece"
        );

    if (!item || !stockProduct) return;

    if (item.quantity >= stockProduct.stock) {

        alert("Maximum stock reached.");

        return;

    }

    item.quantity++;

    renderCart();

}

// =====================================
// DECREASE QUANTITY
// =====================================

function decreaseQuantity(id) {

    const item =
        cart.find(c =>
            c.id === id &&
            c.saleType === "piece"
        );

    if (!item) return;

    item.quantity--;

    if (item.quantity <= 0) {

        cart = cart.filter(c =>

            !(c.id === id &&
              c.saleType === "piece")

        );

    }

    renderCart();

}

// =====================================
// REMOVE WEIGHT ITEM
// =====================================

function removeWeightItem(index) {

    cart.splice(index, 1);

    renderCart();

}

// =====================================
// GET CART TOTAL
// =====================================

function getCartTotal() {

    let total = 0;

    cart.forEach(item => {

        if (item.saleType === "weight") {

            total += item.total;

        } else {

            total += item.price * item.quantity;

        }

    });

    return total;

}

// =====================================
// CALCULATE CHANGE
// =====================================

function calculateChange() {

    const cashInput =
        document.getElementById("cash-received");

    const changeField =
        document.getElementById("change");

    if (!cashInput || !changeField) return;

    const total = getCartTotal();

    if (cart.length === 0) {

        changeField.value = "K0.00";

        return;

    }

    const cash =
        parseFloat(cashInput.value) || 0;

    const change = cash - total;

    if (change < 0) {

        changeField.value = "Insufficient";

    }

    else {

        changeField.value =
            "K" + change.toFixed(2);

    }

}

// =====================================
// CASH INPUT LISTENER
// =====================================

document.addEventListener("DOMContentLoaded", () => {

    const cashInput =
        document.getElementById("cash-received");

    if (!cashInput) return;

    cashInput.addEventListener("input", () => {

        calculateChange();

    });

});

// =====================================
// RESET CHECKOUT
// =====================================

function resetCheckout() {

    document.getElementById("cash-received").value = "";

    document.getElementById("change").value = "K0.00";

}// =====================================
// RENDER SHOPPING CART
// =====================================

function renderCart() {

    const cartContainer = document.getElementById("cart-items");
    const subtotalElement = document.getElementById("subtotal");
    const totalElement = document.getElementById("cart-total");

    if (!cartContainer) return;

    cartContainer.innerHTML = "";

    let grandTotal = 0;

    // Empty Cart
    if (cart.length === 0) {

        cartContainer.innerHTML = `
            <p style="text-align:center;padding:20px;color:#888;">
                No products added
            </p>
        `;

        subtotalElement.textContent = "K0.00";
        totalElement.textContent = "K0.00";

        calculateChange();

        return;
    }

    cart.forEach((item, index) => {

        let itemTotal = 0;
        let description = "";

        // Weight Product
        if (item.saleType === "weight") {

            itemTotal = item.total;

            description =
                `${item.weight.toFixed(2)} kg × K${item.pricePerKg.toFixed(2)}`;

        }

        // Piece Product
        else {

            itemTotal = item.price * item.quantity;

            description =
                `${item.quantity} × K${item.price.toFixed(2)}`;

        }

        grandTotal += itemTotal;

        cartContainer.innerHTML += `

        <div class="cart-item">

            <div>

                <strong>${item.name}</strong><br>

                <small>${description}</small>

            </div>

            <div style="text-align:right;">

                <strong>
                    K${itemTotal.toFixed(2)}
                </strong>

                <br><br>

                ${
                    item.saleType === "piece"

                    ?

                    `

                    <button onclick="decreaseQuantity(${item.id})">

                        -

                    </button>

                    <span style="margin:0 8px;">

                        ${item.quantity}

                    </span>

                    <button onclick="increaseQuantity(${item.id})">

                        +

                    </button>

                    `

                    :

                    `

                    <button
                        onclick="removeWeightItem(${index})">

                        Remove

                    </button>

                    `

                }

            </div>

        </div>

        <hr>

        `;

    });

    subtotalElement.textContent =
        "K" + grandTotal.toFixed(2);

    totalElement.textContent =
        "K" + grandTotal.toFixed(2);

    calculateChange();

}

// =====================================
// INCREASE QUANTITY
// =====================================

function increaseQuantity(id) {

    const products = loadProducts();

    const stockProduct =
        products.find(p => p.id === id);

    const item =
        cart.find(c =>
            c.id === id &&
            c.saleType === "piece"
        );

    if (!item || !stockProduct) return;

    if (item.quantity >= stockProduct.stock) {

        alert("Maximum stock reached.");

        return;

    }

    item.quantity++;

    renderCart();

}

// =====================================
// DECREASE QUANTITY
// =====================================

function decreaseQuantity(id) {

    const item =
        cart.find(c =>
            c.id === id &&
            c.saleType === "piece"
        );

    if (!item) return;

    item.quantity--;

    if (item.quantity <= 0) {

        cart = cart.filter(c =>

            !(c.id === id &&
              c.saleType === "piece")

        );

    }

    renderCart();

}

// =====================================
// REMOVE WEIGHT ITEM
// =====================================

function removeWeightItem(index) {

    cart.splice(index, 1);

    renderCart();

}

// =====================================
// GET CART TOTAL
// =====================================

function getCartTotal() {

    let total = 0;

    cart.forEach(item => {

        if (item.saleType === "weight") {

            total += item.total;

        } else {

            total += item.price * item.quantity;

        }

    });

    return total;

}

// =====================================
// CALCULATE CHANGE
// =====================================

function calculateChange() {

    const cashInput =
        document.getElementById("cash-received");

    const changeField =
        document.getElementById("change");

    if (!cashInput || !changeField) return;

    const total = getCartTotal();

    if (cart.length === 0) {

        changeField.value = "K0.00";

        return;

    }

    const cash =
        parseFloat(cashInput.value) || 0;

    const change = cash - total;

    if (change < 0) {

        changeField.value = "Insufficient";

    }

    else {

        changeField.value =
            "K" + change.toFixed(2);

    }

}

// =====================================
// CASH INPUT LISTENER
// =====================================

document.addEventListener("DOMContentLoaded", () => {

    const cashInput =
        document.getElementById("cash-received");

    if (!cashInput) return;

    cashInput.addEventListener("input", () => {

        calculateChange();

    });

});

// =====================================
// RESET CHECKOUT
// =====================================

function resetCheckout() {

    document.getElementById("cash-received").value = "";

    document.getElementById("change").value = "K0.00";

}// =====================================
// RENDER SHOPPING CART
// =====================================

function renderCart() {

    const cartContainer = document.getElementById("cart-items");
    const subtotalElement = document.getElementById("subtotal");
    const totalElement = document.getElementById("cart-total");

    if (!cartContainer) return;

    cartContainer.innerHTML = "";

    let grandTotal = 0;

    // Empty Cart
    if (cart.length === 0) {

        cartContainer.innerHTML = `
            <p style="text-align:center;padding:20px;color:#888;">
                No products added
            </p>
        `;

        subtotalElement.textContent = "K0.00";
        totalElement.textContent = "K0.00";

        calculateChange();

        return;
    }

    cart.forEach((item, index) => {

        let itemTotal = 0;
        let description = "";

        // Weight Product
        if (item.saleType === "weight") {

            itemTotal = item.total;

            description =
                `${item.weight.toFixed(2)} kg × K${item.pricePerKg.toFixed(2)}`;

        }

        // Piece Product
        else {

            itemTotal = item.price * item.quantity;

            description =
                `${item.quantity} × K${item.price.toFixed(2)}`;

        }

        grandTotal += itemTotal;

        cartContainer.innerHTML += `

        <div class="cart-item">

            <div>

                <strong>${item.name}</strong><br>

                <small>${description}</small>

            </div>

            <div style="text-align:right;">

                <strong>
                    K${itemTotal.toFixed(2)}
                </strong>

                <br><br>

                ${
                    item.saleType === "piece"

                    ?

                    `

                    <button onclick="decreaseQuantity(${item.id})">

                        -

                    </button>

                    <span style="margin:0 8px;">

                        ${item.quantity}

                    </span>

                    <button onclick="increaseQuantity(${item.id})">

                        +

                    </button>

                    `

                    :

                    `

                    <button
                        onclick="removeWeightItem(${index})">

                        Remove

                    </button>

                    `

                }

            </div>

        </div>

        <hr>

        `;

    });

    subtotalElement.textContent =
        "K" + grandTotal.toFixed(2);

    totalElement.textContent =
        "K" + grandTotal.toFixed(2);

    calculateChange();

}

// =====================================
// INCREASE QUANTITY
// =====================================

function increaseQuantity(id) {

    const products = loadProducts();

    const stockProduct =
        products.find(p => p.id === id);

    const item =
        cart.find(c =>
            c.id === id &&
            c.saleType === "piece"
        );

    if (!item || !stockProduct) return;

    if (item.quantity >= stockProduct.stock) {

        alert("Maximum stock reached.");

        return;

    }

    item.quantity++;

    renderCart();

}

// =====================================
// DECREASE QUANTITY
// =====================================

function decreaseQuantity(id) {

    const item =
        cart.find(c =>
            c.id === id &&
            c.saleType === "piece"
        );

    if (!item) return;

    item.quantity--;

    if (item.quantity <= 0) {

        cart = cart.filter(c =>

            !(c.id === id &&
              c.saleType === "piece")

        );

    }

    renderCart();

}

// =====================================
// REMOVE WEIGHT ITEM
// =====================================

function removeWeightItem(index) {

    cart.splice(index, 1);

    renderCart();

}

// =====================================
// GET CART TOTAL
// =====================================

function getCartTotal() {

    let total = 0;

    cart.forEach(item => {

        if (item.saleType === "weight") {

            total += item.total;

        } else {

            total += item.price * item.quantity;

        }

    });

    return total;

}

// =====================================
// CALCULATE CHANGE
// =====================================

function calculateChange() {

    const cashInput =
        document.getElementById("cash-received");

    const changeField =
        document.getElementById("change");

    if (!cashInput || !changeField) return;

    const total = getCartTotal();

    if (cart.length === 0) {

        changeField.value = "K0.00";

        return;

    }

    const cash =
        parseFloat(cashInput.value) || 0;

    const change = cash - total;

    if (change < 0) {

        changeField.value = "Insufficient";

    }

    else {

        changeField.value =
            "K" + change.toFixed(2);

    }

}

// =====================================
// CASH INPUT LISTENER
// =====================================

document.addEventListener("DOMContentLoaded", () => {

    const cashInput =
        document.getElementById("cash-received");

    if (!cashInput) return;

    cashInput.addEventListener("input", () => {

        calculateChange();

    });

});

// =====================================
// RESET CHECKOUT
// =====================================

function resetCheckout() {

    document.getElementById("cash-received").value = "";

    document.getElementById("change").value = "K0.00";

}

// =====================================
// UPDATE INVENTORY
// =====================================

function updateInventory() {

    const products = loadProducts();

    cart.forEach(cartItem => {

        const product = products.find(p => p.id === cartItem.id);

        if (!product) return;

        // Weight products
        if (cartItem.saleType === "weight") {

            product.stock -= cartItem.weight;

        }

        // Piece products
        else {

            product.stock -= cartItem.quantity;

        }

        if (product.stock < 0) {

            product.stock = 0;

        }

    });

    saveProducts(products);

}

// =====================================
// COMPLETE SALE
// =====================================
function completeSale() {

    if (cart.length === 0) {

        alert("Please add products first.");
        return;

    }

    const cartTotal = getCartTotal();

    const paymentMethod =
        document.querySelector(
            'input[name="payment"]:checked'
        ).value;

    let cashReceived = cartTotal;

    if (paymentMethod === "Cash") {

        cashReceived =
            parseFloat(
                document.getElementById("cash-received").value
            ) || 0;

        if (cashReceived < cartTotal) {

            alert("Customer has not paid enough.");
            return;

        }

    }

    const change = cashReceived - cartTotal;

    const sale = {

        invoice:
            document.getElementById("invoice-number").textContent,

        date: new Date().toLocaleString(),

        cashier:
            getCurrentUser()?.fullname || "Cashier",

        items: [...cart],

        subtotal: cartTotal,

        discount: 0,

        total: cartTotal,

        payment: paymentMethod,

        cashReceived: cashReceived,

        change: change

    };

    // Save sale
    const sales =
        JSON.parse(localStorage.getItem("sales")) || [];

    sales.push(sale);

    localStorage.setItem(
        "sales",
        JSON.stringify(sales)
    );

    // Update current shift
    let currentShift = getCurrentShift();

    if (currentShift) {

        currentShift.sales += cartTotal;

        saveCurrentShift(currentShift);

    }

    // Update inventory
    updateInventory();

    // Show thermal receipt
    showReceipt(sale);

    // Next invoice
    document.getElementById("invoice-number").textContent =
        generateInvoice();

    // Clear cart
    cart = [];

    renderCart();

    resetCheckout();

    if (typeof loadDashboard === "function") {

        loadDashboard();

    }

}

// =====================================
// SHIFT CHECK
// =====================================

function hasOpenShift(){

    const shift = getCurrentShift();

    return shift && shift.status === "Open";

}

function updateShiftBanner(){

    const banner = document.getElementById("shift-banner");

    const text = document.getElementById("shift-banner-text");

    const btn = document.getElementById("open-shift-btn");

    const payBtn = document.querySelector(".pay-btn");

    if(!banner || !text || !payBtn) return;

    const shift = getCurrentShift();

    if(hasOpenShift()){

        banner.classList.remove("closed");
        banner.classList.add("open");

        text.textContent =
            `Shift open — ${shift.cashier} | Opening Cash: K${Number(shift.openingCash).toFixed(2)}`;

        if(btn) btn.style.display = "none";

        payBtn.disabled = false;
        payBtn.style.opacity = "1";
        payBtn.style.cursor = "pointer";

    }else{

        banner.classList.remove("open");
        banner.classList.add("closed");

        text.textContent =
            "No active shift. Open a shift to start selling.";

        if(btn) btn.style.display = "inline-block";

        payBtn.disabled = true;
        payBtn.style.opacity = "0.6";
        payBtn.style.cursor = "not-allowed";

    }

}

function showShiftModal(){

    document.getElementById("shift-modal").style.display = "flex";

}

// =====================================
// CLOSE RECEIPT
// =====================================

function closeReceipt() {

    document.getElementById("receipt-modal").style.display =
        "none";

}

// =====================================
// PRINT RECEIPT
// =====================================

function printReceipt() {

    window.print();

}



// =====================================
// START POS
// =====================================

document.addEventListener("DOMContentLoaded", () => {

    // New Invoice
    document.getElementById("invoice-number").textContent =
        generateInvoice();

    // Draw empty cart
    renderCart();

});

document.addEventListener("DOMContentLoaded", () => {

    const barcodeInput =
        document.getElementById("barcode-input");

    if (!barcodeInput) return;

    barcodeInput.focus();

    barcodeInput.addEventListener("keypress", function(e){

        if(e.key !== "Enter") return;

        const barcode = this.value.trim();

        if(barcode === "") return;

        const products = loadProducts();

        const product = products.find(p =>

            p.barcode === barcode

        );

        if(!product){

            alert("Product not found.");

            this.value = "";
            this.focus();

            return;

        }

        selectProduct(product.id);

        this.value = "";

        this.focus();

    });

});

document.addEventListener("DOMContentLoaded", () => { updateShiftBanner(); });

document.addEventListener("DOMContentLoaded", () => { document.getElementById("invoice-number").textContent = generateInvoice(); renderCart(); updateShiftBanner(); });