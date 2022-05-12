<template>
  <div class="container">

  </div>
  <Contact/>
</template>

<script>
import Contact from "@/components/Contact.vue";
export default {
    name: "HomeView",
  components: {
    Contact,
}
}
</script>

<style scoped>

.container {
  display: flex;
  justify-content: center;
  margin-top: 150px;
}
</style>