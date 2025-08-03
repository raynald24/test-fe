import { defineStore } from 'pinia'
import axios from 'axios'

export const useMovieStore = defineStore('movie', {
  state: () => ({
    movies: [],
    currentMovie: null,
    loading: false,
    error: null,
    currentPage: 1,
    totalPages: 1,
    totalResults: 0
  }),

  actions: {
    async fetchMovies(searchQuery = 'movie', page = 1) {
      this.loading = true
      this.error = null
      
      try {
        const response = await axios.get(`https://www.omdbapi.com/?s=${encodeURIComponent(searchQuery)}&type=movie&page=${page}&apikey=4f31775c`)
        
        if (response.data.Response === 'True') {
          // Ambil daftar film dasar
          const searchResults = response.data.Search.slice(0, 9) 
          // Ambil detail lengkap untuk setiap film
          const movieDetails = await Promise.all(
            searchResults.map(async (movie) => {
              const detailResponse = await axios.get(`https://www.omdbapi.com/?i=${movie.imdbID}&apikey=4f31775c`)
              if (detailResponse.data.Response === 'True') {
                return {
                  ...movie,
                  ...detailResponse.data,
                  id: `${movie.imdbID}_${searchResults.indexOf(movie)}`,
                  originalId: movie.imdbID,
                  Title: detailResponse.data.Title.replace(/\s*\(N\/A\)/, '').trim(),
                  Rated: detailResponse.data.Rated || 'N/A'
                }
              }
              return {
                ...movie,
                id: `${movie.imdbID}_${searchResults.indexOf(movie)}`,
                originalId: movie.imdbID,
                Title: movie.Title.replace(/\s*\(N\/A\)/, '').trim(),
                Rated: 'N/A'
              }
            })
          )

          this.movies = movieDetails
          this.currentPage = page
          this.totalResults = parseInt(response.data.totalResults)
          this.totalPages = Math.ceil(this.totalResults / 5) // Sesuaikan dengan batas 5
        } else {
          this.error = response.data.Error
          this.movies = Array(5).fill(null).map((_, index) => ({
            id: `fallback_${index}`,
            originalId: `fallback_${index}`,
            Title: 'Fallback Movie',
            Year: '2020',
            Rated: 'N/A',
            Runtime: '120 min',
            Genre: 'Action, Adventure',
            Director: 'Unknown',
            Actors: 'Unknown',
            Plot: 'This is a fallback movie description.',
            Language: 'English',
            Released: '01 Jan 2020',
            Poster: '',
            Rating: ''
          }))
          this.totalPages = 1
          this.currentPage = 1
        }
      } catch (error) {
        this.error = error.message
        this.movies = Array(5).fill(null).map((_, index) => ({
          id: `fallback_${index}`,
          originalId: `fallback_${index}`,
          Title: 'Fallback Movie',
          Year: '2020',
          Rated: 'N/A',
          Runtime: '120 min',
          Genre: 'Action, Adventure',
          Director: 'Unknown',
          Actors: 'Unknown',
          Plot: 'This is a fallback movie description.',
          Language: 'English',
          Released: '01 Jan 2020',
          Poster: '',
          Rating: ''
        }))
        this.totalPages = 1
        this.currentPage = 1
      } finally {
        this.loading = false
      }
    },

    async fetchMovieById(id) {
      this.loading = true
      this.error = null
      
      try {
        const imdbId = id.includes('_') ? id.split('_')[0] : id
        const response = await axios.get(`https://www.omdbapi.com/?i=${imdbId}&apikey=4f31775c`)
        
        if (response.data.Response === 'True') {
          this.currentMovie = {
            ...response.data,
            Title: response.data.Title.replace(/\s*\(N\/A\)/, '').trim(),
            Rated: response.data.Rated || 'N/A'
          }
        } else {
          this.error = response.data.Error
          this.currentMovie = {
            Title: 'Fallback Movie',
            Year: '2020',
            Rated: 'N/A',
            Runtime: '120 min',
            Genre: 'Action, Adventure',
            Director: 'Unknown',
            Actors: 'Unknown',
            Plot: 'This is a fallback movie description.',
            Language: 'English',
            Released: '01 Jan 2020',
            Poster: '',
            Rating: ''
          }
        }
      } catch (error) {
        this.error = error.message
        this.currentMovie = {
          Title: 'Fallback Movie',
          Year: '2020',
          Rated: 'N/A',
          Runtime: '120 min',
          Genre: 'Action, Adventure',
          Director: 'Unknown',
          Actors: 'Unknown',
          Plot: 'This is a fallback movie description.',
          Language: 'English',
          Released: '01 Jan 2020',
          Poster: '',
          Rating: ''
        }
      } finally {
        this.loading = false
      }
    },

    clearCurrentMovie() {
      this.currentMovie = null
    },

    nextPage(searchQuery = 'movie') {
      if (this.currentPage < this.totalPages) {
        this.fetchMovies(searchQuery, this.currentPage + 1)
      }
    },

    prevPage(searchQuery = 'movie') {
      if (this.currentPage > 1) {
        this.fetchMovies(searchQuery, this.currentPage - 1)
      }
    },

    goToPage(searchQuery = 'movie', page) {
      if (page >= 1 && page <= this.totalPages) {
        this.fetchMovies(searchQuery, page)
      }
    }
  },

  getters: {
    getMovieById: (state) => (id) => {
      return state.movies.find(movie => movie.id === id)
    }
  }
})