<template>
    <div class="container">
        <div class="row" v-if="singleblog">
            <div class="col" v-for="blog of singleblog.post" :key="blog._id">
              <div class="blogpost_title">
                <h1>
                    {{blog.title}}
                </h1>
              </div>
              <div class="blogpost_author">
                <h3>Posted by {{blog.username}}</h3>
              </div>
              <div class="blogpost_image">
                <img :src="blog.img" alt="pic" >
              </div>
              <div class="blogpost_details">
                <p>
                  {{blog.details}}
                </p>
              </div>
            </div>
        </div>
        <div class="row" v-else>
            <Loader/>
        </div>
    </div>
</template>
<script>
import Loader from "../components/Loader.vue";
export default {
    props: ['id'],
    components:{
        Loader
    },
    data() {
    return {
      singleblog: null,
    };
  },
  mounted(){
      fetch("https://blogplatapi.herokuapp.com/posts/" + this.id, {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        this.singleblog = json
      })
      .catch((err) => {
        alert(err);
        console.log(err);
      });
  }
}
</script>
<style scoped>

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 150px;
  row-gap: 1rem;
}


.blogpost_title h1{
  font-family: "Inter";
  font-weight: 700;
  font-size: 30px;
  line-height: 30px;
  color:black;
  
}
  .blogpost_author h3{
    font-family: "Inter";
    font-weight: 500;
    font-size: 13px;
    line-height: 30px;
    color:#6c757d!important;
  }

.blogpost_image img{
  width: 80% !important;
  border: 5px solid white;
  box-shadow: 8px 8px 15px #e4e4e4;
  border-radius:2px;
}


.blogpost_details{
  font-family: "Inter";
  font-weight: 450;
  font-size: 15px;
  line-height: 50px;
  color:black;
}
</style>