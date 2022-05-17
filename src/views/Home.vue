<template>
  <div class="landing-section">
    <header class="landing-header">
      <h2>Recent on The Blog...</h2>
    </header>
  </div>
  <div class="container">
          <router-link to="SignIn"    v-if="currentUser" class="SIgnUp_toAdd">Sign Up To Add A Blog</router-link>

  
      <div class="col_addPost">
        <!-- Button trigger modal -->
        <select v-model="selected" class="form-select" aria-label="Default select example">
          <option selected value="">Display All</option>
          <option value="sport">Sport</option>
          <option value="food">Food</option>
          <option value="politics">Reality</option>
        </select>
      </div>
      <button type="button" class="btn btn-mod btn-border btn-large" data-bs-toggle="modal" data-bs-target="#exampleModal" v-if="loggedIn == true"> Add a Blog</button>
    
    <div class="col" v-if="blogs">
        <div class="post" v-for="blog of filterBlogs.slice().reverse()" :key="blog._id">
          <div class="blog_post" v-for="data of blog.post" :key="data._id">
            <div class="post_image">
              <img :src="data.img" alt="PIC DIDNT LOAD" />
            </div>  
            <div class="post_title">
              <h2>
                {{ data.title }}
              </h2>
            </div>
          </div>
          <router-link class="readmore" :to="{ name: 'readmore', params: { id: blog._id } }" >Read More ... </router-link >
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
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h6 class="modal-title" id="exampleModalLabel">Add a Post</h6>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <form class="container" @submit.prevent="addPost">
          <div class="modal-body">
            <label for="title" class="heading_inputs">Title <span class="required">*</span> </label>
            <input type="text" v-model="title"  class="modal_postTitle" required />
            <label for="Catergory" class="heading_inputs">Catergory <span class="required">*</span></label>
            <select v-model="category" class="form-select" aria-label="Default select example" required>
              <option class="category_opt" selected value="food">Food</option>
              <option class="category_opt" value="sport">Sport</option>
              <option class="category_opt" value="politics">Reality</option>
            </select>
            <label for="Image" class="heading_inputs">Image <span class="required">*</span></label>
           <span class="hover_info">
              <i class="fas fa-info-circle"></i> 
              <span class="para_info">
                Search for an image, right-click, and click "Copy image address" and paste in input.
              </span>
           </span>
            <input type="text" placeholder="Image Link" v-model="img" required class="modal_postImg" />
            <label for="Content" class="heading_inputs">Content <span class="required">*</span></label>
            <textarea type="text"  v-model="details" class="modal_postDetails" require  />
          </div>
          <div class="modal-footer">
            <button type="button" class="btn_closeModal" data-bs-dismiss="modal">
              Close
            </button>
            <button type="submit" class="btn_saveChanges ">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  </div>
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
      loggedIn: this.$store.state.auth.status.loggedIn,
      title: "",
      img: "",
      details: "",
      category: "",
    };
  },
  methods: {
    addPost() {
      fetch("https://blogplatapi.herokuapp.com/posts", {
        method: "POST",
        body: JSON.stringify({
          title: this.title,
          img: this.img,
          details: this.details,
          category: this.category,
        }),

        headers: {
          "Content-type": "application/json; charset=UTF-8",

          Authorization: `Bearer ${JSON.parse(localStorage.getItem("user"))}`,
        },
      })
        .then((response) => response.json())
        .then((json) => {
          alert("Post added");
          this.$router.go();
        })
        .catch((err) => {
          alert(err);
        });
    },
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
  },
  computed: {
    filterBlogs: function () {
      let filtered = this.blogs;
      if (this.selected == "") {
        filtered = filtered.filter((blogs) => {
          return blogs.category.match(this.selected);
        });
        // if(this.search){
        //   filtered = filtered.filter((blogs) =>{
        //     return blogs.title.match(this.search)
        //   })
        // }
        return filtered;
      }
      if (this.selected) {
        filtered = filtered.filter((blogs) => {
          return blogs.category.match(this.selected);
        });
        // if(this.search){
        //   filtered = filtered.filter((blogs) =>{
        //     return blogs.title.match(this.search)
        //   })
        // }
        return filtered;
      }
    },
  },
  created() {
      if(this.currentUser){
          if(this.currentUser.role == 'admin'){
              this.showAdmin = true;
          }else{
              this.showAdmin = false;
          }
      }
  }
};
</script>

<style scoped>
.hover_info .para_info {
  visibility: hidden;
  /* width: 120px; */
  background-color:#e4e4e4;
  color:black;
  text-align: center;
  padding: 5px 0;
  border-radius: 6px;
  position: absolute;
  z-index: 1;
  font-size: 12px;
  
}


.hover_info:hover .para_info {
  visibility: visible;
}
.hover_info img{
  width: 15px;
  height: 15px;
  object-fit: cover;
  position: relative;
  left:165px;
}
.heading_inputs{
  font-family: "Inter";
  font-weight: 550 !important;
  font-size: 14px !important;
  line-height: 20px !important;
  color: #6c757d !important;
}
.required{
  color: red
}

