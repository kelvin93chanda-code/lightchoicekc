// =====================================
// Inventory
// =====================================

function loadInventory() {

    const body = document.getElementById("inventory-body");

    if (!body) return;

    const products = loadProducts();

    body.innerHTML = "";

    let low = 0;
    let out = 0;

    products.forEach(product => {

        let status = "";
        let className = "";

        if (product.stock <= 0) {

            status = "Out of Stock";
            className = "out";
            out++;

        }

        else if (product.stock <= 5) {

            status = "Low Stock";
            className = "low";
            low++;

        }

        else {

            status = "In Stock";
            className = "in";

        }

        body.innerHTML += `

        <tr>

            <td>${product.barcode}</td>

            <td>${product.name}</td>

            <td>${product.category}</td>

            <td>K${product.price.toFixed(2)}</td>

            <td>${product.stock} ${product.unit}</td>

            <td>

                <span class="status ${className}">

                    ${status}

                </span>

            </td>

            <td>

                <button onclick="editProduct(${product.id})">

                    Edit

                </button>

                <button onclick="deleteProduct(${product.id})">

                    Delete

                </button>

            </td>

        </tr>

        `;

    });

    document.getElementById("total-products").textContent =
        products.length;

    document.getElementById("low-stock").textContent =
        low;

    document.getElementById("out-stock").textContent =
        out;

}

document.addEventListener("DOMContentLoaded", loadInventory);

// =====================================
// OPEN ADD PRODUCT
// =====================================

function openAddProduct() {

    document.getElementById("modal-title").textContent =
        "Add Product";

    document.getElementById("product-id").value = "";

    document.getElementById("barcode").value = "";
    document.getElementById("product-name").value = "";
    document.getElementById("category").value = "";
    document.getElementById("price").value = "";
    document.getElementById("stock").value = "";
    document.getElementById("unit").value = "";
    document.getElementById("sale-type").value = "piece";

    document.getElementById("product-modal").style.display = "block";

}

// =====================================
// CLOSE MODAL
// =====================================

function closeProductModal() {

    document.getElementById("product-modal").style.display = "none";

}


function imageToBase64(file){

    return new Promise((resolve, reject) => {

        const reader = new FileReader();

        reader.onload = () => resolve(reader.result);

        reader.onerror = reject;

        reader.readAsDataURL(file);

    });

}
// =====================================
// SAVE PRODUCT
// =====================================

async function saveProduct() {

    const products = loadProducts();

    const id = document.getElementById("product-id").value;

    // Get selected image
    const file =
        document.getElementById("product-image").files[0];

    let image = "";

    // Keep old image when editing
    if (id) {

        const existing = products.find(p => p.id == id);

        if (existing && existing.image) {

            image = existing.image;

        }

    }

    // Replace with new image if selected
    if (file) {

        image = await imageToBase64(file);

    }

    const product = {

        id: id ? Number(id) : Date.now(),

        barcode: document.getElementById("barcode").value,

        name: document.getElementById("product-name").value,

        category: document.getElementById("category").value,

        price: Number(document.getElementById("price").value),

        stock: Number(document.getElementById("stock").value),

        unit: document.getElementById("unit").value,

        saleType: document.getElementById("sale-type").value,

        image: image

    };

    if (id) {

        const index = products.findIndex(p => p.id == id);

        products[index] = product;

    } else {

        products.push(product);

    }

    saveProducts(products);

    closeProductModal();

    loadInventory();

}

function editProduct(id) {

    const products = loadProducts();

    const product = products.find(p => p.id === id);

    if (!product) return;

    document.getElementById("modal-title").textContent =
        "Edit Product";

    document.getElementById("product-id").value = product.id;

    document.getElementById("barcode").value = product.barcode;

    document.getElementById("product-name").value = product.name;

    document.getElementById("category").value = product.category;

    document.getElementById("price").value = product.price;

    document.getElementById("stock").value = product.stock;

    document.getElementById("unit").value = product.unit;

    document.getElementById("sale-type").value = product.saleType;

    document.getElementById("product-modal").style.display = "block";

}

function deleteProduct(id) {

    if (!confirm("Delete this product?")) return;

    let products = loadProducts();

    products = products.filter(p => p.id !== id);

    saveProducts(products);

    loadInventory();

}

function searchInventory() {

    const search = document
        .getElementById("inventory-search")
        .value
        .toLowerCase();

    const rows = document.querySelectorAll("#inventory-body tr");

    rows.forEach(row => {

        row.style.display =
            row.innerText.toLowerCase().includes(search)
                ? ""
                : "none";

    });

}