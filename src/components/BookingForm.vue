<template>
  <div class="max-w-2xl mx-auto p-8 bg-white shadow-md rounded-md mt-10">

    <!-- Booking ID Lookup -->
    <div class="flex flex-col space-y-2 mb-6">
      <label class="text-sm text-gray-600">Already have a Booking ID?</label>

      <input type="text" v-model="searchId" placeholder="Enter your Booking ID"
        class="w-full px-3 py-2 border rounded" />

      <button type="button" @click="findBooking"
        class="w-full bg-blue-600 text-black py-2 px-4 rounded hover:bg-blue-700 mt-2" :disabled="loading">
        Find Booking
      </button>
    </div>

    <!-- Feedback Toast (Move it here) -->
    <div v-if="message" class="relative mb-4 p-3 text-sm rounded"
      :class="message.includes('❌') ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'">

      <button @click="clearMessage" class="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
        aria-label="Dismiss">
        ✖️
      </button>

      {{ message }}
    </div>




    <!-- Booking Form -->
    <h2 class="text-xl font-semibold mb-4">
      {{ bookingStore.editingBooking ? 'Edit Your Booking' : 'Create New Booking' }}
    </h2>

    <form @submit.prevent="submitBooking" class="space-y-4">
      <input type="text" v-model="name" placeholder="Name" class="w-full px-3 py-2 border rounded" required />

      <!-- Calendar picker -->
      <Calendar v-model:dateModel="date" v-model:timeModel="time" />

      <button type="submit" class="w-full bg-green-600 text-black py-2 px-4 rounded hover:bg-green-700"
        :disabled="loading">
        {{ bookingStore.editingBooking ? 'Save Changes' : 'Submit Booking' }}
      </button>

      <button v-if="bookingStore.editingBooking" type="button" @click="cancelEditing"
        class="w-full bg-gray-500 text-black py-2 px-4 rounded hover:bg-gray-600 mt-2">
        Cancel
      </button>
    </form>

    <!-- New Booking ID Confirmation -->
    <div v-if="bookingCreatedId" class="relative bg-green-100 text-green-700 p-4 rounded mt-6 text-center">
      <!-- Close X Button -->
      <button @click="clearBookingCreatedId" class="absolute top-2 right-2 text-green-700 hover:text-green-900"
        aria-label="Close">
        ✖️
      </button>

      <p class="text-lg font-semibold">✅ Your booking was created!</p>
      <p class="mt-2">Your Booking ID is: <span class="font-bold">{{ bookingCreatedId }}</span></p>

      <button @click="clearBookingCreatedId" class="mt-4 bg-blue-600 text-black px-4 py-2 rounded hover:bg-blue-700">
        Got it!
      </button>
    </div>


    <!-- Loading Spinner -->
    <div v-if="loading" class="flex justify-center my-4">
      <svg class="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none"
        viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
      </svg>
    </div>

  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useBookingStore } from '@/store/booking'
import Calendar from '@/components/Calendar.vue'

const bookingStore = useBookingStore()

const name = ref('')
const date = ref('')
const time = ref('')
const searchId = ref('')
const loading = ref(false)
const message = ref('')
const bookingCreatedId = ref(null)

// Prefill form when editing
watch(
  () => bookingStore.editingBooking,
  (booking) => {
    if (booking) {
      name.value = booking.name
      date.value = booking.date
      time.value = booking.time
    } else {
      name.value = ''
      date.value = ''
      time.value = ''
    }
  },
  { immediate: true }
)

const findBooking = async () => {
  console.log("findBooking called")
  if (!searchId.value) return
  loading.value = true
  message.value = ''
  setTimeout(() => {
    const found = bookingStore.findBookingById(Number(searchId.value))
    if (found) {
      message.value = '✅ Booking loaded successfully!'
    } else {
      message.value = '❌ Booking not found. Please check your ID!'
    }
    loading.value = false
  }, 700)
}


const submitBooking = async () => {
  loading.value = true
  message.value = ''
  setTimeout(async () => {
    if (bookingStore.editingBooking) {
      await bookingStore.updateBooking(bookingStore.editingBooking.id, {
        name: name.value,
        date: date.value,
        time: time.value
      })
      message.value = '✅ Booking updated!'
      bookingStore.clearEditingBooking()
    } else {
      const newBooking = await bookingStore.createBooking({
        name: name.value,
        date: date.value,
        time: time.value
      })
      bookingCreatedId.value = newBooking.id
      clearFormFields()
    }
    loading.value = false
  }, 700)
}

const cancelEditing = () => {
  bookingStore.clearEditingBooking()
  message.value = '⚡ Editing canceled.'
}

const clearFormFields = () => {
  name.value = ''
  date.value = ''
  time.value = ''
  searchId.value = ''
}

const clearBookingCreatedId = () => {
  bookingCreatedId.value = null
}

const clearMessage = () => {
  message.value = ''
}

</script>
