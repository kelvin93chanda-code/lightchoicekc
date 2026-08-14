import {
    db,
    ref,
    push,
    set,
    onValue,
    update,
    remove
} from "./firebase.js";

// =====================================
// SAVE PRODUCT
// =====================================

export async function cloudSaveProduct(product){

    const newRef = push(ref(db, "products"));

    await set(newRef, product);

}

// =====================================
// LISTEN FOR PRODUCTS (REAL-TIME)
// =====================================

export function listenProducts(callback){

    const productsRef = ref(db, "products");

    onValue(productsRef, snapshot => {

        const data = snapshot.val() || {};

        const products = Object.entries(data).map(([id, value]) => ({
            id,
            ...value
        }));

        callback(products);

    });

}

// =====================================
// UPDATE PRODUCT
// =====================================

export async function cloudUpdateProduct(id, updates){

    await update(ref(db, `products/${id}`), updates);

}

// =====================================
// DELETE PRODUCT
// =====================================

export async function cloudDeleteProduct(id){

    await remove(ref(db, `products/${id}`));

}