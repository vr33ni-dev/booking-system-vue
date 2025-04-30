<template>
  <div class="max-w-2xl mx-auto p-8 bg-white shadow-md rounded-md mt-10">

    <!-- Booking ID Lookup -->
    <div class="flex flex-col space-y-2 mb-6">
      <label class="text-sm text-gray-600">Already have a Booking ID?</label>

      <input type="text" v-model="searchId" placeholder="Enter your Booking ID"
        class="w-full px-3 py-2 border rounded" />

      <button type="button" @click="findBooking"
        class="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 mt-2" :disabled="loading">
        Find Booking
      </button>
    </div>

    <Notification v-if="message" :type="message.toLowerCase().includes('not found') ? 'error' : 'info'"
      @dismiss="clearMessage">
      {{ message }}
    </Notification>



    <!-- Booking Form -->
    <h2 class="text-xl font-semibold mb-4">
      {{ bookingStore.editingBooking ? 'Edit Your Booking' : 'Create New Booking' }}
    </h2>

    <form @submit.prevent="submitBooking" class="space-y-4">
      <input type="text" v-model="name" placeholder="Name" class="w-full px-3 py-2 border rounded" required />

      <!-- DateTimePicker -->
      <DateTimePicker v-model:dateTimeModel="dateTime" />

      <button type="submit" class="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
        :disabled="loading">
        {{ bookingStore.editingBooking ? 'Save Changes' : 'Submit Booking' }}
      </button>

      <button v-if="bookingStore.editingBooking" type="button" @click="cancelEditing"
        class="w-full bg-gray-500 text-black py-2 px-4 rounded hover:bg-gray-600 mt-2">
        Cancel
      </button>
    </form>

    <!-- New Booking ID Confirmation -->
    <Notification v-if="bookingCreatedId" type="success" title="Your booking was created!"
      @dismiss="clearBookingCreatedId">
      Your Booking ID is: <span class="font-bold">{{ bookingCreatedId }}</span>
    </Notification>



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
import { ref, watch, onUnmounted } from 'vue'
import { useBookingStore } from '@/store/booking'
import DateTimePicker from '@/components/DateTimePicker.vue'
import Notification from '@/components/Notification.vue'

onUnmounted(() => {
  bookingStore.clearEditingBooking()
})
const bookingStore = useBookingStore()

const name = ref('')
const dateTime = ref('')

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
      dateTime.value = `${booking.dateTime}`
    } else {
      name.value = ''
      dateTime.value = ''
    }
  },
  { immediate: true }
)


const findBooking = async () => {
  clearBookingCreatedId()
  clearMessage()

  if (!searchId.value) return
  loading.value = true

  const result = await bookingStore.findBookingById(searchId.value)
  clearFormFields()

  if (result) {
    message.value = 'Booking loaded successfully.'
    name.value = result.name
    dateTime.value = result.dateTime
  } else {
    message.value = 'Booking not found. Please check your booking ID.'
  }

  loading.value = false
}




const submitBooking = async () => {
  loading.value = true
  setTimeout(async () => {
    if (bookingStore.editingBooking) {
      await bookingStore.updateBooking(bookingStore.editingBooking.id, {
        name: name.value,
        dateTime: dateTime.value
      })
      message.value = 'Booking updated successfully.';
      bookingStore.clearEditingBooking()
    } else {
      const newBooking = await bookingStore.createBooking({
        name: name.value,
        dateTime: dateTime.value,
      })
      bookingCreatedId.value = newBooking.id
      clearFormFields()
      clearMessage()
    }
    loading.value = false
  }, 700)
}

const cancelEditing = () => {
  bookingStore.clearEditingBooking()
  message.value = 'Editing was canceled.'
}

const clearFormFields = () => {
  name.value = ''
  dateTime.value = ''
  searchId.value = ''
}

const clearBookingCreatedId = () => {
  bookingCreatedId.value = null
}

const clearMessage = () => {
  message.value = ''
}

</script>
