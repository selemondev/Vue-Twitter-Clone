<script setup>
import Follow from './Follow.vue';
import Trending from './Trending.vue';
</script>
<template>
    <div class="hidden lg:inline ml-3 xl:w-[450px]">
      <div class="py-1.5 z-50 w-11/12 xl:w-9/12 mt-2">
    <div class="relative">
        <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <svg class="w-5 h-5 text-black " fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </div>
        <input type="search" id="default-search" class="font-bold block py-3 px-4 pl-10 text-base bg-gray-100 focus:outline-none text-black rounded-full border focus:ring-blue-500 focus:border-blue-500 w-32 md:w-[270px]" placeholder="Search Twitter" required>
    </div>
      </div>

      <div class="w-full mt-2 bg-[#F7F9F9] dark:bg-transparent rounded-md px-2">
        <div class="py-2.5">
            <h3 class="text-xl font-bold dark:text-white">Trends for you</h3>
        </div>
        <Trending/>
      </div>

      <div class="mt-5 bg-[#F7F9F9] dark:bg-transparent rounded-md px-2">
        <div class="ml-2 mb-2">
            <h4 class="font-bold dark:text-white text-xl">Who to follow</h4>
        </div>
        <Follow/>
      </div>
      </div>

</template>