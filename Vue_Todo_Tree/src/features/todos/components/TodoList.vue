<script setup>
import TodoItem from './TodoItem.vue'

defineProps({ tasks: Array })
defineEmits(['remove', 'toggle-fav'])
</script>

<template>
  <ul class="task-list">
    <TodoItem
      v-for="task in tasks"
      :key="task.id"
      :task="task"
      @remove="$emit('remove', $event)"
      @toggle-fav="$emit('toggle-fav', $event)"
    />
  </ul>
</template>