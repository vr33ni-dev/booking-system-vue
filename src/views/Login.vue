<template>
    <div class="max-w-md mx-auto mt-20 p-6 bg-white shadow-md rounded-md">
      <h2 class="text-2xl font-bold mb-6">Admin Login</h2>
      <form @submit.prevent="login" class="space-y-4">
        <input
          type="text"
          v-model="username"
          placeholder="Username"
          class="w-full px-3 py-2 border rounded"
          required
        />
        <input
          type="password"
          v-model="password"
          placeholder="Password"
          class="w-full px-3 py-2 border rounded"
          required
        />
        <button
          type="submit"
          class="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </form>
      <p v-if="error" class="text-red-500 mt-4">{{ error }}</p>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useUserStore } from '@/store/user'
  import { useRouter } from 'vue-router'
  
  const username = ref('')
  const password = ref('')
  const error = ref('')
  const userStore = useUserStore()
  const router = useRouter()
  
  const login = () => {
    if (username.value === 'admin' && password.value === 'password') {
      userStore.login()
      router.push({ name: 'Admin' })
    } else {
      error.value = 'Invalid username or password'
    }
  }
  </script>