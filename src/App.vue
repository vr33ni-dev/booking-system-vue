<!-- src/App.vue -->
<template>
  <div class="min-h-screen bg-gray-100 p-6">
    <nav class="mb-6 flex space-x-4">
      <RouterLink
        to="/"
        class="text-blue-600 hover:underline"
        active-class="font-semibold underline"
        exact
      >
        Booking
      </RouterLink>
      <RouterLink
        to="/admin"
        class="text-blue-600 hover:underline"
        active-class="font-semibold underline"
      >
        Admin
      </RouterLink>
    </nav>

    <RouterView />
  </div>
</template>


<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>
