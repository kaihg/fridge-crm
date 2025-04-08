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
    <ul v-if="filteredSuggestions.length > 0" class="mt-2 bg-white rounded-lg shadow">
      <li
        v-for="suggestion in filteredSuggestions"
        :key="suggestion"
        @click="selectSuggestion(suggestion)"
        class="p-2 hover:bg-gray-100 cursor-pointer"
      >
        {{ suggestion }}
      </li>
    </ul>

    <div class="space-y-4">
      <FoodItem
        v-for="item in foodItems"
        :key="item.id"
        :item="item"
        @remove="removeItem"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import FoodItem from '../components/FoodItem.vue'

interface FoodItem {
  id: string
  name: string
  category: string
  storageDate: string
  brand?: string
  isExpanded: boolean
}

const props = defineProps<{
  type: 'fresh' | 'frozen'
}>()

const searchQuery = ref('')
const foodItems = ref<FoodItem[]>([])
const suggestions = ref([
  '牛奶',
  '雞蛋',
  '牛肉',
  '豬肉',
  '蔬菜',
  '水果',
  '起司',
  '優格'
])

const filteredSuggestions = computed(() => {
  return suggestions.value.filter(suggestion =>
    suggestion.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const filterSuggestions = () => {
  // 實作自動完成建議
}

const selectSuggestion = (suggestion: string) => {
  const newItem: FoodItem = {
    id: Date.now().toString(),
    name: suggestion,
    category: '未分類',
    storageDate: new Date().toISOString().split('T')[0],
    isExpanded: false
  }
  foodItems.value.push(newItem)
  searchQuery.value = ''
}

const removeItem = (id: string) => {
  foodItems.value = foodItems.value.filter(item => item.id !== id)
}

const addNewItem = () => {
  if (searchQuery.value.trim()) {
    const newItem: FoodItem = {
      id: Date.now().toString(),
      name: searchQuery.value,
      category: '未分類',
      storageDate: new Date().toISOString().split('T')[0],
      isExpanded: false
    }
    foodItems.value.push(newItem)
    searchQuery.value = ''
  }
}
</script> 