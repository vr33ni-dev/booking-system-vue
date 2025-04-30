<template>
  <div class="max-w-2xl mx-auto mt-10">
    <h2 class="text-2xl font-bold mb-6">Bookings</h2>

    <div v-if="bookingStore.loading">Loading...</div>
    <div v-else-if="bookingStore.bookings.length === 0">No bookings found.</div>

    <ul class="space-y-4" v-else>
      <li v-for="booking in bookingStore.bookings" :key="booking.id"
      class="p-4 border rounded flex flex-col sm:flex-row sm:justify-between sm:items-start space-y-4 sm:space-y-0">
              <div>
          <p class="font-semibold">{{ booking.id }}</p>
          <p class="font-semibold">{{ booking.name }}</p>
          <p class="text-sm text-gray-500">{{ booking.dateTime }} </p>
        </div>
        <div class="flex space-x-2">
          <button @click="startEdit(booking)" class="text-green-600 hover:underline">
            Edit
          </button>
          <button @click="bookingStore.removeBooking(booking.id)" class="text-red-500 hover:underline">
            Delete
          </button>
        </div>
      </li>
    </ul>

    <!-- Editing Form shown if editing -->
    <div v-if="editing" class="mt-8">
      <h3 class="text-xl font-semibold mb-4">Edit Booking</h3>
      <BookingFormAdmin @cancel="cancelEditing" />
    </div>

  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import { useBookingStore } from '@/store/booking'
import BookingFormAdmin from '@/components/BookingFormAdmin.vue'

const bookingStore = useBookingStore()
const editing = ref(false)

onMounted(() => {
  bookingStore.fetchBookings()
})

const startEdit = (booking) => {
  bookingStore.setEditingBooking(booking)
  editing.value = true
}

const cancelEditing = () => {
  bookingStore.clearEditingBooking()
  editing.value = false
}
</script>
