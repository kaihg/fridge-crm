<script setup lang="ts">
import { ref } from 'vue'

const tabs = ref([
  { name: '冷藏', path: '/fridge-crm/fresh' },
  { name: '冷凍', path: '/fridge-crm/frozen' },
  { name: '食譜推薦', path: '/fridge-crm/recipes' }
])
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <nav class="bg-white shadow-lg">
      <div class="max-w-7xl mx-auto px-4">
        <div class="flex justify-center">
          <router-link
            v-for="tab in tabs"
            :key="tab.path"
            :to="tab.path"
            class="px-6 py-4 text-gray-600 hover:text-gray-900"
            active-class="text-blue-600 border-b-2 border-blue-600"
          >
            {{ tab.name }}
          </router-link>
        </div>
      </div>
    </nav>
    <main class="max-w-7xl mx-auto px-4 py-6">
      <router-view></router-view>
    </main>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
