# Booking system
Imaginary surf shop booking system

## Architecture

+-------------------+
|   bookingApi.js    | <-- Mock service layer (simulates backend)
+-------------------+
           |
           v
+---------------------------+
|    Pinia Store (bookings)  | <-- Central source of truth (state + actions)
| - state: bookings[]        |
| - actions: fetch, create, delete |
+---------------------------+
         /      \
        v        v
+----------------+      +----------------+
| BookingForm.vue |      |  AdminPage.vue  |
| - Create new booking   |  - View all bookings |
| - Call createBooking() |  - Call fetchBookings(), removeBooking() |
+----------------+      +----------------+


BookingForm.vue → calls → createBooking(newBooking) [Pinia Store]
→ Pinia calls → addBooking(newBooking) [bookingApi.js (mock)]
→ New booking pushed into store.bookings[]
→ AdminPage.vue automatically updates via reactivity


User interaction (submit form) 
    ↓
Pinia action called (createBooking)
    ↓
bookingApi.js (mock server logic)
    ↓
Pinia updates state
    ↓
All components react automatically
(no prop chains, no event emitters, full reactivity)


Easy to extend (e.g., add Login, User Management later).
Easy to swap the Mock API with a real backend later without breaking frontend code.
Clean separation of concerns (UI ↔ State ↔ Service).

