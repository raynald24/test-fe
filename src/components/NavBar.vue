<template>
  <nav
    class="bg-[#BD2D2D] h-16 flex items-center justify-between px-6 fixed top-0 left-0 right-0 z-50"
  >
    <!-- Logo -->
    <div class="text-white font-bold text-xl mr-10">
      <router-link to="/">
        <img src="@/assets/cinemakuy.png" alt="Cinemakuy Logo" class="h-10" />
      </router-link>
    </div>

    <!-- Search Bar -->
    <div class="flex-1 max-w-md ml-20 mr-auto"> 
      <div class="relative">
        <input
          type="text"
          placeholder="Search Title / Theatre Name"
          class="w-full px-5 py-2 rounded-2xl bg-white text-black placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white"
          v-model="searchQuery"
          @keyup.enter="handleSearch"
        />
      </div>
    </div>

    <!-- Right Side -->
    <div class="flex items-center space-x-4 p-5"> 
      <img src="@/assets/IMAX.png" alt="Language Option" class="h-4 pr-4" />
      <img src="@/assets/dolby.png" alt="Dolby Atmos" class="h-7" />
    </div>
  </nav>
</template>

<script>
import { ref } from 'vue';
import { useMovieStore } from '@/stores/movieStore';

export default {
  name: 'NavBar',
  setup() {
    const searchQuery = ref('');
    const movieStore = useMovieStore(); 

    const handleSearch = async () => {
      if (searchQuery.value.trim()) {
        try {
          // Panggil fetchMovies dari store untuk mencari data API
          await movieStore.fetchMovies(searchQuery.value, 1); // saya ambil dari halaman 1
          console.log('Search results:', movieStore.movies); 
        } catch (error) {
          console.error('Search failed:', error);
        }
      }
    };

    return {
      searchQuery,
      handleSearch,
    };
  },
};
</script>