.category_opt{
  font-weight: 450;
  font-size: 14px;
  text-align: center;
}
.btn_closeModal{
  color: white;
  background-color:red;
  border:none;
  border-radius:3px;
  padding:8px 10px;
  font-weight: 600;
}
.btn_saveChanges{
  color: white;
  background-color:black;
  border:none;
  border-radius:3px;
  padding:8px 10px;
  font-weight: 600;
}
.btn_closeModal:hover{
  color: red;
  background-color:white;
  border-radius:3px;
  transition: 0.5s
}
.btn_saveChanges:hover{
  color: black;
  background-color:white;
  border-radius:3px;
  transition: 0.5s 
}
.form-select{
  margin-top: 5px;
    border-radius:3px;
  border:2px solid !important ;
}

.modal_postImg::placeholder{
  font-family: "Inter";
  font-weight: 450 !important;
  font-size: 14px !important;
  line-height: 20px !important;
  padding-bottom: 20px;
  color: black !important;
}

.modal_postDetails{
  display: block;
  height: 40px;
  padding: 10px ;
  font-size: 15px;
  font-weight: 400;
  border-radius:3px;
  border:2px solid !important ;
  color: #333;
  background-color: #fff;
  background-image: none;
  border: solid 1px black;
  margin-top: 5px;
  width:230px;
  height:100px
}
.modal_postImg{
  display: block;
  height: 40px;
  padding: 10px ;
  font-size: 15px;
  font-weight: 400;
  border-radius:3px;
  border:2px solid !important ;
  color: #333;
  background-color: #fff;
  background-image: none;
  border: solid 1px black;
    margin-top: 5px;
}
.modal_postTitle{
  display: block;
  height: 40px;
  padding: 10px ;
  font-size: 15px;
  font-weight: 400;
  border-radius:3px;
  border:2px solid !important ;
  color: #333;
  background-color: #fff;
  background-image: none;
  border: solid 1px black;
    margin-top: 5px;
}
.modal-content{
  margin-left:auto ;
  margin-right:auto ;
  width: auto;
}
 .modal-dialog{
   display: flex;
   justify-content: center;
    width: 50vh;
   text-align: left;
   margin-top: 200px;
   margin-left: auto;
   margin-right: auto;
 }
.modal-body{
  margin-top: -100px;
}

.SIgnUp_toAdd{
  text-decoration: none;
    font-family: "Inter";
  font-weight: 600 !important;
  font-size: 17px !important;
  line-height: 20px !important;
  padding-bottom: 20px;
  color: #6c757d !important;
}
.SIgnUp_toAdd:hover{
  color: black !important;
}
.col_addPost{
  padding-bottom: 25px;
}

.btn-mod.btn-large {
    height: auto;
    padding: 13px 52px;
    font-size: 15px;
    border-radius:3px;
}

.btn-mod.btn-border {
    color: white;
    border: 1px solid black;
    background: black;
}

.btn-mod, a.btn-mod {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    padding: 4px 13px;
    color: #fff;
    background: rgba(34,34,34, .9);
    border: 1px solid transparent;
    font-size: 11px;
    font-weight: 400;
    text-transform: uppercase;
    text-decoration: none;
    letter-spacing: 2px;
    -webkit-border-radius: 0;
    -moz-border-radius: 0;
    border-radius: 0;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;
    -webkit-transition: all 0.2s cubic-bezier(0.000, 0.000, 0.580, 1.000);
    -moz-transition: all 0.2s cubic-bezier(0.000, 0.000, 0.580, 1.000);
    -o-transition: all 0.2s cubic-bezier(0.000, 0.000, 0.580, 1.000);
    -ms-transition: all 0.2s cubic-bezier(0.000, 0.000, 0.580, 1.000);
    transition: all 0.2s cubic-bezier(0.000, 0.000, 0.580, 1.000);
}

.btn-mod.btn-border:hover, .btn-mod.btn-border:active, .btn-mod.btn-border:focus, .btn-mod.btn-border:active:focus {
   color: black;
    border-color:white ;
    background-color:white;
    outline: none;
}

.landing-section {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  /* min-height: 50vh; */
  margin: 0;
  padding: 0;
  background-image: url("https://i.postimg.cc/kgC9fXt2/digital-art-simple-background-minimalism-lightbulb-typography-Think-logo-light-lighting-hand-darknes.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  /* margin-top: 70px; */
}
.landing-header {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  min-height: 60vh;
  background: rgba(0, 0, 0, 35%);
}
.landing-header h2 {
  font-size: 60px;
  font-weight: 700;
  color: #fff;
  padding-top: 70px;
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
  justify-content: center !important;
  align-items: center;
  flex-direction: column;
  margin-top: 100px;
}
.post {
  border: 6px solid white;
  border-radius: 3px;
  padding-bottom: 23px;
  margin: 50px;
  box-shadow: 2px 2px 8px #e4e4e4;
  text-align: left;
  width: 70%;
  margin-left: auto;
  margin-right: auto;
}

.post_image img {
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
  color: #6c757d !important;
}

.readmore {
  text-decoration: none;
  border-bottom: 3px solid #000;
  font-family: "Inter";
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: #000000;
}

.readmore:hover {
  color: red;
  border-bottom: 3px solid red;
}


</style>