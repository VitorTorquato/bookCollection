import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAAuymLrK_ZuRfAeEF0qmSKhdSZSUiC6J4",
  authDomain: "bookcollection-36772.firebaseapp.com",
  projectId: "bookcollection-36772",
  storageBucket: "bookcollection-36772.firebasestorage.app",
  messagingSenderId: "698912033782",
  appId: "1:698912033782:web:391eb0caeec6ddd27dd5d7"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);


export {db,auth,storage};