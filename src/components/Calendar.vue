<template>
    <div class="w-full bg-gray-100 p-4 rounded-md shadow-md">
      <h3 class="text-lg font-semibold mb-4">Pick a Date and Time</h3>
  
      <div class="flex space-x-4">
        <input
          type="date"
          :value="dateModel"
          @input="$emit('update:dateModel', $event.target.value)"
          class="w-1/2 px-3 py-2 border rounded"
        />
        <input
          type="time"
          :value="timeModel"
          @input="$emit('update:timeModel', $event.target.value)"
          class="w-1/2 px-3 py-2 border rounded"
        />
      </div>
    </div>
  </template>
  
  <script setup>
  // Accept props
  defineProps({
    dateModel: {
      type: String,
      required: true
    },
    timeModel: {
      type: String,
      required: true
    }
  })
  </script>
  