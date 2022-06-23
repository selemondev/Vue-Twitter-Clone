<script setup>
import { HomeIcon } from "@heroicons/vue/solid";
import {  BellIcon, InboxIcon, HashtagIcon, UserIcon, DotsCircleHorizontalIcon } from "@heroicons/vue/outline";
const sidebarMenu = [
    {
     label: "Home", Icon: HomeIcon
    },
    {
     label: "Explore", Icon: HashtagIcon,
    },
    {
     label: "Notifications", Icon: BellIcon
    },
    {
     label: "Messages", Icon: InboxIcon
    },
    {
      label: "Profile", Icon: UserIcon
    },
    {
      label: "More", Icon: DotsCircleHorizontalIcon
    }
];
</script>
<template>
<div v-for="link in sidebarMenu" class="flex justify-center items-center xl:justify-start text-xl space-x-3 animation-hover">
    <component :is="link.Icon" class="h-7 w-7 dark:text-white text-black"/>
<h3 class="hidden xl:inline-block dark:text-white text-black font-bold">{{link.label}}</h3>
</div>
</template>