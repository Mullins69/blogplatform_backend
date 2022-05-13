<template>
  <div class="container">
    <div class="row">
        <div class="col-12">
           <!-- Button trigger modal -->


          <h3>Filter</h3>
          <select
            v-model="selected"
            class="form-select"
            aria-label="Default select example"
          >

            <option selected value="">Display All</option>
            <option value="sport">Sport</option>
            <option value="food">Food</option>
            <option value="politics">Politics</option>
          </select>
        </div>
      </div>
    <div class="row" v-if="blogs">
    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" v-if="loggedIn == true">
      Add Post
</button>
      <div class="col">
        <div class="post" v-for="blog of filterBlogs" :key="blog._id">
          <div class="blog_post" v-for="data of blog.post" :key="data._id">
            <div class="post_iamge">
              <img :src="data.img" alt="PIC DIDNT LOAD" />
            </div>
            <div class="post_title">
              <h2>
                {{ data.title }}
              </h2>
            </div>
            <!-- <div class="post_details">
              <p>
                {{ data.details }}
              </p>
            </div> -->
          </div>
          <router-link class="readmore" :to="{ name: 'readmore', params: { id: blog._id } }" >Read More ...</router-link>
        </div>
      </div>
    </div>

    <div class="row" v-else>
      <h1>
        <Loader />
      </h1>
    </div>
  </div>
  <Contact />
 
<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Add Post</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div><form
    class="container"
    @submit.prevent="addPost"
  >
      <div class="modal-body">
          <input type="text" v-model="title" placeholder="title" required >
         <select
            v-model="category"
            class="form-select"
            aria-label="Default select example"
            required
          >

            <option selected value="food">Food</option>
            <option value="sport">Sport</option>
            <option value="politics">Politics</option>
          </select>
           <input type="text" placeholder="img link" v-model="img" required>
            <input type="text" placeholder="details" v-model="details" required>
      </div>
     
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="submit" class="btn btn-primary">Save changes</button>
      </div>
       </form>
    </div>
  </div>
</div>
</template>

<script>
import authHeader from "../services/auth-header";

import Loader from "../components/Loader.vue";
import Contact from "@/components/Contact.vue";
export default {
  name: "HomeView",
  components: {
    Contact,
    Loader,
  },
  data() {
    return {
      blogs: null,
      selected: "",
      loggedIn:  this.$store.state.auth.status.loggedIn,
      title: "",
      img:"",
      details:"",
      category:""
    };
  },
  methods:{
    addPost(){
        fetch("https://blogplatapi.herokuapp.com/posts", {
        method: "POST",
        body: JSON.stringify({
          title: this.title,
          img:this.img,
          details:this.details,
          category:this.category
        }),
        headers: authHeader(),
      })
        .then((response) => response.json())
        .then((json) => {
          alert("Post added");
          this.$router.go();
        })
        .catch((err) => {
          alert(err);
        });
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
        this.blogs = json;
      })
      .catch((err) => {
        alert(err);
        console.log(err);
      });
  },computed: {
    filterBlogs: function () {
      let filtered = this.blogs
      if (this.selected == '') {
          filtered = filtered.filter((blogs) => {
           return blogs.category.match(this.selected) ;
          
        });
        // if(this.search){
        //   filtered = filtered.filter((blogs) =>{
        //     return blogs.title.match(this.search)
        //   })
        // }
        return filtered
      }
      if (this.selected) {
        filtered = filtered.filter((blogs) => {
           return blogs.category.match(this.selected) ;
          
        });
        // if(this.search){
        //   filtered = filtered.filter((blogs) =>{
        //     return blogs.title.match(this.search)
        //   })
        // }
        return filtered
        
      }
  
      
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 150px;
}
.post {
  border: 6px solid white;
  border-radius: 3px;
  padding-bottom: 23px;
  margin: 50px;
  box-shadow: 2px 2px 8px #e4e4e4;
  text-align: left;
 
}

img {
  width: 100%;
  object-fit: cover;
}

.post_title h2 {
  font-family: "Inter";
  font-weight: 550;
  font-size: 35px;
  line-height: 60px;
  color: #000000;
}

.post_details p {
  font-family: "Inter";
  font-weight: 500;
  font-size: 15px;
  line-height: 30px;
  color:#6c757d!important;
}

.readmore{
  text-decoration: none;
  border-bottom: 3px solid #000;
  font-family: "Inter";
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: #000000;
}

.readmore:hover{
  color: red;
  border-bottom: 3px solid red;
}


</style>