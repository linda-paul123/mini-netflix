<template>
  <div id="app">
    <NetflixHeader />
    <router-view />
  </div>
</template>


<script>
import { RouterView } from 'vue-router';
import NetflixHeader from './view/HomeSection/componnets/NetflixHeader.vue';


export default {
  name: 'MiniNetflix',
  components: {
    RouterView,
    NetflixHeader
    }
}
</script>

<style lang="scss">
#app {
  font-family: 'Poppins', Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // color: #2c3e50;
  background-color: #28282c;
}
html, body, #app {
  background-color: black;
}
</style>
