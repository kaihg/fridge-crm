<template>
  <div class="space-y-4">
    <div
      v-for="recipe in recipes"
      :key="recipe.id"
      @click="$router.push(`/recipes/${recipe.id}`)"
      class="bg-white rounded-lg shadow p-4 cursor-pointer hover:bg-gray-50"
    >
      <h3 class="text-lg font-medium">{{ recipe.name }}</h3>
      <p class="text-sm text-gray-600 mt-1">{{ recipe.description }}</p>
      <div class="mt-2">
        <span class="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
          需要 {{ recipe.requiredIngredients.length }} 種食材
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Recipe {
  id: string
  name: string
  description: string
  requiredIngredients: string[]
}

const recipes = ref<Recipe[]>([
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
])
</script> 