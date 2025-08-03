<template>
  <div class="min-h-screen pt-8 pb-16 bg-cinema-dark">
    <!-- Loading State -->
    <div v-if="movieStore.loading" class="flex justify-center items-center h-64">
      <div class="text-white text-lg">Loading movie details...</div>
    </div>

    <!-- Error State -->
    <div v-else-if="movieStore.error" class="flex justify-center items-center h-64">
      <div class="text-red-400 text-lg">{{ movieStore.error }}</div>
    </div>

    <!-- Movie Detail -->
    <div v-else-if="movieStore.currentMovie" class="container mx-auto px-6 pr-6">
      <div class="bg-cinema-gray rounded-lg p-6 mb-12 shadow-md">
        <div class="flex flex-col md:flex-row gap-6">
          <!-- Movie Poster -->
          <div class="flex-shrink-0 w-ful h-full md:w-72">
            <img
              :src="
                movieStore.currentMovie.Poster !== 'N/A'
                  ? movieStore.currentMovie.Poster
                  : ''
              "
              :alt="movieStore.currentMovie.Title"
              class="w-full h-96 object-cover rounded-lg shadow-lg"
              @error="handleImageError"
            />
          </div>

          <!-- Movie Info -->
          <div class="flex-1">
            <h1 class="text-white text-3xl font-bold mb-4">
              {{ movieStore.currentMovie.Title || 'Kimetsu No Yaiba Mugen Train' }}
              <span class="text-gray-400 text-lg">
                {{ getAgeRating(movieStore.currentMovie.Rated) }}
              </span>
            </h1>

            <div class="text-gray-300 mb-6 space-y-2 text-sm">
              <p><strong>Release Date:</strong> {{ formatDate(movieStore.currentMovie.Released) || 'N/A' }}</p>
              <p><strong>Language:</strong> {{ movieStore.currentMovie.Language || 'N/A' }}</p>
              <p><strong>Genre:</strong> {{ movieStore.currentMovie.Genre || 'N/A' }}</p>
              <p><strong>Cast:</strong> {{ movieStore.currentMovie.Actors || 'N/A' }}</p>
              <p><strong>Director:</strong> {{ movieStore.currentMovie.Director || 'N/A' }}</p>
              <p><strong>Length:</strong> {{ movieStore.currentMovie.Runtime || 'N/A' }}</p>
            </div>

            <div class="mb-8">
              <h3 class="text-white text-xl font-semibold mb-3">SINOPSIS</h3>
              <div class="text-gray-300 mb-3">
                <p class="font-semibold">Bahasa Indonesia</p>
              </div>
              <p class="text-gray-300 leading-relaxed text-sm">
                {{ movieStore.currentMovie.Plot || 'N/A' }}
              </p>
            </div>

            <div class="flex space-x-4">
              <button
                class="bg-cinema-red text-white px-6 py-2 rounded-xl font-medium hover:bg-red-700 transition-colors"
                @click="buyTicket"
              >
                Buy Ticket
              </button>
              <button
                class="bg-cinema-red text-white px-6 py-2 rounded-xl font-medium hover:bg-red-700 transition-colors"
                @click="watchTrailer"
              >
                Watch Trailer
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Now Playing Section -->
      <div class="mb-8 pr-20">
        <h2 class="text-white text-2xl font-semibold mb-6">Now Playing</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pr-20">
          <MovieCard v-for="movie in nowPlayingMovies" :key="movie.id" :movie="movie" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useMovieStore } from '@/stores/movieStore';
import MovieCard from '@/components/MovieCard.vue';

export default {
  name: 'DetailPage',
  components: {
    MovieCard,
  },
  setup() {
    const route = useRoute();
    const movieStore = useMovieStore();

    const nowPlayingMovies = computed(() => {
      return movieStore.movies.length > 0 ? movieStore.movies.slice(0, 3) : [];
    });

    const formatDate = (dateString) => {
      if (!dateString || dateString === 'N/A') return 'N/A';
      try {
        const date = new Date(dateString);
        return date.toLocaleDateString('id-ID', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        });
      } catch (e) {
        console.error('Date parsing error:', e);
        return dateString;
      }
    };

    const handleImageError = (event) => {
      event.target.src = '';
    };

    const getAgeRating = (rated) => {
      if (!rated || rated === 'N/A') return 'N/A';
      const ratingMap = {
        'R': '17+',
        'PG': '10+',
        'PG-13': '13+',
        'G': 'All',
        'NC-17': '18+'
      };
      return ratingMap[rated.toUpperCase()] || rated;
    };

    const buyTicket = () => {
      alert('Fitur Buy Ticket belum diimplementasikan. Silakan hubungi admin!');
    };

    const watchTrailer = () => {
      alert('Fitur Watch Trailer belum diimplementasikan. Silakan cek link resmi!');
    };

    onMounted(async () => {
      const movieId = route.params.id;
      await movieStore.fetchMovieById(movieId);

      // Pastikan fetchMovies dipanggil jika belum ada data
      if (movieStore.movies.length === 0) {
        await movieStore.fetchMovies();
      }
    });

    return {
      movieStore,
      nowPlayingMovies,
      formatDate,
      handleImageError,
      getAgeRating,
      buyTicket,
      watchTrailer,
    };
  },
};
</script>

<style scoped>

</style>