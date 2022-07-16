import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const API_KEY = "AIzaSyBTTHqj3CtO7e7hWCtzXZQLtnWw2mMu4zc";
const AUTH_DOMAIN = "vue-twitter-clone-ffd96.firebaseapp.com";
const PROJECT_ID = "vue-twitter-clone-ffd96";
const STORAGE_BUCKET = "vue-twitter-clone-ffd96.appspot.com";
const MESSAGING_SENDER_ID = "26119329874";
const APP_ID = "1:26119329874:web:dbb33dfec6596fdfb9278b";
const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
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
