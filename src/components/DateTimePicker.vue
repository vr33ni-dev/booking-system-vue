<template>
  <div class="w-full bg-gray-100 p-4 rounded-md shadow-md">
    <h3 class="text-lg font-semibold mb-4">Pick Date & Time</h3>
    <input
          type="datetime-local"
          :value="dateTimeModel"
          @input="$emit('update:dateTimeModel', $event.target.value)"
          class="w-1/2 px-3 py-2 border rounded"
        />
  </div>
</template>

  
<script setup>
 defineProps({
  dateTimeModel: {
    type: String,
    required: true
  }
})
</script>
