<script setup>
import { DotsHorizontalIcon,TrashIcon, SwitchHorizontalIcon, HeartIcon,ThumbDownIcon as thumbDownIcon, ShareIcon} from "@heroicons/vue/outline";
import { ThumbDownIcon } from "@heroicons/vue/solid"
import { ref, watchEffect} from "vue";
import { auth, db } from "../firebase/firebaseConfig";
import { useShare } from '@vueuse/core'
import { setDoc, doc, deleteDoc, collection, query, onSnapshot} from "firebase/firestore";
const likes = ref([]);
const liked = ref(false);
const dislikes = ref([]);
const disliked = ref(false);
const props = defineProps({
    id: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    profile: {
        type: String,
        required: true,
    },
    tweet: {
        type: String,
        required: true,
    },
    media: {
        type: String,
    },
    timeStamp: {
        type: Object
    }
});
const { share } = useShare();
function startShare() {
  share({
    profile: props.profile,
    text: props.tweet,
    url: location.href,
  })
};

watchEffect(() => {
    const postReference = collection(db, "posts", props.id, "likes");
    const q = query(postReference);
    const unsub = onSnapshot(q, querySnapshot => {
        let postLikes = [];
        querySnapshot.forEach(doc => {
            postLikes.push({...doc.data(), id: doc.id})
        });
        likes.value = postLikes
    });
    return () => unsub();
});

watchEffect(() => {
    const postReference = collection(db, "posts", props.id, "dislikes");
    const q = query(postReference);
    const unsub = onSnapshot(q, querySnapshot => {
        let postDislikes = [];
        querySnapshot.forEach(doc => {
            postDislikes.push({...doc.data(), id: doc.id})
        });
        dislikes.value = postDislikes
    });
    return () => unsub();
});

watchEffect(() => {
  liked.value = likes.value.findIndex((post) => post.id === auth.currentUser.uid ) !== -1;
  disliked.value = dislikes.value.findIndex((post) => post.id === auth.currentUser.uid ) !== -1;
});
const likeTweet = async () => {
      await setDoc(doc(db, "posts", props.id, "likes", auth.currentUser.uid), {
            user: auth.currentUser.displayName,
      });
      await deleteDoc(doc(db, "posts", props.id, "dislikes", auth.currentUser.uid));
};

const unlikeTweet = async () => {
    await setDoc(doc(db, "posts", props.id, "dislikes", auth.currentUser.uid), {
            user: auth.currentUser.displayName,
      });
     await deleteDoc(doc(db, "posts", props.id, "likes", auth.currentUser.uid));
}

const deleteTweet = async () => {
   await deleteDoc(doc(db, "posts", props.id));
}
</script>
<template>
<div class="p-2 flex cursor-pointer border-b dark:border-gray-700 border-gray-200">
    <img :src="props.profile" :alt="props.username" class="h-11 w-11 rounded-full mr-4" />
    <div class="flex flex-col space-y-1 w-full">
        <div class="flex justify-between items-center">
            <div>
                <div class="inline-block">
                    <h4 class="text-[15px] sm:text-base text-black font-bold dark:text-[#d9d9d9] inline-block">
                        {{props.username}}
                <span class="text-sm dark:text-gray-400 text-gray-600 ml-2" v-if="props.timeStamp">
                    <timeago :datetime="props.timeStamp?.toDate()" :auto-update="60"></timeago>
                </span>
                    </h4>
                    <p class="dark:text-gray-400 text-gray-500 font-bold text-sm">@{{props.username}}</p>
                    <div>
                        <h3 class="dark:text-white text-[20px] mt-2 mb-2">{{props.tweet}}</h3>
                    </div>
                       <img :src="props.media || ''" :alt="props.user" class="max-h-[500px] object-cover mr-2 rounded-xl" />
                  
                </div>
            </div>
            <DotsHorizontalIcon class="dark:text-gray-600 text-black h-7 w-7 self-start"/>
        </div>
          <div class="text-[#6e767d] pt-2 flex justify-between xl:w-10/12 w-[250px]">
                 <div class="flex items-center space-x-1 group">
            <div class="icon-style group-hover:bg-[#1d9bf0] group-hover:bg-opacity-10">
              <i class="fa-solid fa-comment" @click="unlikeTweet"></i>
            </div>
          </div>
            <div class="flex items-center space-x-1 group">
              <div class="icon-style group-hover:bg-green-500/10">
                <SwitchHorizontalIcon class="h-5 group-hover:text-green-500" />
              </div>
            </div>
          <div class="flex items-center group">
            <div class="icon-style group-hover:bg-pink-600/10" @click="likeTweet()" >
                <div v-if="liked" class="text-pink-600"><i class="fa-solid fa-heart"></i></div>
                  <div v-else><HeartIcon class="h-5 group-hover:text-pink-600" /></div>
            </div>
            <div>
                <span class="group-hover:text-pink-600 text-sm text-pink-600" v-if="likes.length > 0">
                {{likes.length}}
              </span>
            </div>
          </div>

            <div class="flex items-center space-x-1 group">
              <div class="icon-style group-hover:bg-red-600/10"  @click="unlikeTweet">
                <ThumbDownIcon class="h-5 group-hover:text-red-600 text-pink-600"  v-if="disliked" />
                 <thumbDownIcon class="h-5 group-hover:text-red-600" v-else/>
              </div>
                 <div>
                <span class="group-hover:text-pink-600 text-sm text-pink-600 -ml-1 md:ml-0 font-bold" v-if="dislikes.length > 0">
                {{dislikes.length}}
              </span>
            </div>
            </div>

            <div class="flex items-center space-x-1 group">
              <div class="icon-style group-hover:bg-red-600/10" @click="deleteTweet()">
                <TrashIcon class="h-5 group-hover:text-red-600" />
              </div>
            </div>

          <div class="icon-style group" @click="startShare()">
            <ShareIcon class="h-5 group-hover:text-[#1d9bf0]" />
          </div>
        </div>
    </div>
</div>
</template>