<template>
    <div
      class="movie-card bg-dark position-relative hover-shadow">
      <img
        :src="movie.Poster"
        :alt="movie.Title"
        class="card-img-top"
      />
      <div class="hover-icon position-absolute top-50 start-50 translate-middle">
        <i class="bi bi-play-circle-fill fs-2 text-white"></i>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "MovieCard",
    props: {
      movie: {
        type: Object,
        required: true,
      },
    },
  };
  </script>
  
  <style scoped>
  .movie-card {
    width: 200px;
    height: 250px;
    border-radius: 5px;
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    cursor: pointer;
  }
  
  .card-img-top {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    
  }
  
  .hover-shadow:hover {
    transform: scale(1.05);
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.5);
  }
  
  .hover-icon {
    display: none;
  }
  .movie-card:hover .hover-icon {
    display: block;
  }
  </style>
  