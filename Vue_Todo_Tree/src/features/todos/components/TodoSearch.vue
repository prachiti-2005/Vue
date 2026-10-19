<script setup>
const search = defineModel()
</script>

<template>
  <input type="text" placeholder="Search Here" v-model="search" />
</template>