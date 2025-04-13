<template>
    <div class="p-5 gradient-black ">
        <template v-if="dataList && dataList.length > 0">
            <div class="movie-container ">
                <router-link v-for="(movie, index) in dataList" :key="index"
                    :to="{ name: 'movie-details', params: { id: movie.imdbID } }" class="movie-link">
                    <div>
                        <MovieCard :movie="movie" />
                    </div>
                </router-link>
            </div>
        </template>
        <template v-else>
            <div class="h-500px d-flex justify-content-center align-items-center w-100 text-white">
                <div v-if="!loading">
                    <div v-if="showMyListData">
                        Your list is empty.
                    </div>
                    <div v-else>
                        No data
                    </div>
                </div>
                <div v-else>
                    Loading...
                </div>
            </div>

        </template>
    </div>
</template>

<script>
import MovieCard from './MovieCard.vue';

export default {
    name: "ListLayout",
    components: {
        MovieCard,
    },
    data() {
        return {
            dataList: [],
            loading: false,
            showMyListData: false,
        };
    },
    mounted() {
        this.getData()
    },
    methods: {
        getData() {
            if (this.$route.name == 'series-section') {
                this.getSeriesList()
            } else if (this.$route.name == 'movies-section') {
                this.getTrendingMovies()
            } else if (this.$route.name == 'popular-section') {
                this.getPopularMovies()
            } else if (this.$route.name == 'my-section') {
                this.loading = true
                this.dataList = [];
                this.showMyListData = true
                setTimeout(() => {
                    this.loading = false
                }, 1000);
            }
        },
        async getPopularMovies() {
            try {
                this.loading = true
                const response = await fetch(
                    'http://www.omdbapi.com/?apikey=474ac197&s=end&type=movie'
                );
                const data = await response.json();
                this.dataList = data.Search;
            } catch (error) {
                console.error('Error fetching popular movies:', error);
            } finally {
                this.loading = false
            }
        },
        async getTrendingMovies() {
            try {
                this.loading = true
                const response = await fetch(
                    'http://www.omdbapi.com/?apikey=474ac197&s=movie&type=movie'
                );
                const data = await response.json();
                this.dataList = data.Search;
            } catch (error) {
                console.error('Error fetching trending movies:', error);
            } finally {
                this.loading = false
            }
        },
        async getSeriesList() {
            try {
                this.loading = true
                const response = await fetch(
                    'http://www.omdbapi.com/?apikey=474ac197&s=movie&type=series'
                );
                const data = await response.json();
                this.dataList = data.Search;
            } catch (error) {
                console.error('Error fetching trending movies:', error);
            } finally {
                this.loading = false
            }
        },
    },
};
</script>

<style scoped>
.movie-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 20px;
}
.gradient-black {
  background: linear-gradient(to bottom, rgb(28, 28, 28), black);
  /* Gradient from gray at top to black at bottom */
}
</style>