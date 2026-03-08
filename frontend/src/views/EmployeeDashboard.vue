<template>
  <div class="flex-1 w-full flex flex-col min-h-full">
    
    <!-- Hero / Stats Section -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 border-b border-[#111111] bg-[#111111] text-[#F4F4F0]">
      <!-- Title Block -->
      <div class="md:col-span-2 p-8 lg:p-12 border-b lg:border-b-0 lg:border-r border-[#333] flex flex-col justify-end relative overflow-hidden group">
        <!-- Abstract gradient for high-end look -->
        <div class="absolute -top-40 -left-20 w-[400px] h-[400px] rounded-full mix-blend-screen bg-[#FF4A00] blur-[120px] opacity-20 pointer-events-none transition-opacity duration-1000 group-hover:opacity-40"></div>
        <h1 class="text-5xl md:text-6xl lg:text-[5vw] font-[Space_Grotesk] font-bold uppercase tracking-tighter leading-[0.85] z-10 relative">
          Leave<br>Requests.
        </h1>
        <div class="mt-8 flex items-center justify-between border-t border-[#333] pt-4 z-10">
          <p class="text-[10px] font-bold uppercase tracking-[0.25em] text-[#888]">
            EMPLOYEE: <span class="text-[#F4F4F0] ml-2">{{ userName }}</span>
          </p>
        </div>
      </div>
      
      <!-- Stat Blocks -->
      <div class="p-8 lg:p-10 border-b md:border-b-0 md:border-r border-[#333] flex flex-col justify-between items-start transition-colors hover:bg-[#1a1a1a]">
        <span class="text-[10px] font-bold uppercase tracking-[0.2em] text-[#888] mb-8">Total Files</span>
        <span class="text-6xl lg:text-7xl font-[Space_Grotesk] font-bold tracking-tighter">{{ leaves.length }}</span>
      </div>
      <div class="p-8 lg:p-10 border-b lg:border-b-0 lg:border-r border-[#333] flex flex-col justify-between items-start bg-[#FFC300] text-[#111111] transition-colors group cursor-default">
        <span class="text-[10px] font-bold uppercase tracking-[0.2em] opacity-80 mb-8">Pending</span>
        <span class="text-6xl lg:text-7xl font-[Space_Grotesk] font-bold tracking-tighter group-hover:scale-110 transition-transform origin-left">{{ pendingCount }}</span>
      </div>
      <div class="p-8 lg:p-10 border-b md:border-b-0 lg:border-r border-[#333] flex flex-col justify-between items-start bg-[#00D084] text-[#111111] transition-colors group cursor-default">
        <span class="text-[10px] font-bold uppercase tracking-[0.2em] opacity-80 mb-8">Approved</span>
        <span class="text-6xl lg:text-7xl font-[Space_Grotesk] font-bold tracking-tighter group-hover:scale-110 transition-transform origin-left">{{ approvedCount }}</span>
      </div>
      <div class="p-8 lg:p-10 flex flex-col justify-between items-start bg-[#FF3B30] text-[#111111] transition-colors group cursor-default">
        <span class="text-[10px] font-bold uppercase tracking-[0.2em] opacity-80 mb-8">Rejected</span>
        <span class="text-6xl lg:text-7xl font-[Space_Grotesk] font-bold tracking-tighter group-hover:scale-110 transition-transform origin-left">{{ rejectedCount }}</span>
      </div>
    </div>

    <!-- Interface Section -->
    <div class="flex flex-col lg:flex-row flex-1">
      
      <!-- Apply Form -->
      <div class="w-full lg:w-[450px] xl:w-[500px] lg:border-r border-b lg:border-b-0 border-[#111111] p-8 lg:p-14 bg-[#F4F4F0] flex-shrink-0">
        <h2 class="text-3xl font-[Space_Grotesk] font-bold uppercase tracking-tighter mb-12">Submit<br>A Request</h2>
        
        <form @submit.prevent="applyLeave" class="space-y-10">
          <div class="group">
            <label class="block text-[10px] font-bold uppercase tracking-[0.2em] mb-3 text-[#777] group-focus-within:text-[#FF4A00] transition-colors">Leave Type</label>
            <div class="relative">
              <select v-model="form.leaveType" class="w-full bg-transparent border-b-2 border-[#111111] pb-3 text-[17px] font-[Space_Grotesk] font-bold uppercase tracking-wide focus:outline-none focus:border-[#FF4A00] appearance-none rounded-none cursor-pointer text-[#111]" required>
                <option value="" disabled>Select Type...</option>
                <option value="Vacation">Vacation Leave</option>
                <option value="Sick Leave">Sick Leave</option>
                <option value="Personal Leave">Personal Leave</option>
                <option value="Other">Other Type</option>
              </select>
              <div class="pointer-events-none absolute bottom-4 right-0 flex items-center pr-2">
                <span class="text-[#111] font-bold text-xs font-mono">▼</span>
              </div>
            </div>
          </div>

           <div class="grid grid-cols-2 gap-8">
             <div class="group">
               <label class="block text-[10px] font-bold uppercase tracking-[0.2em] mb-3 text-[#777] group-focus-within:text-[#FF4A00] transition-colors">Start Date</label>
               <input type="date" v-model="form.startDate" class="w-full bg-transparent border-b-2 border-[#111111] pb-3 text-sm font-mono font-bold focus:outline-none focus:border-[#FF4A00] rounded-none text-[#111]" required>
             </div>
             <div class="group">
               <label class="block text-[10px] font-bold uppercase tracking-[0.2em] mb-3 text-[#777] group-focus-within:text-[#FF4A00] transition-colors">End Date</label>
               <input type="date" v-model="form.endDate" :min="form.startDate" class="w-full bg-transparent border-b-2 border-[#111111] pb-3 text-sm font-mono font-bold focus:outline-none focus:border-[#FF4A00] rounded-none text-[#111]" required>
             </div>
           </div>

           <div class="group">
             <label class="block text-[10px] font-bold uppercase tracking-[0.2em] mb-3 text-[#777] group-focus-within:text-[#FF4A00] transition-colors">Reason for Leave</label>
             <textarea v-model="form.reason" rows="3" class="w-full bg-transparent border-b-2 border-[#111111] pb-3 text-base font-medium focus:outline-none focus:border-[#FF4A00] resize-none rounded-none placeholder:text-[#999] leading-relaxed text-[#111]" placeholder="Provide a brief explanation..." required></textarea>
           </div>

           <div v-if="error" class="bg-[#FF4A00] text-white p-4 font-mono text-[11px] font-bold uppercase tracking-wide">
             {{ error }}
           </div>

          <button type="submit" class="w-full bg-[#111111] text-[#F4F4F0] py-6 font-bold text-[13px] uppercase tracking-[0.2em] hover:bg-[#FF4A00] transition-all shadow-[8px_8px_0px_transparent] hover:shadow-[10px_10px_0px_#111111] active:translate-y-1 active:translate-x-1 active:shadow-none mt-4" :disabled="submitLoading">
            {{ submitLoading ? 'SUBMITTING...' : 'SUBMIT REQUEST \u2192' }}
          </button>
        </form>
      </div>

      <!-- Feed -->
      <div class="flex-1 bg-white flex flex-col min-h-0 relative">
        <!-- Table Header (Sticky) -->
        <div class="border-b border-[#111111] px-8 lg:px-14 py-6 flex items-center justify-between sticky top-0 bg-white/90 backdrop-blur-md z-20">
          <span class="font-bold uppercase tracking-[0.2em] text-[#111] text-[11px] flex gap-3 items-center">
            <span class="w-2 h-2 rounded-full border border-[#111] block"></span>
            Application History
          </span>
          <span class="font-mono font-bold text-[#111111] text-[12px] bg-[#f4f4f0] px-3 py-1 border border-[#111]">TOTAL: {{ leaves.length }}</span>
        </div>
        
        <div class="flex-1 overflow-y-auto w-full relative">
          <div v-if="loading" class="p-20 text-center font-bold uppercase tracking-[0.2em] text-sm text-[#777] animate-pulse">
            Loading...
          </div>
          
          <div v-else-if="leaves.length === 0" class="p-20 flex flex-col items-center justify-center text-center h-full min-h-[400px]">
            <p class="text-[13px] font-bold uppercase tracking-[0.2em] text-[#111]">No applications found.</p>
            <p class="text-sm font-medium text-[#777] mt-3">Submit your forms via the side panel.</p>
          </div>

          <!-- Brutalist List Design -->
          <div v-else class="divide-y divide-[#111111]/10 bg-white group/list">
            <div v-for="leave in leaves" :key="leave._id" class="px-8 lg:px-14 py-10 hover:bg-[#fcfcfa] transition-colors group flex flex-col md:flex-row gap-8 justify-between hover:border-l-[6px] hover:-ml-[6px] transition-all border-[#FF4A00]">
              
              <!-- Left: Meta and Title -->
              <div class="flex-1">
                <!-- Status pill -->
                <div class="mb-5 inline-block">
                  <div class="text-[10px] font-bold uppercase tracking-[0.2em] px-4 py-2 border-2 border-[#111111] relative overflow-hidden" :class="{
                    'bg-[#FFC300] text-[#111] border-[#FFC300]': leave.status === 'Pending',
                    'bg-[#00D084] text-[#111] border-[#00D084]': leave.status === 'Approved',
                    'bg-[#FF3B30] text-[#111] border-[#FF3B30]': leave.status === 'Rejected'
                  }">
                    <span v-if="leave.status === 'Pending'" class="absolute -right-2 -top-2 w-6 h-6 bg-[#111] opacity-10 rounded-full animate-ping"></span>
                    {{ leave.status }}
                  </div>
                </div>

                <div class="flex flex-col">
                  <h3 class="font-[Space_Grotesk] font-bold text-3xl md:text-4xl uppercase tracking-tighter mb-4 text-[#111]">{{ leave.leaveType }}</h3>
                  <div class="text-[#333] font-medium leading-relaxed max-w-xl text-lg relative pl-5 border-l-2 border-[#111111]/20">
                    {{ leave.reason }}
                  </div>
                </div>
              </div>
              
              <!-- Right: Duration -->
              <div class="text-left md:text-right shrink-0 flex flex-row md:flex-col items-center md:items-end gap-5 md:gap-2">
                <div class="font-[Space_Grotesk] font-bold text-2xl tracking-tight text-[#111] whitespace-nowrap">{{ formatDate(leave.startDate) }}</div>
                <div class="font-bold uppercase tracking-[0.2em] text-[10px] text-[#FF4A00] md:my-1">- UNTIL -</div>
                <div class="font-[Space_Grotesk] font-bold text-2xl tracking-tight text-[#111] whitespace-nowrap">{{ formatDate(leave.endDate) }}</div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import api from '../axios'

