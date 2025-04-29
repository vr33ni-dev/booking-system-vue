// src/store/booking.js
import { defineStore } from "pinia";
import { getBookings, addBooking, deleteBooking } from "../services/bookingApi";

export const useBookingStore = defineStore("booking", {
  state: () => ({
    bookings: [],
    loading: false,
    error: null,
  }),

  actions: {
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
      } catch (err) {
        this.error = "Failed to create booking";
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
