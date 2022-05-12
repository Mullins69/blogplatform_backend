<template>
  <div class="container">
    <div class="row" v-if="blogs">
    <div  v-for="blog of blogs" :key="blog._id">
  <div class="col-3" v-for="data of blog.post" :key="data._id">
      <h3>
      {{data.title}}
      </h3>

      <p>
        {{data.details}}
      </p>
      <img :src="data.img" alt="PIC DIDNT LOAD" >
      </div>

    </div>
      
    </div>
    <div class="row" v-else>
      <h1>
        Loading blogs...
      </h1>
    </div>
  </div>
  <Contact/>
</template>

<script>
import Contact from "@/components/Contact.vue";
export default {
    name: "HomeView",
  components: {
    Contact,
},
data(){
  return{
    blogs: null
  }
}
,
mounted() {
    fetch("https://blogplatapi.herokuapp.com/posts", {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
       
           this.blogs = json
     
       
      })
      .catch((err) => {
        alert(err);
        console.log(err);
      });
  },
}
</script>

<style scoped>

.container {
  display: flex;
  justify-content: center;
  margin-top: 150px;
}
</style>