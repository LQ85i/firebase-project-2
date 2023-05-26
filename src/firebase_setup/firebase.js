// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBbGCu11MF4bZ6D-4EbCibwwDL2ShDDD4Q",
    authDomain: "fir-project-2-b6dc2.firebaseapp.com",
    projectId: "fir-project-2-b6dc2",
    storageBucket: "fir-project-2-b6dc2.appspot.com",
    messagingSenderId: "746681144994",
    appId: "1:746681144994:web:e972f3d13e5b74be0f69fb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);