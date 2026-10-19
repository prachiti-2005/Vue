<script setup>
import { ref } from 'vue'

const emit = defineEmits(['add'])
const newTask = ref('')

function submit() {
  const text = newTask.value.trim()
  if (!text) return
  emit('add', text)
  newTask.value = ''
}
</script>

<template>
  <div class="input-row">
    <input type="text" placeholder="Enter your todo" v-model="newTask" />
    <button @click="submit">Add</button>
  </div>
</template>