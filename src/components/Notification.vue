<template>
    <div
      class="relative mb-4 p-4 rounded-md shadow transition-all"
      :class="typeClasses"
    >
      <!-- Dismiss X -->
      <button
        @click="$emit('dismiss')"
        class="absolute top-2 right-2 text-xs text-gray-400 hover:text-gray-700"
        aria-label="Close"
      >
        ×
      </button>
  
      <!-- Title -->
      <p v-if="title" class="text-lg font-semibold mb-1">
      {{ title }}
    </p>
  
      <!-- Main content -->
      <p><slot /></p>
  
    </div>
  </template>
  
  <script setup>
const props = defineProps({
  type: {
    type: String,
    default: 'info'
  },
  title: {
    type: String,
    default: undefined 
  }
})
const typeClasses = {
  info: 'bg-blue-100 text-blue-800',
  success: 'bg-green-100 text-green-800',
  error: 'bg-red-100 text-red-800'
}[props.type] || 'bg-gray-100 text-gray-800'
</script>
