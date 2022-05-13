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
            <div>edit</div>
            <div>delete</div>
          </div>
        </div>
      </div>
    <!-- <TD ALIGN="center"></TD> -->
    </td> 
    </tr>
  </tbody>
</table>
  </div>



</template>

<script>
import axios from "axios";
export default {
   data(){
            return {
           
                users:[],
              
                
            }
        },
        mounted(){
            fetch("https://blogplatapi.herokuapp.com/users")
            .then(res => res.json())
            .then(data => this.users= data)
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

/* a {
  text-decoration: none;
  color: white;
}

a div {
  padding: 2px;
}
  */
.dropdown {
  position: absolute;
  right: 20px;
  background-color: grey;
  
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