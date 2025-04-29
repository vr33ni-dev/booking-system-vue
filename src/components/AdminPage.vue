<!-- src/components/AdminPage.vue -->
<template>
  <div class="max-w-2xl mx-auto mt-10">
    <h2 class="text-2xl font-bold mb-6">Bookings</h2>

    <div v-if="bookingStore.loading">Loading...</div>
    <div v-else-if="bookingStore.bookings.length === 0">No bookings found.</div>

    <ul class="space-y-4">
      <li v-for="booking in bookingStore.bookings" :key="booking.id"
        class="p-4 border rounded flex justify-between items-center">
        <div>
          <p class="font-semibold">{{ booking.name }}</p>
          <p class="text-sm text-gray-500">{{ booking.date }} at {{ booking.time }}</p>
        </div>
        <button @click="startEdit(booking)" class="text-green-600 hover:underline">
          Edit
        </button>
        <button @click="bookingStore.removeBooking(booking.id)" class="text-red-500 hover:underline">
          Delete
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useBookingStore } from '@/store/booking'

const bookingStore = useBookingStore()

onMounted(() => {
  bookingStore.fetchBookings()
})


const startEdit = (booking) => {
  bookingStore.setEditingBooking(booking)
}

</script>