const userName = ref(localStorage.getItem('name') || 'Employee')
const leaves = ref([])
const loading = ref(true)
const submitLoading = ref(false)
const error = ref('')

const form = ref({
  leaveType: '',
  startDate: '',
  endDate: '',
  reason: ''
})

const fetchLeaves = async () => {
  try {
    loading.value = true
    const { data } = await api.get('/leaves')
    leaves.value = data
  } catch (err) {
    console.error(err)
  } finally {
    loading.value = false
  }
}

const applyLeave = async () => {
  try {
    error.value = ''
    if (form.value.startDate && form.value.endDate && form.value.endDate < form.value.startDate) {
      error.value = 'End date must be the same as or after the start date.'
      return
    }
    submitLoading.value = true
    await api.post('/leaves', form.value)
    form.value = { leaveType: '', startDate: '', endDate: '', reason: '' }
    fetchLeaves()
  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to apply for leave'
  } finally {
    submitLoading.value = false
  }
}

watch(
  () => form.value.startDate,
  (start) => {
    if (start && form.value.endDate && form.value.endDate < start) {
      form.value.endDate = start
    }
  }
)

// Fixed Monospace formatting
const formatDate = (dateString) => {
  const d = new Date(dateString)
  return d.toISOString().split('T')[0] // Returns YYYY-MM-DD for clean monospace look
}

const approvedCount = computed(() => leaves.value.filter(l => l.status === 'Approved').length)
const pendingCount = computed(() => leaves.value.filter(l => l.status === 'Pending').length)
const rejectedCount = computed(() => leaves.value.filter(l => l.status === 'Rejected').length)

onMounted(() => {
  fetchLeaves()
})
</script>
