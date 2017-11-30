import * as firebase from "firebase";

const config = {
    apiKey: "AIzaSyDF2L_wJamcXLScq9yEI4gwqx7WeyWdGTs",
    authDomain: "cook-yourself-f2828.firebaseapp.com",
    databaseURL: "https://cook-yourself-f2828.firebaseio.com",
    projectId: "cook-yourself-f2828",
    storageBucket: "cook-yourself-f2828.appspot.com",
    messagingSenderId: "1062501748042"
};

if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

export default firebase;
