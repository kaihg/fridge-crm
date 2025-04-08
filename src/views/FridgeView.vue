<template>
  <div>
    <div class="mb-6 flex gap-2">
      <input
        type="text"
        v-model="searchQuery"
        @input="filterSuggestions"
        class="flex-1 p-2 border rounded-lg"
        placeholder="輸入食材名稱..."
      />
      <button
        @click="addNewItem"
        class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        新增
      </button>
    </div>
    
    <div v-if="filteredSuggestions.length > 0" class="mt-2">
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
        <div
          v-for="suggestion in filteredSuggestions"
          :key="suggestion"
          @click="selectSuggestion(suggestion)"
          class="p-2 bg-white rounded-lg shadow hover:bg-gray-100 cursor-pointer text-center"
        >
          {{ suggestion }}
        </div>
      </div>
    </div>
    <div class="mb-4 flex justify-end">
      <select
        v-model="sortBy"
        class="p-2 border rounded-lg"
      >
        <option value="default">預設</option>
        <option value="name">依名稱排序</option>
        <option value="date">依入庫日排序</option>
      </select>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <FoodItem
        v-for="item in sortedFoodItems"
        :key="item.id"
        :item="item"
        @remove="removeItem"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import FoodItem from '../components/FoodItem.vue'
import { useFoodStore } from '../stores/foodStore'

const props = defineProps<{
  type: 'fresh' | 'frozen'
}>()

const searchQuery = ref('')
const sortBy = ref<'default' | 'name' | 'date'>('default')

const foodStore = ref(useFoodStore(props.type))

const filteredSuggestions = computed(() => {
  return foodStore.value.getFilteredSuggestions(searchQuery.value)
})

const sortedFoodItems = computed(() => {
  return foodStore.value.getSortedItems(sortBy.value)
})

const filterSuggestions = () => {
  // 實作自動完成建議
}

const selectSuggestion = (suggestion: string) => {
  foodStore.value.addItem(suggestion)
  searchQuery.value = ''
}

const removeItem = (id: string) => {
  foodStore.value.removeItem(id)
}

const addNewItem = () => {
  if (searchQuery.value.trim()) {
    foodStore.value.addItem(searchQuery.value)
    searchQuery.value = ''
  }
}

// 監聽 type 變化，切換顯示的食材
watch(() => props.type, (newType) => {
  foodStore.value = useFoodStore(newType)
})
</script> 