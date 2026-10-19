import { ref, computed } from 'vue'

export function useTaskFilters(tasks) {
  const search = ref('')
  const activeFilter = ref('All')

  const filteredTasks = computed(() => {
    return tasks.value
      .filter(t => t.text.toLowerCase().includes(search.value.toLowerCase()))
      .filter(t => {
        if (activeFilter.value === 'Completed') return t.completed
        if (activeFilter.value === 'Incomplete') return !t.completed
        if (activeFilter.value === 'Favourites') return t.favourite
        return true
      })
  })

  return { search, activeFilter, filteredTasks }
}