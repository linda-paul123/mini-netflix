<template>
  <div v-if="!loading" class="movie-detail d-flex flex-column">
    <div class="container-fluid gradient-black txt-gray-light flex-grow-1 overflow-auto p-4">
      <div class="row no-gutters py-3">
        <!-- Movie Poster with Play Button -->
        <div class="col-md-5 position-relative mb-5">
          <img class="w-100 rounded shadow poster-img" :src="movieDetail.Poster" alt="Avengers Poster" loading="lazy" />
          <div class="play-button position-absolute">
            <i class="fas fa-play fa-2x"></i>
          </div>
        </div>

        <!-- Movie Info -->
        <div class="col-md-7 px-4 txt-gray-light text-left">
          <!-- Title + Info + Rating in One Line -->
          <div class="d-flex flex-column mb-1 txt-gray-light">
            <div class="d-flex justify-content-between align-items-center flex-wrap mb-1 txt-gray-light">
              <h2 class="display-4 font-weight-bolder mb-0 text-wrap me-3">
                {{ movieDetail?.Title }}
              </h2>
            </div>
            <div class="d-flex flex-row flex-wrap justify-content-between align-items-center">
              <div>
                <p class="my-2 px-1 txt-gray-light text-capitalize fs-15px"><span class="fw-500 px-1">{{
                  movieDetail?.Year
                    }}</span> | <span class="fw-500 px-1">{{ movieDetail.Type }} </span>|
                  <span class="fw-500 px-1">{{ movieDetail.Genre }}</span>
                </p>
              </div>
              <div class="d-flex align-items-center mx-2 px-2 border border-5px">
                <span class="fw-500 mb-0">{{ movieDetail?.imdbRating }}</span>
                <i class="fas fa-star text-warning ms-2"></i>
              </div>
            </div>
          </div>
          <div class="py-2">
            <b-tabs content-class="">
              <b-tab title="OVERVIEW" active class="tab">
                <div class="py-3 px-1 mt-1">
                  <p class="overview-text text-start txt-gray-light">
                    {{ movieDetail?.Plot }}
                  </p>
                  <div class="d-flex flex-row flex-wrap align-items-center py-1 text-start">
                    <div class="pe-2 txt-gray fs-15px">Starring :</div>
                    <div class="txt-gray-light fs-15px">{{ movieDetail?.Actors }}</div>
                  </div>
                  <div class="d-flex flex-row flex-wrap align-items-center py-1 text-start">
                    <div class="pe-2 txt-gray fs-15px">Director :</div>
                    <div class="txt-gray-light fs-15px">{{ movieDetail?.Director }} </div>
                  </div>
                  <div class="d-flex flex-row flex-wrap align-items-center py-1 text-start">
                    <div class="pe-2 txt-gray fs-15px">Writer :</div>
                    <div class="txt-gray-light fs-15px">{{ movieDetail?.Writer }} </div>
                  </div>
                  <div class="d-flex flex-row flex-wrap align-items-center py-1 text-start">
                    <div class="pe-2 txt-gray fs-15px">Language :</div>
                    <div class="txt-gray-light fs-15px">{{ movieDetail?.Language }} </div>
                  </div>
                </div>
              </b-tab>
              <b-tab v-if="movieDetail.Type == 'series'" title="EPISODES">
                <div class="py-3 px-1 mt-1 txt-gray d-flex justify-content-start align-items-center">
                  <i class="fa-solid fa-circle-info pe-2"></i>
                  The episodes will be available shortly.
                </div>
              </b-tab>
              <b-tab title="TRAILERS & MORE">
                <div class="py-3 px-1 mt-1 txt-gray d-flex justify-content-start align-items-center">
                  <i class="fa-solid fa-circle-info pe-2"></i>
                  The {{ movieDetail.Type }} trailers will be available shortly.
                </div>
              </b-tab>
            </b-tabs>
          </div>

        </div>
      </div>
    </div>
  </div>
  <div v-else class="h-500px d-flex justify-content-center align-items-center w-100 text-white">
    Loading...
  </div>
</template>

<script>

export default {
  name: "MovieDetails",
  components: {
  },

  data() {
    return {
      movieDetail: null,
      loading:false,
    };
  },
  mounted() {
    this.getMovieData();
  },
  methods: {
    async getMovieData() {
      try {
        this.loading = true
        const response = await fetch(
          `https://www.omdbapi.com/?apikey=474ac197&i=${this.$route.params.id}`
        );
        this.movieDetail = await response.json();
      } catch (error) {
        console.error('Error fetching latest movies:', error);
      } finally{
        this.loading = false
      }
    },
  }
};
</script>

<style scoped>
.movie-detail {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.gradient-black {
  background: linear-gradient(to bottom, rgb(28, 28, 28), black);
  /* Gradient from gray at top to black at bottom */
}

.poster-img {
  width: 100vw;
  /* or a specific width like 1200px */
  height: 86vh;
  /* or a specific height like 700px */
  object-fit: fill;
  /* Stretches image to fill container (may distort) */
}

.play-button {
  bottom: 20px;
  left: 20px;
  background: rgba(255, 0, 0, 0.8);
  color: white;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.tabs .tab {
  margin-right: 20px;
  font-weight: 500;
  cursor: pointer;
  color: #999;
}

.tabs .tab.active {
  color: white;
  /* border-bottom: 2px solid red; */
}

.related-img {
  width: 100px;
  height: 150px;
  object-fit: cover;
  border-radius: 6px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
}

.overview-text {
  max-height: 90px;
  overflow-y: auto;
}

/* Responsive tweaks */
@media (max-width: 768px) {
  .poster-img {
    max-height: 50vh;
  }

  .play-button {
    width: 50px;
    height: 50px;
    font-size: 1.2rem;
    bottom: 15px;
    left: 15px;
  }

  h1.display-4 {
    font-size: 1.8rem;
  }

  .tabs {
    display: flex;
    flex-wrap: wrap;
    font-size: 0.9rem;
  }

  .tabs .tab {
    margin-bottom: 8px;
  }

  .overview-text {
    max-height: none;
  }

  .d-flex.justify-content-between.align-items-center {
    flex-direction: column;
    align-items: flex-start !important;
  }

  .d-flex.align-items-center.mt-2 {
    margin-top: 10px;
  }
}

@media (max-width: 480px) {
  .play-button {
    width: 45px;
    height: 45px;
    font-size: 1rem;
  }

  h1.display-4 {
    font-size: 1.5rem;
  }

  .tabs {
    font-size: 0.8rem;
  }
}
</style>
