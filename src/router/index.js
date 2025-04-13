import MovieDetails from '@/view/HomeSection/componnets/MovieDetails.vue';
import HomeSection from '@/view/HomeSection/HomeSection.vue';
import ListLayout from '@/view/Layouts/ListLayout.vue';
import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home-section',
      component: HomeSection,
    },
    {
      path: '/home',
      name: 'home-section',
      component: HomeSection,
    },
    {
      path: '/series',
      name: 'series-section',
      component: ListLayout,
    },
    {
      path: '/movies',
      name: 'movies-section',
      component: ListLayout,
    },
    {
      path: '/popular',
      name: 'popular-section',
      component: ListLayout,
    },
    {
      path: '/my',
      name: 'my-section',
      component: ListLayout,
    },
    {
      path: '/movie-details/:id',
      name: 'movie-details',
      component: MovieDetails,
    }
    
    
  ],
});
