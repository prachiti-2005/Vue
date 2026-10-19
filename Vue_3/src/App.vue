
<template>
  <div class="wrapper" >
    <h1>Todo App</h1>

    <div class = "input-row">
      <input type="text" placeholder="Enter your todo" v-model = "newTask"/>
      <button @click = "addTask">Add</button>
    </div>

    <input type = "text" placeholder = "Search Here" v-model = "search" />

    <div class="filters">

      <button  @click = "activeFilter = f" 
      v-for = "f in filters" 
      :key = "f" 
      :class = "{active : activeFilter === f}">

      {{ f }}

      </button>

    </div>

    <ul class="task-list">
      <li v-for = "task in filteredTasks" :key = "task.id" :class="{ done: task.completed, editing  : editingId === task.id}">

        <template v-if = "editingId === task.id">
          <input type="text" 
          v-model = "editingBuffer" 
          class = "edit-input"
          @keyup.enter = "finishEdit(task)"
          :ref = "el => el && el.focus()"
          @keydown.esc = "cancelEdit"
          @blur = "finishEdit(task)"
          />
        </template>


        <template v-else>
        <button class="delete" @click = "removeTask(task.id)">X</button>
        <button class = "fav" @click = "toggleFav(task)"> 
        {{ task.favourite ? '★' : '☆' }}
        </button>
        <input type="checkbox" v-model ="task.completed"/>
        <span @click="startEdit(task)">{{ task.text }}</span>
      </template>
      </li>
    </ul>

  </div>
</template>

<script setup>
  import { ref, computed , watch, onMounted} from 'vue'

  const newTask = ref('')
  const tasks = ref([])

  function addTask() {
    const text = newTask.value.trim()
    if(!text) return

    tasks.value.push({
      id : Date.now(),
      text : text,
      completed : false,
      favourite : false
    });

    // to make the string empty again after adding the task
    newTask.value = ''  
  }

  function removeTask(id){
    tasks.value = tasks.value.filter((t) => t.id !== id);
  }

  const editingId = ref(null)

  const editingBuffer = ref('')

  function startEdit(task){
    editingId.value = task.id
    editingBuffer.value = task.text
  }

  function cancelEdit(){
    editingId.value = null
    editingBuffer.value = ''
  }

  function finishEdit(task){
    if(editingId.value !== task.id){
      return
    }

    const trimmed = editingBuffer.value.trim()
    if(!trimmed){
      removeTask(task.id)
    }else{
      task.text = trimmed
    }

    cancelEdit()
  }

  function toggleFav(task){
    task.favourite = !task.favourite
  }

  const search = ref('')
  const activeFilter = ref('All')
  const filters = [
  'All',
  'Completed',
  'Incomplete',
  'Favourites'
  ]

  const filteredTasks = computed( () => {
    return tasks.value
    .filter(t => t.text.toLowerCase().includes(search.value.toLowerCase()))
    .filter(t => {
      if(activeFilter.value === 'Completed') return t.completed
      if(activeFilter.value === 'Incomplete') return !t.completed
      if(activeFilter.value === 'Favourites') return t.favourite
      return true
    })
  })


  // the deep is used to watch deeper inside the task for the completion and internal properties of the task object. Without deep, it would only watch for changes to the tasks array itself, not the properties of the objects within it.
  watch(tasks, () => {
    localStorage.setItem('tasks', JSON.stringify(tasks.value));

  },{deep : true}, 
)

//retrieve those tasks from local storage when the component is mounted
  onMounted(() => {
    
    const saved = localStorage.getItem('tasks')
    if(saved){
      tasks.value = JSON.parse(saved)
    }
    
  })

</script>

<style scoped>
.app {
  max-width: 500px;
  margin: 2rem auto;
  font-family: sans-serif;
}

.wrapper{
  max-width: 500px;
  margin: 2rem auto;
  font-family: sans-serif;
}
h1 {
  text-align: center;
  margin-bottom: 1rem;
}
input,
button {
  padding: 0.5rem;
  border-radius: 6px;
  border: 1px solid #ccc;
}
button {
  cursor: pointer;
}

.input-row {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}
.filters {
  display: flex;
  gap: 0.5rem;
  margin: 1rem 0;
  flex-wrap: wrap;
}
.filters button.active {
  background: #333;
  color: #fff;
  border-color: #333;
}

.task-list {
  list-style: none;
  padding: 0;
}
.task-list li {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  border-bottom: 1px solid #eee;
}
.task-list li.done span {
  text-decoration: line-through;
  opacity: 0.6;
}

.fav {
  background: none;
  border: none;
  cursor: pointer;
}
.delete {
  background: #e53e3e;
  color: white;
  border: none;
  cursor: pointer;
}
.edit-input {
  flex-grow: 1;
}
</style>