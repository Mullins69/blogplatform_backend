
<template>
  <nav>
    <div class="nav-icon">
       <router-link class="navbar-brand"  @click="toggleNav"  to="/">
      <h2>The <span style="color:red">B</span>log.</h2>
       </router-link>
    </div>
    <div class="nav-items">
      
        <router-link   @click="toggleNav"   to="/">Home</router-link>
        <router-link   @click="toggleNav"  v-if="currentUser"  to="Profile">Profile</router-link>
      
      
        <router-link  @click="toggleNav" v-if="!currentUser" to="SignUp">Sign Up</router-link>
      
      
        <router-link  @click="toggleNav" v-if="!currentUser" to="SignIn">Sign In</router-link>
         <button class="btn" v-if="currentUser" @click="logOut">Logout</button>
      
    </div>
    <div class="mobile-nav">
      <button class="menu">
        <div class="bar"></div>
      </button>
    </div>
    <div class="mobile-nav-items">
      
        <router-link to="/" class="mobile">Home</router-link>
    
    
        <router-link @click="toggleNav" v-if="!currentUser" to="SignUp" class="mobile"
          >Sign Up</router-link
        >
  
      
        <router-link @click="toggleNav" v-if="!currentUser" to="SignIn" class="mobile"
          >Sign In</router-link
        >
      
      
        <router-link @click="toggleNav" v-if="currentUser" to="Profile" class="mobile"
          >Profile</router-link
        >
    
      <button class="btn" v-if="currentUser" @click="logOut">Logout</button>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
      data(){
        return {
            isActive: false,
            showAdmin: false
        };
    },
    methods:{
        toggleNav() {
            this.isActive = !this.isActive;
        },
        logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/SignIn');
    }
    },
    computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
   
  },
  // created() {
  //     if(this.currentUser){
  //         if(this.currentUser.role == 'admin'){
  //             this.showAdmin = true;
  //         }else{
  //             this.showAdmin = false;
  //         }
  //     }
  // }
};
</script>

<style scoped>
.btn {
  font-weight: 700;
    text-decoration: none;
    color: black;
}
nav {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  min-height: 50px;
  background-color: transparent;
  position: fixed;
  top: 0;
  z-index: 2;
}
  
nav a.router-link-exact-active {
  color: red;
}
.nav-icon {
  /* width: 50%; */
  display: flex;
  justify-content:flex-start;
  align-items: center;
  flex-direction: row;
  gap: 1.5rem;
  /* margin-left: 1.5rem; */
  font-family: 'Inter';
  font-style: italic;
  font-weight: 800;
  font-size: 96px;
  line-height: 116px;
  color: #000000;
  margin-top: 20px;
}
 h2,
.nav-items a {
  /* font-size: 15px; */
  font-weight: 700;
  text-decoration: none;
  color: black;
}
.nav-items {
  width: 50%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-direction: row;
  gap: 1.5rem;
  margin-right: 1.5rem;
}
.menu,
.mobile-nav-items {
  display: none;
}
@media screen and (max-width: 600px) {
  nav {
    min-height: 35px;
  }
  .nav-items {
    display: none;
  }
  /* .nav-icon {
    display: none;
  } */
  .mobile-nav {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex-direction: row;
    gap: 1.5rem;
    margin-right: 0.5rem;
  }
  .menu {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 25px;
    cursor: pointer;
    outline: none;
    appearance: none;
    background: none;
    border: none;
    z-index: 4;
    padding: 0;
    gap: 5px;
  }
  .mobile-nav-items {
    position: fixed;
    top: 0;
    right: -100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 1rem;
    width: 50%;
    height: 100%;
   background-color: rgba(0, 0, 0, 0.95);
    z-index: 3;
    transition: all 0.5s;
    box-shadow: 0px 0px 150px rgba(0, 0, 0, 0.2);
   
    
  }
  .mobile-nav-items a {
    text-decoration: none;
    font-size: 15px;
    font-weight: 700;
    color:white;
    width: 80%;
    text-align: center;
  }
  .mobile-nav-items.active {
    right: 0;
  }

  .menu .bar,
  .menu:before,
  .menu:after {
    content: "";
    display: block;
    width: 100%;
    height: 3px;
    background-color: black;
    transition: all 0.5s;
  }
  .menu.active:before {
    transform: rotate(45deg) translate(5.5px, 6px);
        background-color: white;
  }
  .menu.active:after {
    transform: rotate(-45deg) translate(5.5px, -6px);
        background-color: white;
  }
  .menu.active .bar {
    transform: translate(-25px, 0px);
    opacity: 0;
  }
}
</style>
