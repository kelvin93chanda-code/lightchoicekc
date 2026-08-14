// =====================================
// FIREBASE REALTIME DATABASE
// =====================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";

import {
    getDatabase,
    ref,
    push,
    set,
    onValue,
    update,
    remove
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-database.js";

const firebaseConfig = {

    apiKey: "AIzaSyBViuHVgNP7ZzkMdTONxYu7HssemxTzwXM",

    authDomain: "lightchoicepos.firebaseapp.com",

    databaseURL: "https://lightchoicepos-default-rtdb.europe-west1.firebasedatabase.app",

    projectId: "lightchoicepos",

    storageBucket: "lightchoicepos.firebasestorage.app",

    messagingSenderId: "968522720451",

    appId: "1:968522720451:web:c1a9c288fb42a7352bae76"

};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);

export {
    ref,
    push,
    set,
    onValue,
    update,
    remove
};