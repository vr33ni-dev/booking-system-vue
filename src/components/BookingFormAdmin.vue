<template>
    <div class="p-6 bg-white shadow-md rounded-md space-y-6">
      <h3 class="text-xl font-semibold">Edit Booking</h3>
  
      <form @submit.prevent="submitBooking" class="space-y-4">
        <input
          type="text"
          v-model="name"
          placeholder="Name"
          class="w-full px-3 py-2 border rounded"
          required
        />
  
      <!-- DateTimePicker -->
      <DateTimePicker v-model:dateTimeModel="dateTime" />

        <button
          type="submit"
          class="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
          :disabled="bookingStore.loading"
        >
          Save Changes
        </button>
  
        <button
          type="button"
          @click="cancelEdit"
          class="w-full bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
        >
          Cancel
        </button>
      </form>
  
      <!-- Success Notification -->
      <Notification
        v-if="message"
        type="success"
        title="Success"
        @dismiss="message = ''"
      >
        {{ message }}
      </Notification>
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue'
  import { useBookingStore } from '@/store/booking'
  import DateTimePicker from '@/components/DateTimePicker.vue'
  import Notification from '@/components/Notification.vue'
  
  const bookingStore = useBookingStore()
  
  const name = ref('')
  const dateTime = ref('')
  const message = ref('')
  
  const emit = defineEmits(['cancel'])
  
  watch(
    () => bookingStore.editingBooking,
    (booking) => {
      if (booking) {
        name.value = booking.name
        dateTime.value = `${booking.dateTime}`
    }
    },
    { immediate: true }
  )
  
  const submitBooking = async () => {
    if (!bookingStore.editingBooking) return
  
    await bookingStore.updateBooking(bookingStore.editingBooking.id, {
      name: name.value,
      dateTime: dateTime.value,
    })
  
    console.log('Booking updated:', name.value, bookingStore.editingBooking)
    message.value = 'Booking updated successfully!'
  
     setTimeout(() => {
      message.value = ''
      bookingStore.clearEditingBooking()
      emit('cancel')
    }, 2000)
  }
  
  const cancelEdit = () => {
    bookingStore.clearEditingBooking()
    emit('cancel')
  }
  </script>
  