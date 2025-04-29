<!-- src/components/BookingForm.vue -->
<template>
    <div class="max-w-md mx-auto p-6 bg-white shadow-md rounded-md mt-10">
      <h2 class="text-xl font-semibold mb-4">New Booking</h2>
  
      <form @submit.prevent="submitBooking" class="space-y-4">
        <input
          type="text"
          v-model="name"
          placeholder="Name"
          class="w-full px-3 py-2 border rounded"
          required
        />
  
        <input
          type="date"
          v-model="date"
          class="w-full px-3 py-2 border rounded"
          required
        />
  
        <input
          type="time"
          v-model="time"
          class="w-full px-3 py-2 border rounded"
          required
        />
  
        <button
          type="submit"
          class="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          :disabled="bookingStore.loading"
        >
          {{ bookingStore.loading ? 'Submitting...' : 'Submit Booking' }}
        </button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useBookingStore } from '@/store/booking'
  
  const bookingStore = useBookingStore()
  
  const name = ref('')
  const date = ref('')
  const time = ref('')
  
  const submitBooking = async () => {
    await bookingStore.createBooking({ name: name.value, date: date.value, time: time.value })
    name.value = ''
    date.value = ''
    time.value = ''
  }
  </script>
  