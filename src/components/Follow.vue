<script setup>
import { follow } from '../db/db';
</script>
<template>
  <div v-for="user in follow" :key="user.id" className="dark:hover:bg-gray-900 hover:bg-gray-200 hover:rounded-md py-2 cursor-pointer transition duration-200 ease-out flex items-center">
            <img :src="user.img" class="rounded-full w-10 h-10"/>
            <div className="ml-4 leading-5">
              <h4 className="font-bold dark:text-white">
                {{user.username}}
              </h4>
              <h5 className="text-gray-500 text-[15px]">{{user.tag}}</h5>
            </div>
            <button className="ml-auto mr-1 bg-white hover:bg-black hover:text-white text-black rounded-full font-bold text-sm py-1.5 px-3.5">
              Follow
            </button>
          </div>
</template>