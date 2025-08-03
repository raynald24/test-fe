<template>
  <div class="min-h-screen pt-8 pl-10 pb-20 pr-20 bg-[#242c33]">
    <!-- Loading State -->
    <div v-if="movieStore.loading" class="flex justify-center items-center h-64">
      <div class="text-white text-lg">Loading movies...</div>
    </div>

    <!-- Error State -->
    <div v-else-if="movieStore.error" class="flex justify-center items-center h-64">
      <div class="text-red-400 text-lg">{{ movieStore.error }}</div>
    </div>

    <!-- Movies Grid -->
    <div v-else class="container mx-auto pr-20">
      <div class="grid grid-cols-3 gap-4 mb-12 pr-20">
        <MovieCard v-for="movie in movieStore.movies" :key="movie.id" :movie="movie" />
      </div>

      <!-- Pagination -->
      <div class="flex justify-center items-center space-x-2">
        <!-- Previous Button -->
        <button
          @click="movieStore.prevPage(searchQuery)"
          :disabled="movieStore.currentPage === 1"
          class="w-8 h-8 p-10 text-cinema-red rounded-full flex items-center justify-center transition-colors text-sm font-medium"
        >
          Sebelumnya
        </button>

        <!-- Page Numbers -->
        <button
          v-for="page in displayedPages"
          :key="page"
          @click="movieStore.goToPage(searchQuery, page)"
          :class="[ 
            'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors',
            movieStore.currentPage === page ? 'bg-cinema-red text-white' : 'bg-gray-700 text-cinema-red hover:bg-gray-600'
          ]"
        >
          {{ page }}
        </button>

        <!-- Ellipsis -->
        <div v-if="movieStore.totalPages > 90" class="text-cinema-red text-sm">...</div>

        <!-- Last Page (if applicable) -->
        <button
          v-if="movieStore.totalPages > 90 && !displayedPages.includes(90)"
          @click="movieStore.goToPage(searchQuery, 90)"
          :class="[ 
            'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors',
            movieStore.currentPage === 90 ? 'bg-cinema-red text-white' : 'bg-gray-700 text-cinema-red hover:bg-gray-600'
          ]"
        >
          90
        </button>

        <!-- Next Button -->
        <button
          @click="movieStore.nextPage(searchQuery)"
          :disabled="movieStore.currentPage === movieStore.totalPages"
          class="w-8 h-8 p-10 text-cinema-red rounded-full flex items-center justify-center text-sm font-medium"
        >
          Selanjutnya
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, computed } from 'vue';
import { useMovieStore } from '@/stores/movieStore';
import MovieCard from '@/components/MovieCard.vue';

export default {
  name: 'HomePage',
  components: {
    MovieCard,
  },
  setup() {
    const movieStore = useMovieStore();
    const searchQuery = 'movie';

    const displayedPages = computed(() => {
      const pages = [];
      const totalPages = movieStore.totalPages > 90 ? 90 : movieStore.totalPages;  // Batasi total halaman ke 90
      const currentPage = movieStore.currentPage;
      const maxPages = 5;

      let startPage = Math.max(1, currentPage - Math.floor(maxPages / 2));
      let endPage = Math.min(totalPages, startPage + maxPages - 1);

      if (endPage - startPage + 1 < maxPages) {
        startPage = Math.max(1, endPage - maxPages + 1);
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      return pages;
    });

    onMounted(() => {
      movieStore.fetchMovies(searchQuery);
    });

    return {
      movieStore,
      searchQuery,
      displayedPages,
    };
  },
};
</script>
