import {
    listenProducts,
    cloudSaveProduct,
    cloudUpdateProduct,
    cloudDeleteProduct
} from "./productsCloud.js";

// =====================================
// LOAD INVENTORY IN REAL TIME
// =====================================

listenProducts(products => {

    const body = document.getElementById("inventory-body");

    if(!body) return;

    body.innerHTML = "";

    products.forEach(product => {

        body.innerHTML += `

        <tr>

            <td>
                ${product.barcode || ''}
            </td>

            <td>

                <div style="display:flex;align-items:center;gap:10px;">

                    <img src="${product.imageUrl || '../assets/images/no-image.png'}"
                         width="45"
                         height="45"
                         style="border-radius:8px;object-fit:cover;border:1px solid #ddd;">

                    <div>
                        <strong>${product.name}</strong>
                    </div>

                </div>

            </td>

            <td>${product.category || ''}</td>

            <td>K${Number(product.price).toFixed(2)}</td>

            <td>${product.stock} ${product.unit || ''}</td>

            <td>

                <button onclick="editProduct('${product.id}')">

                    Edit

                </button>

                <button onclick="deleteProduct('${product.id}')">

                    Delete

                </button>

            </td>

        </tr>

        `;

    });

});

// =====================================
// SAVE PRODUCT
// =====================================

window.saveProduct = async function(){

    const file = document.getElementById("product-image").files[0];

    const product = {

        barcode: document.getElementById("barcode").value,

        name: document.getElementById("product-name").value,

        category: document.getElementById("category").value,

        price: Number(document.getElementById("price").value),

        stock: Number(document.getElementById("stock").value),

        unit: document.getElementById("unit").value,

        saleType: document.getElementById("sale-type").value

    };

    await cloudSaveProduct(product, file);

    alert("Product saved to cloud");

    closeProductModal();

};