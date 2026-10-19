import { ref, watch, onMounted } from 'vue'

export function useTasks() {
  const tasks = ref([])

  function addTask(text) {
    tasks.value.push({
      id: Date.now(),
      text: text,
      completed: false,
      favourite: false
    })
  }

  function removeTask(id) {
    tasks.value = tasks.value.filter((t) => t.id !== id)
  }

  function toggleFav(task) {
    task.favourite = !task.favourite
  }

  // deep: watch the properties inside each task, not just the array itself
  watch(tasks, () => {
    localStorage.setItem('tasks', JSON.stringify(tasks.value))
  }, { deep: true })

  onMounted(() => {
    const saved = localStorage.getItem('tasks')
    if (saved) {
      tasks.value = JSON.parse(saved)
    }
  })

  return { tasks, addTask, removeTask, toggleFav }
}