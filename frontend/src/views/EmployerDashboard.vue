<template>
  <div class="flex-1 w-full flex flex-col min-h-full">
    
    <!-- Hero / Stats Section -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 border-b border-[#111111] bg-[#111111] text-[#F4F4F0]">
      <!-- Title Block -->
      <div class="md:col-span-2 p-8 lg:p-12 border-b lg:border-b-0 lg:border-r border-[#333] flex flex-col justify-end relative overflow-hidden group">
        <!-- Abstract gradient for high-end look -->
        <div class="absolute -bottom-40 right-[-100px] w-[500px] h-[500px] rounded-full mix-blend-screen bg-[#FF4A00] blur-[150px] opacity-20 pointer-events-none transition-opacity duration-1000 group-hover:opacity-50"></div>
        <h1 class="text-5xl md:text-6xl lg:text-[5vw] font-[Space_Grotesk] font-bold uppercase tracking-tighter leading-[0.85] z-10 relative">
          Company<br>Leaves.
        </h1>
        <div class="mt-8 flex items-center justify-between border-t border-[#333] pt-4 z-10">
          <p class="text-[10px] font-bold uppercase tracking-[0.25em] text-[#888]">
            ROLE: <span class="text-[#F4F4F0] ml-2">ADMINISTRATOR</span>
          </p>
        </div>
      </div>
      
      <!-- Stat Blocks -->
      <div class="p-8 lg:p-10 border-b md:border-b-0 md:border-r border-[#333] flex flex-col justify-between items-start transition-colors hover:bg-[#1a1a1a]">
        <span class="text-[10px] font-bold uppercase tracking-[0.2em] text-[#888] mb-8">All Requests</span>
        <span class="text-6xl lg:text-7xl font-[Space_Grotesk] font-bold tracking-tighter">{{ leaves.length }}</span>
      </div>
      <div class="p-8 lg:p-10 border-b lg:border-b-0 lg:border-r border-[#333] flex flex-col justify-between items-start bg-[#FFC300] text-[#111111] transition-colors group cursor-default">
        <span class="text-[10px] font-bold uppercase tracking-[0.2em] opacity-80 mb-8">Pending Review</span>
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

    <!-- Feed / Main Content -->
    <div class="flex-1 bg-white flex flex-col relative w-full">
      <!-- Toolbar (Sticky) -->
      <div class="border-b border-[#111111] px-8 lg:px-14 py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 sticky top-0 bg-white/95 backdrop-blur-md z-30">
        <div class="flex items-center gap-6">
          <span class="font-bold uppercase tracking-[0.2em] text-[#111] text-[11px] flex gap-3 items-center">
            <span class="w-2 h-2 rounded-full border border-black block"></span>
            Incoming Requests
          </span>
        </div>
      </div>
      
      <div class="w-full flex-1 relative min-h-[500px]">
        <div v-if="loading" class="p-20 text-center font-bold uppercase tracking-[0.2em] text-sm text-[#777] animate-pulse absolute inset-0 flex items-center justify-center">
          Loading...
        </div>
        
        <div v-else-if="leaves.length === 0" class="p-20 flex flex-col items-center justify-center text-center absolute inset-0">
          <p class="text-[13px] font-bold uppercase tracking-[0.2em] text-[#111]">No requests found.</p>
          <p class="text-sm font-medium text-[#777] mt-3">There are no user submissions requiring oversight.</p>
        </div>

        <!-- Brutalist List Design -->
        <div v-else class="divide-y divide-[#111111]/10 bg-white group/list">
          <div v-for="leave in leaves" :key="leave._id" class="px-8 lg:px-14 py-12 hover:bg-[#fcfcfa] transition-colors group flex flex-col 2xl:flex-row gap-10 2xl:gap-14 2xl:items-center relative">
            
            <!-- Floating ID Number (Visual only) -->
            <div class="absolute -left-16 top-12 font-mono text-[10px] text-[#ccc] transform -rotate-90 origin-top tracking-[0.3em] font-bold hidden lg:block select-none">
              REQ-{{ leave._id.substring(leave._id.length - 6).toUpperCase() }}
            </div>
            
            <!-- Applicant Block -->
            <div class="shrink-0 2xl:w-[300px]">
              <div class="font-bold uppercase tracking-[0.2em] text-[10px] text-[#777] mb-3 flex items-center gap-2">
                <span class="w-4 h-[1px] bg-[#111]"></span> Employee Info
              </div>
              <div class="font-[Space_Grotesk] font-bold text-3xl uppercase tracking-tighter leading-none text-[#111] mb-2">{{ leave.employeeId?.name || 'Unknown User' }}</div>
              <div class="font-mono text-[11px] text-[#555] tracking-widest bg-[#f4f4f0] inline-block px-2 py-1 mt-1">{{ leave.employeeId?.email }}</div>
            </div>

            <!-- Content Block -->
            <div class="flex-1 min-w-0">
              <div class="font-bold uppercase tracking-[0.2em] text-[10px] text-[#777] mb-3 flex items-center gap-2">
                <span class="w-4 h-[1px] bg-[#111]"></span> Leave Details
              </div>
              <div class="flex items-center gap-4 mb-3">
                <div class="font-[Space_Grotesk] font-bold text-2xl uppercase tracking-tighter" :class="{'text-[#FF4A00]': leave.status === 'Pending', 'text-[#111]': leave.status !== 'Pending'}">
                  {{ leave.leaveType }}
                </div>
              </div>
              <p class="text-[#333] font-medium leading-relaxed max-w-4xl text-lg relative pl-5 border-l-2 border-[#111111]/20">
                {{ leave.reason }}
              </p>
            </div>

            <!-- Meta & Actions Block -->
            <div class="shrink-0 flex flex-col md:flex-row 2xl:flex-col items-start md:items-center 2xl:items-end justify-between 2xl:justify-center gap-6 2xl:gap-8 2xl:w-[250px] bg-[#fcfcfa] 2xl:bg-transparent p-6 2xl:p-0 border border-[#eee] 2xl:border-none">
               
               <div class="text-left 2xl:text-right w-full flex flex-row 2xl:flex-col justify-between 2xl:justify-start items-center 2xl:items-end gap-2">
                 <div class="font-[Space_Grotesk] font-bold text-xl tracking-tight text-[#111]">{{ formatDate(leave.startDate) }}</div>
                 <div class="font-bold uppercase text-[9px] tracking-[0.2em] text-[#FF4A00] mx-4 2xl:mx-0">TO</div>
                 <div class="font-[Space_Grotesk] font-bold text-xl tracking-tight text-[#111]">{{ formatDate(leave.endDate) }}</div>
               </div>
               
               <div class="w-full h-px bg-[#eee] 2xl:hidden"></div>

               <div class="w-full flex justify-end">
                  <template v-if="leave.status === 'Pending'">
                    <div class="flex gap-3 w-full sm:w-auto">
                      <button @click="updateStatus(leave._id, 'Approved')" class="flex-1 sm:flex-none bg-[#111111] text-[#F4F4F0] px-8 py-4 font-bold uppercase tracking-[0.2em] text-[11px] hover:bg-[#00D084] hover:text-[#111] transition-colors shadow-[4px_4px_0px_#111111] hover:shadow-[4px_4px_0px_#00D084] active:translate-y-1 active:translate-x-1 active:shadow-none">
                        Approve
                      </button>
                      <button @click="updateStatus(leave._id, 'Rejected')" class="flex-1 sm:flex-none bg-transparent border-2 border-[#111111] text-[#111111] px-6 py-4 font-bold uppercase tracking-[0.2em] text-[11px] hover:bg-[#FF3B30] hover:text-[#111] hover:border-[#FF3B30] transition-colors">
                        Reject
                      </button>
                    </div>
                  </template>
                  <template v-else>
                    <div class="text-[11px] font-bold uppercase tracking-[0.2em] px-6 py-3 border-2" :class="{
                      'bg-[#00D084] text-[#111111] border-[#00D084]': leave.status === 'Approved',
                      'bg-[#FF3B30] text-[#111111] border-[#FF3B30]': leave.status === 'Rejected'
                    }">
                      <span v-if="leave.status === 'Approved'" class="mr-2">&check;</span>
                      <span v-else class="mr-2">&times;</span>
                      {{ leave.status }}
                    </div>
                  </template>
               </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import api from '../axios'

const leaves = ref([])
const loading = ref(true)

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

const updateStatus = async (id, status) => {
  try {
    await api.put(`/leaves/${id}`, { status })
    fetchLeaves()
  } catch (err) {
    console.error('Failed to update status', err)
    alert('Failed to update status.')
  }
}

const formatDate = (dateString) => {
  const d = new Date(dateString)
  return d.toISOString().split('T')[0] // Clean Monospace formatting
}

const pendingCount = computed(() => leaves.value.filter(l => l.status === 'Pending').length)
const approvedCount = computed(() => leaves.value.filter(l => l.status === 'Approved').length)
const rejectedCount = computed(() => leaves.value.filter(l => l.status === 'Rejected').length)

onMounted(() => {
  fetchLeaves()
})
</script>
