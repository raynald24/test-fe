<template>
  <div class="movie-card group cursor-pointer transform transition-all duration-300 hover:-translate-y-1" @click="navigateToDetail">
    <div class="relative overflow-hidden rounded-2xl bg-gray-800 w-full sm:w-72 md:w-64 h-96 shadow-lg shadow-gray-400/30 group-hover:shadow-xl group-hover:shadow-gray-400/40">
      <img
        :src="
          movie.Poster !== 'N/A'
            ? movie.Poster
            : ''
        "
        :alt="movie.Title"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        @error="handleImageError"
      />
      
      <!-- Age Rating Badge -->
      <div class="absolute top-3 right-3 bg-black/70 backdrop-blur-sm text-white px-2 py-1 rounded text-xs font-bold">
        {{ getAgeRating(movie.Rated) }}
      </div>
      
      <!-- Hover Overlay -->
      <div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <div class="text-center text-white">
          <div class="text-sm mb-2">Click to view details</div>
          <div class="text-xs">{{ movie.Runtime || '117 min' }}</div>
        </div>
      </div>
    </div>
    
    <!-- Movie Information -->
    <div class="mt-4 text-center">
      <h3 class="text-white font-medium text-md mb-2 line-clamp-2">
        {{ movie.Title || 'Kimetsu No Yaiba Mugen Train' }}
      </h3>
      <p class="text-gray-400 text-xs">
        {{ getAgeRating(movie.Rated) }}
      </p>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';

export default {
  name: 'MovieCard',
  props: {
    movie: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const router = useRouter();

    const navigateToDetail = () => {
      router.push(`/movie/${props.movie.id || props.movie.imdbID}`);
    };

    const handleImageError = (event) => {
      event.target.src = '';
    };

    // Fungsi untuk mengkonversi Rated ke format umur
    const getAgeRating = (rated) => {
      if (!rated || rated === 'N/A') return 'N/A';
      const ratingMap = {
        'R': '17+',
        'PG': '10+',  
        'PG-13': '13+', 
        'G': 'All',
        'NC-17': '18+',
        'NOT RATED': 'NR',
        'UNRATED': 'NR'
      };
      return ratingMap[rated.toUpperCase()] || rated;
    };

    return {
      navigateToDetail,
      handleImageError,
      getAgeRating,
    };
  },
};
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
