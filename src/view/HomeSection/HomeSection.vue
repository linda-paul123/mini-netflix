<template>
  <div class="main-content">
    <div>
      <TrendingNow></TrendingNow>
      <div class="p-4">
        <MovieList></MovieList>
      </div>
    </div>
  </div>
</template>

<script>
import MovieList from './componnets/MovieList.vue';
import TrendingNow from './componnets/TrendingNow.vue';
export default {
  name: 'HomeSection',
  components: {
    MovieList,
    TrendingNow
  },
  props: {
    msg: String
  }
}
</script>

<style scoped>

.main-content {
  background: linear-gradient(to bottom, #0000006f, #000000ff);
  min-height: 100vh;
}
</style>
