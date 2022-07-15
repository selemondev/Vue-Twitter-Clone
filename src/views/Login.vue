<script setup>
import TwitterIcon from "../assets/twitter-icon.png";
import { auth, db } from "../firebaseConfig";
import { GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { useRouter } from "vue-router";
import { ref } from "vue";
const loading = ref(false);
const router = useRouter();
const handleGoogleSignIn = async () => {
  loading.value = true;
  try {
    const provider = new GoogleAuthProvider();
    const response = await signInWithPopup(auth, provider);
    await setDoc(doc(db, "users", response.user.uid), {
      id: response.user.uid,
      username: response.user.displayName,
      profile: response.user.photoURL,
    });
    loading.value = false;
    router.push("/");
  } catch(err) {
    console.log(err.message)
  }
}
</script>
<template>
<div class="min-h-screen bg-black w-full grid place-items-center">
<div>
  <img :src="TwitterIcon" alt="twitterIcon" :class="[ loading ? 'md:w-72 md:h-60 w-32 h-32 ml-4' : 'md:w-72 md:h-60 w-32 h-32']">
  <button @click="handleGoogleSignIn" class="md:ml-12 relative inline-flex items-center justify-start px-8 md:px-14 py-3 overflow-hidden font-medium transition-all bg-white rounded hover:bg-white group">
        <span class="w-48 h-48 rounded rotate-[-40deg] bg-[#03A9F4] absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
        <span class="relative w-full text-left text-black transition-colors duration-300 ease-in-out group-hover:text-white font-bold">
         {{ loading ? 'Signing In....' : 'Sign In'}}
        </span>
  </button>
</div>
</div>
</template>
