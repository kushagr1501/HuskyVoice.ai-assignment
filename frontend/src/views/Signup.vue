<template>
  <div class="flex-1 w-full flex flex-col lg:flex-row min-h-[calc(100vh-80px)]">
    <!-- Visual side -->
    <div class="hidden lg:flex w-1/2 flex-col justify-between border-r border-[#111111] p-12 bg-[#111111] text-[#F4F4F0] overflow-hidden relative group">
      <div class="font-[Space_Grotesk] text-[8vw] font-bold uppercase tracking-tighter leading-[0.85] z-10 transition-transform duration-700 group-hover:scale-105 origin-top-left">
        Create<br>Account.
      </div>
      <div class="font-mono text-sm uppercase tracking-widest text-gray-500 z-10 border-t border-[#333] pt-6 flex justify-between">
        <span>Sign up to begin</span>
      </div>
      
      <!-- Abstract giant geometric element for high-end look -->
      <div class="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full border-[100px] border-[#1a1a1a] pointer-events-none group-hover:rotate-12 transition-transform duration-[2s]"></div>
      <div class="absolute top-20 right-20 w-[400px] h-[400px] rounded-full mix-blend-overlay bg-[#FF4A00] blur-[150px] opacity-20 pointer-events-none group-hover:opacity-40 transition-opacity duration-1000"></div>
    </div>
    
    <!-- Form side -->
    <div class="w-full lg:w-1/2 flex justify-center p-8 lg:p-16 relative overflow-y-auto">
      <div class="absolute top-8 right-8 font-mono text-[10px] uppercase tracking-widest text-[#777] hidden md:block">
        Sign Up
      </div>

      <div class="w-full max-w-lg mt-8 lg:mt-0">
        <h1 class="text-5xl font-[Space_Grotesk] font-bold uppercase tracking-tighter mb-16 block lg:hidden">Create Account.</h1>
        
        <form @submit.prevent="handleSignup" class="space-y-10 relative z-10 pb-16">
          <div class="group">
            <label class="block text-[11px] font-bold uppercase tracking-widest mb-3 text-[#777] group-focus-within:text-[#FF4A00] transition-colors">Full Name</label>
            <input type="text" v-model="name" class="w-full bg-transparent border-b-2 border-[#111111] pb-4 text-xl font-[Space_Grotesk] font-medium focus:outline-none focus:border-[#FF4A00] placeholder:text-gray-300 transition-colors rounded-none" placeholder="First Last" required>
          </div>
          
          <div class="group">
            <label class="block text-[11px] font-bold uppercase tracking-widest mb-3 text-[#777] group-focus-within:text-[#FF4A00] transition-colors">Email Address</label>
            <input type="email" v-model="email" class="w-full bg-transparent border-b-2 border-[#111111] pb-4 text-xl font-[Space_Grotesk] font-medium focus:outline-none focus:border-[#FF4A00] placeholder:text-gray-300 transition-colors rounded-none" placeholder="user@company.com" required>
          </div>

          <div class="group">
            <label class="block text-[11px] font-bold uppercase tracking-widest mb-3 text-[#777] group-focus-within:text-[#FF4A00] transition-colors">Password</label>
            <input type="password" v-model="password" class="w-full bg-transparent border-b-2 border-[#111111] pb-4 text-xl font-[Space_Grotesk] focus:outline-none focus:border-[#FF4A00] placeholder:text-gray-300 transition-colors tracking-[0.2em] rounded-none" placeholder="••••••••" required>
          </div>
          
          <div class="group relative">
            <label class="block text-[11px] font-bold uppercase tracking-widest mb-3 text-[#777] group-focus-within:text-[#FF4A00] transition-colors">Account Type</label>
            <select v-model="role" class="w-full bg-transparent border-b-2 border-[#111111] pb-4 text-lg font-[Space_Grotesk] font-bold uppercase tracking-wider focus:outline-none focus:border-[#FF4A00] transition-colors appearance-none rounded-none cursor-pointer" required>
              <option value="employee">Employee</option>
              <option value="employer">Employer / Admin</option>
            </select>
            <div class="pointer-events-none absolute bottom-4 right-0 flex items-center pr-2">
              <span class="text-[#111] font-bold text-xs">▼</span>
            </div>
          </div>
          
          <div v-if="error" class="bg-[#FF4A00] text-white p-5 font-mono text-xs font-bold uppercase tracking-wide">
            Signup failed: {{ error }}
          </div>
          
          <button type="submit" class="relative group w-full bg-[#111111] text-[#F4F4F0] py-6 text-[13px] font-bold uppercase tracking-[0.2em] transition-all hover:bg-[#FF4A00] mt-12 shadow-[8px_8px_0px_#111111] hover:shadow-[12px_12px_0px_#111111] active:translate-x-1 active:translate-y-1 active:shadow-[0px_0px_0px_#111111]" :disabled="loading">
            <span class="relative z-10">{{ loading ? 'CREATING ACCOUNT...' : 'SIGN UP \u2192' }}</span>
          </button>

          <div class="mt-16 text-[12px] font-bold uppercase tracking-widest border-t border-[#111111] pt-6 flex flex-col justify-start items-start gap-4">
            <span class="text-[#777]">Already have an account?</span>
            <router-link to="/login" class="text-[#111] hover:text-[#FF4A00] transition-colors underline decoration-2 underline-offset-4 decoration-[#111] hover:decoration-[#FF4A00]">Sign In</router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '../axios'

const name = ref('')
const email = ref('')
const password = ref('')
const role = ref('employee')
const error = ref('')
const loading = ref(false)
const router = useRouter()

const handleSignup = async () => {
  try {
    error.value = ''
    loading.value = true
    const { data } = await api.post('/auth/signup', { name: name.value, email: email.value, password: password.value, role: role.value })
    localStorage.setItem('token', data.token)
    localStorage.setItem('role', data.role)
    localStorage.setItem('name', data.name)
    window.dispatchEvent(new StorageEvent('storage', { key: 'token', newValue: data.token }))
    router.push(data.role === 'employer' ? '/employer' : '/employee')
  } catch (err) {
    error.value = err.response?.data?.message || 'Registration failed.'
  } finally {
    loading.value = false
  }
}
</script>
