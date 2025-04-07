<template>
  <div class="bg-white rounded-lg shadow p-6">
    <h1 class="text-2xl font-bold mb-4">{{ recipe?.name }}</h1>
    <p class="text-gray-600 mb-6">{{ recipe?.description }}</p>

    <div class="mb-6">
      <h2 class="text-lg font-medium mb-3">所需食材</h2>
      <ul class="space-y-2">
        <li
          v-for="ingredient in recipe?.requiredIngredients"
          :key="ingredient"
          class="flex items-center"
        >
          <span class="w-4 h-4 rounded-full bg-blue-500 mr-2"></span>
          {{ ingredient }}
        </li>
      </ul>
    </div>

    <div class="mt-6">
      <button
        @click="$router.back()"
        class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
      >
        返回列表
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

interface Recipe {
  id: string
  name: string
  description: string
  requiredIngredients: string[]
}

const route = useRoute()
const recipe = ref<Recipe | null>(null)

const mockRecipes: Recipe[] = [
  {
    id: '1',
    name: '番茄炒蛋',
    description: '經典的家常菜，簡單又美味',
    requiredIngredients: ['雞蛋', '番茄', '蔥']
  },
  {
    id: '2',
    name: '蔬菜湯',
    description: '營養豐富的蔬菜湯',
    requiredIngredients: ['胡蘿蔔', '洋蔥', '高麗菜']
  }
]

onMounted(() => {
  recipe.value = mockRecipes.find(r => r.id === route.params.id) || null
})
</script> 