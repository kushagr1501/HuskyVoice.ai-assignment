<template>
  <div class="min-h-[100dvh] flex flex-col font-sans border-t-[8px] border-[#FF4A00]">
    <header class="border-b border-[#111111] px-6 lg:px-12 py-5 flex items-center justify-between sticky top-0 bg-[#F4F4F0] z-50">
      <div class="font-[Space_Grotesk] font-bold text-2xl uppercase tracking-tighter">
        LeaveTracker&reg;
      </div>
      <div v-if="localToken" class="flex items-center gap-6">
        <div class="hidden sm:flex text-[10px] font-bold uppercase tracking-[0.2em] bg-[#111111] text-[#F4F4F0] px-3 py-1.5 gap-2 items-center">
          <span class="w-1.5 h-1.5 bg-[#00D084] rounded-full"></span>
          ONLINE
        </div>
        <button @click="logout" class="text-sm font-bold uppercase tracking-widest hover:text-[#FF4A00] transition-colors">
          Log Out
        </button>
      </div>
    </header>
    <main class="flex-1 w-full flex flex-col">
      <router-view></router-view>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const localToken = ref(localStorage.getItem('token'))

const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('role')
  localStorage.removeItem('name')
  localToken.value = null
  router.push('/login')
}

// Multi-tab sync integration
const syncAuthState = (event) => {
  if (event.key === 'token') {
    localToken.value = event.newValue
    if (!event.newValue) {
      if (route.path !== '/login' && route.path !== '/signup') {
        router.push('/login')
      }
    } else {
      const role = localStorage.getItem('role')
      if (route.path === '/login' || route.path === '/signup') {
        router.push(role === 'employer' ? '/employer' : '/employee')
      }
    }
  }
}

watch(() => route.path, () => {
  localToken.value = localStorage.getItem('token')
})

onMounted(() => {
  window.addEventListener('storage', syncAuthState)
  localToken.value = localStorage.getItem('token')
})

onUnmounted(() => {
  window.removeEventListener('storage', syncAuthState)
})
</script>
