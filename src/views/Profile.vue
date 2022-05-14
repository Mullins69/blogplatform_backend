<template>
 
  <div class="container">
  <h1 class="jumbotron">PROFILE</h1>

    
   
    <div class="row p-5">
      <div class="col">
         <img src="https://i.postimg.cc/q7zMKRBh/blank-profile-picture-973460-640.png" alt="">
      <div class="picInfo">
      <h6>{{ fullname }}</h6>
    </div>
     <div  class="picInfo">
      <h6>{{ email}}</h6>
    </div>
     <div class="buttons p-5">
          <button class="btn" id="edit" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@getbootstrap">EDIT</button>
          <button class="btn" id="delete"  @click="deleteUser" >DELETE</button>
     </div>
    </div>
    <div class="col">
      <div class="about-profile">   
        <ul class="admin-profile">

          <li><span class="pro-title"> EMAIL </span> <span class="pro-detail">{{ email}}</span></li>
          <li><span class="pro-title"> NAME </span> <span class="pro-detail">{{ fullname }}</span></li>
          <li><span class="pro-title"> ROLE </span> <span class="pro-detail">{{ role }}</span></li>
        </ul>
    
        
      </div>
   
    </div>

      <!-- <h1>MY BOOKINGS</h1> -->
    </div>
  
 
    <!-- edit modal -->
  </div>
<Footer/>
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" v-if="!currentUser">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel" style="color:#b18044;">Edit your Profile</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form >
          <div class="mb-3">
            <label for="recipient-name" class="col-form-label">Name:</label>
            <input type="text" class="form-control" id="recipient-name"  v-model="fullname">
          </div>
          <div class="mb-3">
            <label for="message-text" class="col-form-label">Email:</label>
            <input type="text" class="form-control" id="recipient-name"  v-model="email">
          </div>
          <div class="mb-3">
            <label for="message-text" class="col-form-label">Role:</label>
            <input type="text" class="form-control" id="recipient-name"  v-model="role">
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn" data-bs-dismiss="modal">CLOSE</button>
        <button type="button" class="btn" @click="updateUser" >SAVE</button>
      </div>
    </div>
  </div>
</div>


</template>
<script>
import Footer from "@/components/Footer.vue";
const url = "https://blogplatapi.herokuapp.com/users";
import authHeader from "../services/auth-header";
const API_URL = "https://blogplatapi.herokuapp.com/users/oneuser";
import axios from "axios";
export default {
  
  name: "Profile",
    components: {
        Footer,

  },
    data() {
    return {
      // updatedUser:{
      // email:"",
      // fullname:"",
      // role:"",
      // },
      email:"",
      fullname:"",
      role:"",
      password:""
    }
  },
  computed: {
    currentUser() {
      axios.get(API_URL,{headers: authHeader()})
      .then(res => {
        this.email = res.data.email
        this.role = res.data.role
        this.fullname = res.data.fullname
        // this.password = res.data.password
      })
      .catch(err => {
        console.error(err); 
      })
            // return this.$store.state.auth.user;

    },
  },
  mounted() {
    // if (!this.currentUser) {
    //   this.$router.push("/Login");
    // }
  },

  methods: {
    async updateUser() {
       try {
      fetch(`${url}`,{
        method: "PUT",
        body: JSON.stringify({
           email: this.email,
           fullname: this.fullname,
           role: this.role,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("user"))
          }`,
        },
      })
      .then((res) => res.json())
      .then(() => {
        alert("Your profile has been updated!");
        // this.$store.dispatch("auth/logout");
        this.$router.push("/Profile")
      });
    } catch (err) {
      console.error(err)
      }
    },
    async deleteUser(){
      const headers = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("user"))
          }`,
          },
      };
      const new_url = url;
       if (confirm("Do you really want to delete your profile?")){
          try {
        await axios.delete(new_url, headers).then(() => {
          alert("Profile has been deleted successfully");
          this.$store.dispatch("auth/logout");
          this.$router.push("/Profile")
        });
      } catch(err) {
        console.error(err);
      }
       }
     
    },
   
  },
};
</script>

<style scoped>
.jumbotron {
  font-family: 'Inter';
  font-style: italic;
  font-weight: 500;
  font-size: 40px;
  line-height: 77px;

  color: #000000;
}
/* .buttons{
  display: flex;
  padding-top: 20px;
} */
.container {
    /* display:;
    justify-content:center; */
    text-align: center;
    padding-top: 100px;
   
}
.picInfo{
  padding-top:5px;
}
.name{
  color: #b68345;
  padding-right: 10px;
  font-size:20px;
}
.admin-profile{
    display: grid;
    justify-content: center;
    flex-wrap: wrap;
    text-align: center;
  }
.about-profile{
  padding-top: 10px;
 display:flex;
 justify-content: center;
 text-align: center;
}
.about-profile li{
    display: flex;
    /* justify-content:space-around; */
    width:300px;
    padding-top: 20px;
    text-align: center;
}
.about-profile .pro-title {
    font-weight: 700;
    background: transparent;
    position: relative;
    width: 120px;
    display: inline-block;
    margin-bottom: 5px;
    text-align: center;
 
    
}


.about-profile .pro-title:after {
    position: absolute;
    content: ':';
    color: #b68345;
    font-size: 14px;
    left: 100px;
   text-align: center;
}

ul li, ol li {
    list-style: none;
    text-align: center;
}
.jumbotron{
  display: flex;
  justify-content:center;
}
h6{ 
  padding-right: 10px;
}
/* .jumbotron{
   padding-top:100px;
} */
img{
  border-radius: 50%;
  width: 250px;
  height: 250px;
  /* border: 4px solid #b68345; */
}

.border{
    border-top: 1px solid;
    width: 100px;
    display:inline-flex;
    justify-content: center;
}
/* 
@media only screen and (max-width: 500px) {
  .about-profile{
   padding-top: 50px;
   padding-left: 350px;
   padding-right: 100px;
  }
  .buttons{
     padding-left: 100px;
  }
  img{
    width: 150px;
    height: 0px;
  }
} */

img{
  border: 6px solid white;
    box-shadow: 2px 2px 8px #e4e4e4;

}
</style>