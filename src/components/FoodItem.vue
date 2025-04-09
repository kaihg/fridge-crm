<template>
  <div
    class="bg-white rounded-lg shadow p-4 cursor-pointer"
    @click="toggleExpand"
    @dblclick="emit('remove', item.id)"
  >
    <div class="flex justify-between items-center">
      <h3 class="text-lg font-medium">{{ item.name }}</h3>
      <span class="text-sm text-gray-500">{{ item.category }}</span>
    </div>
    
    <div v-if="item.isExpanded" class="mt-2 text-sm text-gray-600">
      <p>入庫日期：{{ item.storageDate }}</p>
      <p v-if="item.brand">品牌：{{ item.brand }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
interface FoodItem {
  id: string
  name: string
  category: string
  storageDate: string
  brand?: string
  isExpanded: boolean
}

const props = defineProps<{
  item: FoodItem
}>()

const emit = defineEmits<{
  (e: 'remove', id: string): void
}>()

const toggleExpand = () => {
  props.item.isExpanded = !props.item.isExpanded
}
</script> 