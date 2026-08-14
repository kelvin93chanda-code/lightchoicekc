// =====================================
// Product Storage
// =====================================

function loadProducts() {

    const saved = localStorage.getItem("products");

    if (saved) {

        return JSON.parse(saved);

    }

    // If no products exist yet
    return [];

}

// =====================================
// Save Products
// =====================================

function saveProducts(products) {

    localStorage.setItem(
        "products",
        JSON.stringify(products)
    );

}

function imageToBase64(file){

    return new Promise((resolve, reject) => {

        const reader = new FileReader();

        reader.onload = () => resolve(reader.result);

        reader.onerror = reject;

        reader.readAsDataURL(file);

    });

}
async function saveProduct(){

    const file =
        document.getElementById("product-image").files[0];

    let image = "";

    if(file){

        image = await imageToBase64(file);

    }

    const product = {

        id: Date.now(),

        name:
            document.getElementById("product-name").value.trim(),

        price:
            Number(document.getElementById("product-price").value),

        stock:
            Number(document.getElementById("product-stock").value),

        unit:
            document.getElementById("product-unit").value,

        saleType:
            document.getElementById("product-sale-type").value,

        image: image

    };

   const products = loadProducts(); products.push(product); saveProducts(products);

    alert("Product saved successfully.");

    document.getElementById("product-name").value = ""; document.getElementById("product-price").value = ""; document.getElementById("product-stock").value = ""; document.getElementById("product-image").value = "";

    // Optional: reload table or close modal
    if(typeof loadProductsTable === "function"){

        loadProductsTable();

    }

}