<script setup>
import { trending } from "../db/db";
</script>
<template>
<div class="space-y-2">
<div class="flex justify-between items-center" v-for="trend in trending" :key="trend.id">

<div class="space-y-1 hover:hover pl-2">
    <h3 class="text-gray-500 font-bold">{{trend.trend}}</h3>
    <h2 class="dark:text-white font-bold">{{trend.heading}}</h2>
    <p class="text-gray-500 font-bold">{{trend.tweets}}</p>
</div>

</div>
</div>
</template>