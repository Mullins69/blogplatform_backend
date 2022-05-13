<template>
  <div class="container">
  <h1 class="head">Dashboard</h1>
    <div class="row">
      <div class="col">
      <div class="user_info">
        <h1 class="user_details">User Details</h1>
      </div>
      </div>
    </div>
    <table class="table">
  <thead>
    <tr >
      <th scope="col">Username</th>
      <th scope="col">Email</th>
      <th scope="col">Role</th>
      <th scope="col">More</th>

    </tr>
  </thead>
  <tbody>
    <tr  v-for="user in users" :key="user._id">
      <td>{{ user.fullname}}</td>
      <td>{{ user.email}}</td>
      <td>{{ user.role}}</td>
        <td class = "select">
   <div class="menu-nav">
        <div class="dropdown-container" tabindex="-1">
          <div class="three-dots"></div>
          <div class="dropdown">
           <button class="btn btn-danger" id="edit" data-bs-toggle="modal" data-bs-target="#editModal" data-bs-whatever="@getbootstrap">Edit</button>
           <button class="btn btn-dark" id="delete"  @click="deleteUser" >Delete</button>
          </div>
        </div>
      </div>
    <!-- <TD ALIGN="center"></TD> -->
    </td> 
    </tr>
  </tbody>
</table>
  </div>
  <Footer/>


<!-- edit user -->
 <div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" v-if="currentUser">
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

const url = "https://blogplatapi.herokuapp.com/users";
// import authHeader from "../services/auth-header";
const API_URL = "https://blogplatapi.herokuapp.com/users/oneuser";
import Footer from "@/components/Footer.vue";
import axios from "axios";
export default {
  components: {
    // Footer
  },
   data(){
          return {
             users:[],  
              email:"",
              fullname:"",
              role:"",
              password:""
          }
        },
        mounted(){
            fetch(`${url}`)
            .then(res => res.json())
            .then(data => this.users = data)
            .catch(err => console.log(err.message))

            // fetch("")
            // .then(res => res.json())
            // .then(data => this.barbers = data)
            // .catch(err => console.log(err.message))

        },
      computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
   
  },
  methods: {
    async updateUser() {
       try {
      fetch(`${url}`,{
        method: "PUT",
        body: JSON.stringify({
           email: this.email,
           fullname: this.fullname,
           password: this.password,
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

}
</script>

<style scoped>
 .container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
   padding-top: 100px;
  /* flex-wrap: wrap; */
}

.menu-nav {
  
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}

.three-dots:after {
  cursor: pointer;
  content: '\2807';
  font-size: 20px;
  padding: 0 20px;

}

#edit{
  padding-top: 10px;
  padding-bottom: 10px;
  width: 100px;
  font-weight: 600;
}
#delete{
  padding-top: 10px;
  padding-bottom: 10px;
  width: 100px;
  font-weight: 600;
 
}
#edit:hover{
   color: red  
}
#delete:hover{
  color: red  
}



.dropdown {
  position: absolute;
  right: 20px;
  background-color: #e4e4e4;
  outline: none;
  opacity: 0;
  z-index: -1;
  max-height: 0;
  /* transition: opacity 0.1s, z-index 0.1s, max-height: 5s; */
}

.dropdown-container:focus {
  outline: none;
}

.dropdown-container:focus .dropdown {
  opacity: 1;
  z-index: 100;
  max-height: 100vh;
  transition: opacity 0.2s,
    /* z-index 0.2s, max-height: 0.2s; */
}

.user_details{
  font-family: 'Inter';
  font-weight: 500;
  font-size: 25px;
  line-height: 70px;
  color: #000000;
}

.head{
  font-family: 'Inter';
  font-weight: 600;
  font-size: 30px;
  line-height: 50px;
  color: #000000; 
}

th{
 font-family: 'Inter';
  font-weight: 450;
  font-size: 15px;
  line-height: 15px;
  color:red;  
}

td{
  font-family: 'Inter';
  font-weight: 450;
  font-size: 13px;
  line-height: 15px;
  color:#2b2f32;  
}

</style>