# Booking system
Imaginary surf shop booking system

## Architecture

<!-- +-------------------+
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
+----------------+      +----------------+ -->

### Overview

1. **bookingApi.js**  
   - Mock service layer that simulates backend functionality.

2. **Pinia Store (bookings)**  
   - Acts as the central source of truth for the application.  
   - **State**: `bookings[]` (array of booking objects).  
   - **Actions**: `fetch`, `create`, `delete`.

3. **Components**  
   - **BookingForm.vue**:  
     - Allows users to create new bookings.  
     - Calls `createBooking()` action in the Pinia store.  
   - **AdminPage.vue**:  
     - Displays all bookings.  
     - Calls `fetchBookings()` and `removeBooking()` actions in the Pinia store.


### Workflow

1. **BookingForm.vue**  
   - Calls `createBooking(newBooking)` (Pinia Store).  
   - Pinia calls `addBooking(newBooking)` (via `bookingApi.js` mock).  
   - The new booking is pushed into `store.bookings[]`.  
   - **AdminPage.vue** automatically updates via reactivity.

2. **User Interaction Flow**  
   - User submits a form.  
   - Pinia action `createBooking` is called.  
   - `bookingApi.js` handles mock server logic.  
   - Pinia updates the state.  
   - All components react automatically (no prop chains, no event emitters, full reactivity).

### Benefits

- **Extensibility**:  
  Easily add features like Login or User Management later.  

- **Backend Flexibility**:  
  Swap the mock API with a real backend without breaking frontend code.  

- **Clean Separation of Concerns**:  
  Clear distinction between UI, State, and Service layers.
