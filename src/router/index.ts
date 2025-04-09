import { createRouter, createWebHistory } from 'vue-router'
import FridgeView from '../views/FridgeView.vue'
import RecipesView from '../views/RecipesView.vue'
import RecipeDetailView from '../views/RecipeDetailView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/fridge-crm/:type',
      name: 'fridge',
      component: FridgeView,
      props: true
    },
    {
      path: '/fridge-crm/recipes',
      name: 'recipes',
      component: RecipesView
    },
    {
      path: '/fridge-crm/recipes/:id',
      name: 'recipe-detail',
      component: RecipeDetailView,
      props: true
    },
    {
      path: '/',
      redirect: '/fridge-crm/fresh'
    }
  ]
})

export default router 