<script setup>
import { useTasks } from './composables/useTasks.js'
import { useTaskFilters } from './composables/useFilters.js'
import TodoForm from './components/TodoForm.vue'
import TodoSearch from './components/TodoSearch.vue'
import TodoFilters from './components/TodoFilters.vue'
import TodoList from './components/TodoList.vue'

const { tasks, addTask, removeTask, toggleFav } = useTasks()
const { search, activeFilter, filteredTasks } = useTaskFilters(tasks)
</script>

<template>
  <div class="wrapper">
    <h1>Todo App</h1>
    <TodoForm @add="addTask" />
    <TodoSearch v-model="search" />
    <TodoFilters v-model="activeFilter" />
    <TodoList :tasks="filteredTasks" @remove="removeTask" @toggle-fav="toggleFav" />
  </div>
</template>