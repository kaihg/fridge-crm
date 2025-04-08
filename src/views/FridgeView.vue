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
          v-for="suggestion in filteredSuggestions.slice(0, 5)"
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

// 使用 localStorage 來儲存不同類型的食材
const getStoredItems = (type: 'fresh' | 'frozen'): FoodItem[] => {
  const stored = localStorage.getItem(`foodItems_${type}`)
  return stored ? JSON.parse(stored) : []
}

const foodItems = ref<FoodItem[]>(getStoredItems(props.type))

// 儲存食材到 localStorage
const saveItems = (items: FoodItem[], type: 'fresh' | 'frozen') => {
  localStorage.setItem(`foodItems_${type}`, JSON.stringify(items))
}

// 監聽 type 變化，切換顯示的食材
watch(() => props.type, (newType) => {
  foodItems.value = getStoredItems(newType)
})

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

const sortBy = ref<'default' | 'name' | 'date'>('default')

const filteredSuggestions = computed(() => {
  return suggestions.value.filter(suggestion =>
    suggestion.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const sortedFoodItems = computed(() => {
  return [...foodItems.value].sort((a, b) => {
    if (sortBy.value === 'name') {
      return a.name.localeCompare(b.name, 'zh-TW')
    } else if (sortBy.value === 'date') {
      return new Date(b.storageDate).getTime() - new Date(a.storageDate).getTime()
    } else {
      // 預設排序：先依名稱，名稱相同時依入庫日（最舊的排前面）
      const nameCompare = a.name.localeCompare(b.name, 'zh-TW')
      if (nameCompare === 0) {
        return new Date(a.storageDate).getTime() - new Date(b.storageDate).getTime()
      }
      return nameCompare
    }
  })
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
  saveItems(foodItems.value, props.type)
  searchQuery.value = ''
}

const removeItem = (id: string) => {
  foodItems.value = foodItems.value.filter(item => item.id !== id)
  saveItems(foodItems.value, props.type)
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
    saveItems(foodItems.value, props.type)
    searchQuery.value = ''
  }
}
</script> 