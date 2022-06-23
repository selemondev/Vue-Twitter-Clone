import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyBTTHqj3CtO7e7hWCtzXZQLtnWw2mMu4zc",
  authDomain: "vue-twitter-clone-ffd96.firebaseapp.com",
  projectId: "vue-twitter-clone-ffd96",
  storageBucket: "vue-twitter-clone-ffd96.appspot.com",
  messagingSenderId: "26119329874",
  appId: "1:26119329874:web:dbb33dfec6596fdfb9278b"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
export {
    auth,
    db,
    storage
}
