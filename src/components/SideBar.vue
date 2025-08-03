<template>
  <aside
    class="fixed left-0 top-16 h-full w-64 bg-dark-gray-400 p-4 overflow-y-auto"
  >
    <nav class="space-y-2">
      <router-link
        to="/"
        class="block py-2 px-4 text-white hover:bg-cinema-red rounded transition-colors"
        :class="{ 'bg-cinema-red': $route.path === '/test-fe/' }"
      >
        Now Playing
      </router-link>

      <router-link
        to="/coming-soon"
        class="block py-2 px-4 text-white hover:bg-cinema-red rounded transition-colors"
        :class="{ 'bg-cinema-red': $route.path === '/coming-soon' }"
      >
        Coming Soon
      </router-link>

      <router-link
        to="/theatre"
        class="block py-2 px-4 text-white hover:bg-cinema-red rounded transition-colors"
        :class="{ 'bg-cinema-red': $route.path === '/theatre' }"
      >
        Theatre
      </router-link>

      <router-link
        to="/promotion"
        class="block py-2 px-4 text-white hover:bg-cinema-red rounded transition-colors"
        :class="{ 'bg-cinema-red': $route.path === '/promotion' }"
      >
        Promotion
      </router-link>

      <router-link
        to="/informations"
        class="block py-2 px-4 text-white hover:bg-cinema-red rounded transition-colors"
        :class="{ 'bg-cinema-red': $route.path === '/informations' }"
      >
        Informations
      </router-link>
    </nav>
  </aside>
</template>

<script>
export default {
  name: 'SideBar',
};
</script>
