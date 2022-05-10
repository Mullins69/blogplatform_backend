<template>
  <Navbar/>
<main>
  <router-view :key="$route.fullPath" :services="services" />
 </main>
  <Footer/>
</template>

<script>
import Navbar from "./components/Navabr.vue";
import Footer from "./components/Footer.vue";
export default {
  components: {
    Navbar,
    Footer,
  },
};
</script>


<style>

#app {
font-family: 'Inter', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #000000;
  /* background:#f7fcfd; */
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
