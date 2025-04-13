<template>
  <div class="txt-gray-light">
    <div v-if="trendingMovies" class="mt-4">
      <h4 class="txt-gray-light fw-600 text-start px-2">Trending Now</h4>
      <div class="scrolling-wrapper d-flex flex-nowrap gap-2 overflow-x-auto overflow-y-hidden">
        <router-link
          v-for="(movie, index) in trendingMovies"
          :key="index"
          :to="{ name: 'movie-details', params: { id: movie.imdbID } }"
          class="text-decoration-none"
        >
        <MovieCard :movie="movie" class="movie-card "></MovieCard>
        </router-link>
      </div>
    </div>
    <div class="mt-4" v-if="popularMovies">
      <h4 class="txt-gray-light fw-600 text-start px-2">Popular Movies</h4>
      <div class="d-flex align-items-center h-300px px-2" >
        <div class="scrolling-wrapper d-flex flex-nowrap gap-2 overflow-x-auto overflow-y-hidden">
          <router-link v-for="(movie, index) in popularMovies" :key="index"
            :to="{ name: 'movie-details', params: { id: movie.imdbID } }" class="text-decoration-none">
            <MovieCard :movie="movie" />
          </router-link>
        </div>
      </div>
    </div>
    <div class="mt-4" v-if="popularSeries">
      <h4 class="txt-gray-light fw-600 text-start px-2">Popular Series</h4>
      <div class="d-flex align-items-center h-300px px-2" >
        <div class="scrolling-wrapper d-flex flex-nowrap gap-2 overflow-x-auto overflow-y-hidden">
          <router-link v-for="(movie, index) in popularSeries" :key="index"
            :to="{ name: 'movie-details', params: { id: movie.imdbID } }" class="text-decoration-none">
            <MovieCard :movie="movie" />
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MovieCard from "../../Layouts/MovieCard.vue";
export default {

  components: {
    MovieCard,
  },
  name: "MovieList",
  data() {
    return {
      popularMovies: [],
      popularSeries: [],
      trendingMovies: [],
      loadingPopularMovies: true,
      loadingTrendingMovies: true,
      loadingPopularSeries: true,
    };
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      this.getPopularMovies()
      this.getPopularSeries()
      this.getTrendingMovies()
    },
    async getPopularMovies() {
      try {
        this.loadingPopularMovies = true
        const response = await fetch(
          'https://www.omdbapi.com/?apikey=474ac197&s=end&type=movie'
        );
        const data = await response.json();
        this.popularMovies = data.Search;
      } catch (error) {
        console.error('Error fetching popular movies:', error);
      } finally {
        this.loadingPopularMovies = false
      }
    },
    async getTrendingMovies() {
      try {
        this.loadingTrendingMovies = true
        const response = await fetch(
          'https://www.omdbapi.com/?apikey=474ac197&s=movie&type=movie'
        );
        const data = await response.json();
        this.trendingMovies = data.Search;
      } catch (error) {
        console.error('Error fetching trending movies:', error);
      } finally {
        this.loadingTrendingMovies = false
      }
    },
    async getPopularSeries() {
      try {
        this.loadingPopularSeries = true
        const response = await fetch(
          'https://www.omdbapi.com/?apikey=474ac197&s=movie&type=series'
        );
        const data = await response.json();
        this.popularSeries = data.Search;
      } catch (error) {
        console.error('Error fetching trending movies:', error);
      } finally {
        this.loadingPopularSeries = false
      }
    },
  },
};
</script>

<style scoped>
.scrolling-wrapper {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.scrolling-wrapper::-webkit-scrollbar {
  display: none;
}

.card-img-top {
  height: 120px;
  object-fit: cover;
  border-radius: 6px;
}

.scrolling-wrapper {
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  overflow-y: hidden;
}
</style>
