<script setup>
import { ref } from 'vue'

const props = defineProps({ task: Object })
const emit = defineEmits(['remove', 'toggle-fav'])

const isEditing = ref(false)
const editingBuffer = ref('')

function startEdit() {
  isEditing.value = true
  editingBuffer.value = props.task.text
}

function cancelEdit() {
  isEditing.value = false
  editingBuffer.value = ''
}

function finishEdit() {
  if (!isEditing.value) return

  const trimmed = editingBuffer.value.trim()
  if (!trimmed) {
    emit('remove', props.task.id)
  } else {
    props.task.text = trimmed
  }

  cancelEdit()
}
</script>

<template>
  <li :class="{ done: task.completed, editing: isEditing }">
    <template v-if="isEditing">
      <input
        type="text"
        v-model="editingBuffer"
        class="edit-input"
        @keyup.enter="finishEdit"
        :ref="el => el && el.focus()"
        @keydown.esc="cancelEdit"
        @blur="finishEdit"
      />
    </template>

    <template v-else>
      <button class="delete" @click="emit('remove', task.id)">X</button>
      <button class="fav" @click="emit('toggle-fav', task)">
        {{ task.favourite ? '★' : '☆' }}
      </button>
      <input type="checkbox" v-model="task.completed" />
      <span @click="startEdit">{{ task.text }}</span>
    </template>
  </li>
</template>