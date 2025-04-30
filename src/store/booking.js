// src/store/booking.js
import { defineStore } from "pinia";
import { getBookings, addBooking, findBookingById, updateBooking, deleteBooking } from "../services/bookingApi";

export const useBookingStore = defineStore("booking", {
  state: () => ({
    bookings: [],
    loading: false,
    error: null,
    editingBooking: null 
  }),

  actions: {
    async findBookingById(id) {
      this.loading = true
      try {
        const found = await findBookingById(id)
        if (found) this.setEditingBooking(found)
        return found
      } catch (err) {
        this.error = 'Lookup failed'
        return null
      } finally {
        this.loading = false
      }
    },
    
    setEditingBooking(booking) {
      this.editingBooking = booking
    },
    clearEditingBooking() {
      this.editingBooking = null
    },

    async fetchBookings() {
      this.loading = true;
      try {
        this.bookings = await getBookings();
      } catch (err) {
        this.error = "Failed to fetch bookings";
      } finally {
        this.loading = false;
      }
    },

    async createBooking(newBooking) {
      this.loading = true;
      try {
        const booking = await addBooking(newBooking);
        this.bookings.push(booking);
        return booking;
      } catch (err) {
        this.error = "Failed to create booking";
        throw err; // <-- (optional) rethrow error to handle it higher if needed
      } finally {
        this.loading = false;
      }
    },
    


    async updateBooking(id, updatedBookingData) {
       this.loading = true;
      try {
        const updatedBooking = await updateBooking(id, updatedBookingData);
        const index = this.bookings.findIndex((b) => b.id === id);
         if (index !== -1) {
          this.bookings[index] = updatedBooking;
        }
      } catch (err) {
        this.error = "Failed to update booking";
      } finally {
        this.loading = false;
      }
    },

    async removeBooking(id) {
      this.loading = true;
      try {
        await deleteBooking(id);
        this.bookings = this.bookings.filter((b) => b.id !== id);
      } catch (err) {
        this.error = "Failed to delete booking";
      } finally {
        this.loading = false;
      }
    },
  },
});
