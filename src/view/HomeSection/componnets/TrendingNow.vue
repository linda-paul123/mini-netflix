<template>
  <div class="hero-banner" v-if="trendingMovies.length">
    <img :src="trendingMovies[1].Poster" :alt="trendingMovies[1].Title" class="hero-image" />
    <div class="hero-text">
      <h2>{{ trendingMovies[1].Title }}</h2>
      <p>{{ trendingMovies[1].Year }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "TrendingNow",

  data() {
    return {
      trendingMovies: []
    };
  },

  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      this.getTrendingNow()
    },
    async getTrendingNow() {
      try {
        const response = await fetch(
          "http://www.omdbapi.com/?apikey=474ac197&s=movie&type=series&y=2024"
        );
        const data = await response.json();
        this.trendingMovies = data.Search;
        // console.log('trendingMovies', data)
      } catch (error) {
        console.error("Error fetching latest movies:", error);
      }
    }
  }
};
</script>

<style scoped>
.hero-banner {
  width: 100%;
  height: 60vh;
  min-height: 300px;
}

.hero-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.4);
}

.hero-text {
  position: absolute;
  top: 50%;
  left: 2%;
  transform: translateY(-50%);
  color: white;
  z-index: 1;
}

.hero-text h2 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.hero-text p {
  font-size: 1.25rem;
  color: #ccc;
}

/* 🔽 Responsive Styles */
@media (max-width: 768px) {
  .hero-banner {
    height: 45vh;
  }

  .hero-text {
    left: 4%;
    top: 55%;
  }

  .hero-text h2 {
    font-size: 1.8rem;
  }

  .hero-text p {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .hero-banner {
    height: 35vh;
  }

  .hero-text h2 {
    font-size: 1.5rem;
  }

  .hero-text p {
    font-size: 0.9rem;
  }
}
</style>
