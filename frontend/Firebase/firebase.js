import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_Firebase_API_Key,
  authDomain: "t-form-5b611.firebaseapp.com",
  projectId: "t-form-5b611",
  storageBucket: "t-form-5b611.appspot.com",
  messagingSenderId: "582543472250",
  appId: "1:582543472250:web:94e8a01221a0df3a47edc3",
  measurementId: "G-T4EJHD33WB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

export { storage };
