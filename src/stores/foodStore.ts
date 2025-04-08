import { ref, computed } from 'vue'

export interface FoodItem {
  id: string
  name: string
  category: string
  storageDate: string
  brand?: string
  isExpanded: boolean
}

export const useFoodStore = (type: 'fresh' | 'frozen') => {
  // 使用 localStorage 來儲存不同類型的食材
  const getStoredItems = (): FoodItem[] => {
    const stored = localStorage.getItem(`foodItems_${type}`)
    return stored ? JSON.parse(stored) : []
  }

  const foodItems = ref<FoodItem[]>(getStoredItems())

  // 儲存食材到 localStorage
  const saveItems = (items: FoodItem[]) => {
    localStorage.setItem(`foodItems_${type}`, JSON.stringify(items))
  }

  // 冷藏和冷凍的建議食材分開
  const suggestions = {
    fresh: [
      '牛奶',
      '雞蛋',
      '蔬菜',
      '水果',
      '優格',
      '起司',
      '豆腐',
      '豆漿'
    ],
    frozen: [
      '冷凍水餃',
      '冷凍蔬菜',
      '冷凍肉片',
      '冷凍海鮮',
      '冰淇淋',
      '冷凍披薩',
      '冷凍薯條',
      '冷凍包子'
    ]
  }

  // 儲存手動輸入的食材
  const manualInputs = ref<{ [key: string]: string[] }>({
    fresh: [],
    frozen: []
  })

  // 初始化時載入手動輸入的食材
  const loadManualInputs = () => {
    const storedManualInputs = localStorage.getItem(`manualInputs_${type}`)
    if (storedManualInputs) {
      manualInputs.value[type] = JSON.parse(storedManualInputs)
    }
  }

  const addItem = (name: string) => {
    const newItem: FoodItem = {
      id: Date.now().toString(),
      name,
      category: '未分類',
      storageDate: new Date().toISOString().split('T')[0],
      isExpanded: false
    }
    foodItems.value.push(newItem)
    saveItems(foodItems.value)
    
    // 將手動輸入的食材加入建議清單
    if (!manualInputs.value[type].includes(name)) {
      manualInputs.value[type].push(name)
      localStorage.setItem(`manualInputs_${type}`, JSON.stringify(manualInputs.value[type]))
    }
  }

  const removeItem = (id: string) => {
    foodItems.value = foodItems.value.filter(item => item.id !== id)
    saveItems(foodItems.value)
  }

  const getFilteredSuggestions = (searchQuery: string) => {
    const allSuggestions = [...manualInputs.value[type], ...suggestions[type]]
    
    return allSuggestions
      .filter(suggestion =>
        suggestion.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .slice(0, 5)
  }

  const getSortedItems = (sortBy: 'default' | 'name' | 'date') => {
    return [...foodItems.value].sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name, 'zh-TW')
      } else if (sortBy === 'date') {
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
  }

  // 初始化
  loadManualInputs()

  return {
    foodItems,
    addItem,
    removeItem,
    getFilteredSuggestions,
    getSortedItems
  }
} 