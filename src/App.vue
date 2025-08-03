<template>
  <div id="app" class="min-h-screen bg-cinema-dark">
    <NavBar />
    <div class="flex">
      <SideBar />
      <main class="flex-1 ml-64 pt-16">
        <router-view />
      </main>
    </div>
    <Footer />
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue';
import SideBar from './components/SideBar.vue';
import Footer from './components/Footer.vue';

export default {
  name: 'App',
  components: {
    NavBar,
    SideBar,
    Footer,
  },
};
</script>