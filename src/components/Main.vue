<script setup>
import { ref } from 'vue'
const name = ref('Prachiti')
</script>

<template>
    <main>
    <h1>Hello, {{ name }}!</h1>
    <p>I'm about to learn <a href="https://vuejs.org/tutorial/#tutorial">Vue</a>!</p>
  </main>
</template>

<style scoped>

main h1{
  color: #42b983;
  display : inline-block;
}

main a{
  color: #42b983;
  text-decoration: none;
}

</style>