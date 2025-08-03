import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import './style.css'
import App from './App.vue'

// Import pages
import HomePage from './pages/HomePage.vue'
import DetailPage from './pages/DetailPage.vue'

const routes = [
  { path: '/', component: HomePage },
  { path: '/movie/:id', component: DetailPage, props: true }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)
app.mount('#app')