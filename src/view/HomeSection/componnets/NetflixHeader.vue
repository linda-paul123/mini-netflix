<template>
  <header id="header" class="bg-black-overlay text-white px-3 py-4" :class="[
    { 'fixed-header': $route.name === 'home-section' }, // Apply fixed-header only on home-section
    { visible: showFixedHeader, hidden: !showFixedHeader }
  ]">
    <div class="container-fluid d-flex align-items-center justify-content-between position-relative">

      <router-link :to="{ name: 'home-section' }">
        <div class="left-section d-flex align-items-center">
          <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" alt="Netflix Logo"
            style="height: 35px;" />
        </div>
      </router-link>
 


      <div class="hamburger d-md-none" @click="toggleMenu">
        <i class="fas fa-bars fa-lg"></i>
      </div>
      <nav :class="['nav-links', 'd-flex', 'align-items-center', 'gap-4', { 'show': isMenuOpen }]">
        <a href="/home" class="nav-link" :class="{ active: activeTab === 'home' }" @click="setActive('home')">Home</a>
        <a href="/series" class="nav-link" :class="{ active: activeTab === 'series' }"
          @click="setActive('series')">Series</a>
        <a href="/movies" class="nav-link" :class="{ active: activeTab === 'movies' }"
          @click="setActive('movies')">Movies</a>
        <a href="/popular" class="nav-link" :class="{ active: activeTab === 'popular' }"
          @click="setActive('popular')">Popular</a>
        <a href="/my" class="nav-link" :class="{ active: activeTab === 'my' }" @click="setActive('my')">My
          List</a>
      </nav>

      <div class="right-section d-flex align-items-center">
        <i class="fas fa-search mx-3 fa-lg"></i>
        <i class="fas fa-bell mx-3 fa-lg"></i>
        <i class="fas fa-user mx-3 fa-lg"></i>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      isMenuOpen: false,
      activeTab: '',// default active
      showFixedHeader: true,
    };
  },
  watch: {
    $route() {
      this.syncTabWithRoute(); // trigger sync on route change
    },
    '$route.name'(newRoute) {
      if (newRoute === 'home-section') {
        window.addEventListener('scroll', this.handleScroll);
      } else {
        this.showFixedHeader = false;
        window.removeEventListener('scroll', this.handleScroll);
      }
    },
  },
  mounted() {
    this.syncTabWithRoute(); // sync once on mount
    if (this.$route.name === 'home-section') {
      window.addEventListener('scroll', this.handleScroll);
    }
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    setActive(tab) {
      this.activeTab = tab;
    },
    syncTabWithRoute() {
      const path = this.$route.path;
      if (path.startsWith('/series')) this.activeTab = 'series';
      else if (path.startsWith('/movies')) this.activeTab = 'movies';
      else if (path.startsWith('/popular')) this.activeTab = 'popular';
      else if (path.startsWith('/my')) this.activeTab = 'my';
      else if (path.startsWith('/home')) this.activeTab = 'home';
      else this.activeTab = '';
    },
    handleScroll() {
      const scrollY = window.scrollY;
      if (scrollY >= 0 && scrollY <= 350) {
        this.showFixedHeader = true;
      } else {
        this.showFixedHeader = false;
      }
    },
  }
};
</script>

<style scoped>
.miniflix-logo {
  font-family: 'Montserrat', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-weight: 900;
  font-size: 3rem;
  color: #e50914;
  letter-spacing: 3px;
  text-decoration: none;
  /* Remove underline */
  line-height: 1;
}

.fixed-header {
  position: fixed;
  top: 0;
  z-index: 10;
  width: 100%;
  transition: top 0.3s ease;
}

.hidden {
  top: -100px;
  /* hides the header off-screen */
}

.visible {
  top: 0;
}

a,
router-link {
  text-decoration: none !important;
  /* Remove underline from any link */
  color: inherit;
  /* Prevent default blue */
}

.nav-link {
  text-decoration: none;
  color: white;
  font-weight: 500;
  padding-bottom: 5px;
  position: relative;
}

.nav-link:hover {
  color: #e50914;
}

.nav-link.active {
  color: #e50914;
}

.nav-link.active::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  height: 4px;
  width: 100%;
  background-color: #e50914;
  border-radius: 2px;
}

.hamburger {
  cursor: pointer;
  display: none;
}

@media (max-width: 768px) {
  .nav-links {
    display: none !important;
    flex-direction: column;
    background-color: #111;
    position: absolute;
    top: 70px;
    left: 0;
    width: 100%;
    padding: 1rem;
    z-index: 10;
  }

  .nav-links.show {
    display: flex !important;
  }

  .hamburger {
    display: block;
    color: white;
  }

  .right-section {
    display: none !important;
  }
}
</style>
