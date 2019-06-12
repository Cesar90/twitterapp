import axios from 'axios';



const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCuNySNSzI3J5DNsLJV3ZXivYKmGBOodyU",
    authDomain: "catch-of-the-day-ebca2.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-ebca2.firebaseio.com",
    // projectId: "catch-of-the-day-ebca2",
    // storageBucket: "catch-of-the-day-ebca2.appspot.com",
    // messagingSenderId: "112848549986",
    // appId: "1:112848549986:web:6d233ee81c35a2eb"
 });
 
const base = Rebase.createClass(firebaseApp.database());

//This is a named export
export { firebaseApp }

//This is a default export
export default base;