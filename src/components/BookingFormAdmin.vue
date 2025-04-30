<template>
  <div class="p-6 bg-white shadow-md rounded-md space-y-6">
    <h3 class="text-xl font-semibold">Edit Booking</h3>

    <form @submit.prevent="submitBooking" class="space-y-4">
      <input type="text" v-model="name" placeholder="Name" class="w-full px-3 py-2 border rounded" required />

      <!-- DateTimePicker -->
      <DateTimePicker v-model:dateTimeModel="dateTime" />

      <button type="submit"
        class="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 flex justify-center items-center"
        :disabled="loading">
        <span v-if="loading" class="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></span>
        Save Changes
      </button>


      <button type="button" @click="cancelEdit"
        class="w-full bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600">
        Cancel
      </button>
    </form>

    <!-- Success Notification -->
    <Notification v-if="message" type="success" title="Success" @dismiss="message = ''">
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
const loading = ref(false)

const emit = defineEmits(['cancel'])

const props = defineProps({
  booking: Object,
})

watch(
  () => props.booking,
  (booking) => {
    if (booking) {
      name.value = booking.name || ''
      dateTime.value = booking.dateTime || ''
    }
  },
  { immediate: true } // So it runs immediately when component is mounted
)

const submitBooking = async () => {
  if (!props.booking) return
  loading.value = true

  await bookingStore.updateBooking(props.booking.id, {
    name: name.value,
    dateTime: dateTime.value,
  })
  message.value = 'Booking updated successfully!'
  loading.value = false
  emit('cancel')
}

const cancelEdit = () => {
  emit('cancel')
}
</script>