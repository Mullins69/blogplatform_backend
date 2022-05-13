<template>
   <div class="landing-section">
    <div class="landing-header">
      <h2>Recents on The Blog...</h2>
    </div>
  </div>
  <div class="container">
    <div class="row">
      <!-- <div class="home_img">
        <img src="https://i.postimg.cc/ZqRfRzwL/blogging01.jpg" alt="">
      </div> -->
        <div class="col-12">
          <!-- <h3>Filter</h3> -->
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
</template>

<script>
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
    };
  },
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
.landing-section {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 50vh;
  margin: 0;
  padding: 0;
  background-image: url("https://i.postimg.cc/ZqRfRzwL/blogging01.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  margin-top: 70px;
  object-fit: cover;
}
.landing-header {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  min-height: 50vh;
  background: rgba(0, 0, 0, 85%);
}
.landing-header h2 {
  font-size: 60px;
  font-weight: 700;
  color: #fff;
}
.landing-header h4 {
  color: #fff;
}
@media only screen and (max-width: 770px) {
  .landing-header {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    flex-wrap: wrap;
    min-height: 50vh;
    background: rgba(0, 0, 0, 80%);
  }
  .landing-header h2 {
    font-size: 40px;
    font-weight: 700;
    color: #fff;
  }
  .landing-header h4 {
    color: #fff;
  }
}
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 70px;
}
.post {
  border: 6px solid white;
  border-radius: 3px;
  padding-bottom: 23px;
  margin: 50px;
  box-shadow: 2px 2px 8px #e4e4e4;
  text-align: left;
 
}

.home_img {
  width: 100%;
  object-fit: cover;
      display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    flex-wrap: wrap;
    min-height: 50vh;
    background: rgba(0,0,0,.8);
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