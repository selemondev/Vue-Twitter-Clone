<script setup>
import TwitterIcon from "../assets/twitter-icon.png";
import SidebarLink from "./SidebarLink.vue";
import { DotsHorizontalIcon } from "@heroicons/vue/outline";
import { watchEffect, ref } from "vue";
import { auth, db } from "../Firebase/firebaseConfig";
import { getDoc, doc } from "firebase/firestore";
import { signOut } from "@firebase/auth";
import { useRouter } from "vue-router";
const user = ref([]);
const currentUser = auth?.currentUser.uid;
const router = useRouter();
watchEffect(() => {
    getDoc(doc(db, "users", currentUser)).then((docSnap) => {
        if(docSnap.exists()) {
            user.value.push(docSnap.data())
        }})
});

const handleLogOut = async () => {
    try {
        await signOut(auth);
        router.push("/login")
    } catch(error) {
        console.log(error.message)
    }
}
</script>
<template>
<div class="hidden sm:flex items-center flex-col xl:items-start xl:w-[300px] fixed h-full">
    <div class="xl:ml-24 flex justify-center items-center p-0 w-14 h-14 animation-hover">
        <img :src="TwitterIcon" alt="TwitterIcon" class="w-14 h-14">
    </div>

    <div class="mb:2.5 mt-4 space-y-2 xl:ml-24">
        <SidebarLink/>
    </div>

    <div class="hidden xl:inline xl:ml-auto mt-2">
         <button class="w-56 h-[50px] bg-[#1D9BF0] hover:bg-[#1A8CD8] rounded-full text-white font-bold shadow-md text-lg">Tweet</button>
    </div>

    <div class="mt-auto flex justify-center items-center xl:-mr-5 xl:justify-start animation-hover xl:ml-auto"  v-for="currentUser in user" :key="currentUser.id">
          <img @click="handleLogOut" :src="currentUser.profile" alt="profile" class="h-10 w-10 rounded-full xl:mr-2">
    <div class="hidden xl:inline leading-5 ml-1">
        <h3 class="dark:text-white text-black font-bold">{{currentUser.username}}</h3>
        <p class="text-gray-500">@{{currentUser.username}}</p>
    </div>
    <DotsHorizontalIcon class="hidden ml-4 self-start xl:inline h-5 w-5 dark:text-white text-black"/>
    </div>
</div>
</template>