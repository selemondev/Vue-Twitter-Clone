<script setup>
import { useDark, useToggle } from "@vueuse/core";
import { SunIcon, MoonIcon} from "@heroicons/vue/solid";
import FeedInput from "../components/FeedInput.vue";
import { db } from "../firebase/firebaseConfig.js";
import { collection, query, onSnapshot, orderBy} from "firebase/firestore";
import { watchEffect ,ref } from "vue";
import Post from "../components/Post.vue";
const posts = ref([]);
const dark = useDark();
const toggle = useToggle(dark);
watchEffect(() => {
    const postReference = collection(db, "posts");
    const q = query(postReference, orderBy("timeStamp", "desc"));
    const unsub = onSnapshot(q, querySnapshot => {
        let postTweets = [];
        querySnapshot.forEach(doc => {
            postTweets.push({...doc.data(), id: doc.id})
        });
         posts.value = postTweets
    });
    return () => unsub();
});
</script>
<template>
<div class=" border-l border-r border-gray-200 dark:border-gray-600 flex-grow max-w-2xl sm:ml-[73px] xl:ml-[370px]">
    <div class="flex justify-between items-center px-3 py-2 dark:bg-black bg-white border-b border-gray-200 dark:border-gray-800 sticky top-0 z-20">
        <h1 class="dark:text-white text-black font-bold">Home</h1>
        <SunIcon @click="toggle()" class="w-7 h-7 dark:text-white" v-if="dark"/>
        <MoonIcon @click="toggle()" class="w-7 h-7 dark:text-white" v-else/>
    </div>
    <FeedInput class="xl:w-[600px]"/>

    <div class="pb-2" v-for="post in posts" :key="post.id">
        <Post :id="post.id" :username="post.username" :profile="post.profile" :tweet="post.text" :media="post.media" :timeStamp="post.timeStamp"/>
    </div>

</div>
</template>