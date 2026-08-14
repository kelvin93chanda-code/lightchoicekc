// =====================================
// LOAD PRODUCTS FROM LOCALSTORAGE
// =====================================

function renderProducts(list) {

    const grid = document.getElementById("product-grid");

    if (!grid) return;

    grid.innerHTML = "";

    list.forEach(product => {

        grid.innerHTML += `
            <div class="product-card">

                <img
                    src="${product.image || '../assets/images/products/placeholder.jpg'}"
                    alt="${product.name}"
                    class="product-image">

                <h4>${product.name}</h4>

                <p class="price">
                    K${Number(product.price).toFixed(2)}
                </p>

                <small>
                    Stock: ${product.stock} ${product.unit}
                </small>

                <button class="add-btn"
                    onclick="selectProduct(${product.id})">

                    Add

                </button>

            </div>
        `;

    });

}

// =====================================
// LOAD PRODUCTS
// =====================================

function loadProductsForPOS() {

    const products = loadProducts();

    renderProducts(products);

}

// =====================================
// SEARCH
// =====================================

document.addEventListener("DOMContentLoaded", () => {

    loadProductsForPOS();

    const search = document.getElementById("search-product");

    if (search) {

        search.addEventListener("input", () => {

            const products = loadProducts();

            const term = search.value.toLowerCase();

            const filtered = products.filter(product =>

                product.name.toLowerCase().includes(term)

            );

            renderProducts(filtered);

        });

    }

});

// =====================================
// SEARCH PRODUCTS
// =====================================

document.addEventListener("DOMContentLoaded", () => {

    loadProducts();

    const search = document.getElementById("search-product");

    if (search) {

        search.addEventListener("input", () => {

            const term = search.value.toLowerCase();

            const filtered = products.filter(product =>

                product.name.toLowerCase().includes(term)

            );

            loadProducts(filtered);

        });

    }

});

function imageToBase64(file){

    return new Promise((resolve, reject) => {

        const reader = new FileReader();

        reader.onload = () => resolve(reader.result);

        reader.onerror = reject;

        reader.readAsDataURL(file);

    });

}