<script setup>
import { FILTERS } from '@/features/todos/constants'

const activeFilter = defineModel()
</script>

<template>
  <div class="filters">
    <button
      v-for="f in FILTERS"
      :key="f"
      @click="activeFilter = f"
      :class="{ active: activeFilter === f }"
    >
      {{ f }}
    </button>
  </div>
</template>