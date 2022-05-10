<template>
    <div id="card">
    <div id="card-content">
      <div id="card-title">
        <h1 class="signin">Login</h1>
        </div>
      <Form @submit="handleLogin" :validation-schema="schema">
 
        <div class="form-group">
                    <label class="form-label" id="nameLabel" for="name"> Email Address:</label>
                    <!-- <Field type="text" class="form-control" id="name" name="customername"  tabindex="1" /> -->
                    <Field name="email" type="text" class="form-control" placeholder=" Enter Email Address" />
                    <ErrorMessage name="email" class="error-feedback" />
                    
                </div>
                <div class="form-group">
                    <label class="form-label" id="subjectLabel" for="sublect">Password:</label>
                    <!-- <Field type="text" class="form-control" id="subject" name="password"  tabindex="3"/> -->
                    <Field name="password" type="password" class="form-control" placeholder=" Enter Password" />
                    <ErrorMessage name="password" class="error-feedback"/>
                </div>
                <div class="form-group">
                <div class=" b text-center margin-top-25">
                    <button class="btn btn-mod btn-border btn-large" :disabled="loading">
                      <span class="log" v-show="!loading">LOGIN</span>
                      <span v-show="loading"><Loader/></span>

                    </button>
                </div>
              
                </div>
                <div class="form-group">
            <div v-if="message" class="alert alert-danger" role="alert">
                {{message}}
            </div>
            
        </div>
        <div class="signUp">
             <h6><router-link :to="{ name: 'SignUp'}">Create Account</router-link></h6>
        </div>
      </Form>
    </div>
  </div>
 
</template>

<script>
import Loader from "../components/Loader.vue"
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

export default {
  name: "Login",
  components: {
    Form,
    Field,
    ErrorMessage,
    Loader,
  },
  data() {
    const schema = yup.object().shape({
    email: yup.string().required("username is required"),
    password: yup.string().required("Password is required")
    });
    return {
      loading: false,
      message: "",
      schema,
    
     
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
   created() {
    if (this.loggedIn) {
      this.$router.push("/Profile");
    }
  },
  methods: {
    handleLogin(user) {
      this.loading = true;
      this.$store.dispatch("auth/login", user).then(
        (data) => {
          if(data.role === 'admin'){
              this.loading = false;
              this.$router.push("/AdminDashBoard");
          }
          else{
            this.loading = false;
            this.$router.push("/Profile");
          }
          
        },
        (error) => {
          this.loading = false;
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
        }
      );
    },
  },
};
</script>

<style scoped>
.signin{
    font-family: 'Inter';
font-style: italic;
font-weight: 500;
font-size: 40px;
line-height: 77px;

color: #000000;
}
#card{
    display:flex;
    justify-content:center;
    
}
    a {
  text-decoration: none;
    color: rgba(0, 0, 0, 0.5) !important;
  
}
.signUp{
    padding-top: 30px;
    font-family: 'Inter';
font-style: italic;
font-weight: 300;
font-size: 36px;
line-height: 44px;
/* identical to box height */

text-decoration-line: none;


}


.log{
  background: transparent;
}
#card {

  height: 460px;
  margin: 6rem auto 8.1rem auto;
  width: 330px;
}
#card-content {
  padding: 12px ;
}
#card-title {

  padding-bottom: 23px;
  padding-top: 13px;
  text-align: center;
}
#submit-btn {
  
  border: none;
 
  cursor: pointer;
  
  
  height: 42.3px;
  margin: 0 auto;
  margin-top: 50px;
  transition: 0.25s;
  width: 100%;
}
#submit-btn:hover {
  box-shadow: 0px 1px 18px #1e90ff;
}
.form {
  align-items: left;
  display: flex;
  flex-direction: column;
}
.form-border {
  background:#1e90ff;
  height: 1px;
  width: 100%;
}
.form-content {

  border: none;
  outline: none;
  padding-top: 14px;
}


.form-label{

width: 333px;
height: 44px;

font-family: 'Inter';
font-style: italic;
font-weight: 800;
font-size: 20px;
line-height: 44px;
/* identical to box height */


color: #000000;
}


textarea#message.form-control {
    height: 120px;
}
h1.headin{
    padding-top:110px;
}
:required:hover{
  background-color:none;
}

*{
  scroll-behavior: smooth;
}
.containe {
  display:flex;
  padding: none;
  margin-bottom:50px;
}
/* contact */
#success-message {
  opacity: 0;
}

.col-xs-12.col-sm-12.col-md-12.col-lg-12 {
  padding: 0 20% 0 20%;
}

.margin-top-25 {
  margin-top: 25px;
}

.form-title {
  padding: 25px;
  font-size: 30px;
  font-weight: 300;
  /* font-family: "Helvetica Neue",Helvetica,Arial,sans-serif; */
}

.form-group .form-control {
   display: block;
 
    width: 100%;
    height: 48px;
    padding: 10px 24px;
    font-size: 15px;
    font-weight: 400;
 
    line-height: 1.6;
    color: #333;
    background-color: #fff;
    background-image: none;
    border: solid 1px black;
    

}


.form-group .form-control:hover {
	border: solid 1px#b68345;
}


.btn-mod.btn-large {
    height: auto;
    padding: 13px 52px;
    font-size: 15px;
    border-radius: 60px;
    
}

.btn-mod.btn-border {
     color: black;
    border: 1px solid #F50808;
    background: #F50808;
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
   color: white;
    border-color:white ;
    
    outline: none;
}

@media only screen and (max-width: 500px) {
    .btn-mod.btn-large {
       padding: 11px 15px;
       font-size: 14px;
    }
  
    .form-title {
        font-size: 20px;
  }
  .containe{
    padding: 80px;
  }
}
/* .call{
  margin-left: 35%;
} */

.b{
  display:flex;
  justify-content: space-around;
  
  
}

.btn{
    
    padding: 25px 43px;
    /* border-radius: 30px; */

    


}


.border{
    border-top: 1px solid;
    width: 100px;
    display:inline-flex;
    justify-content: center;
}

@media only screen and (max-width: 494px) {
    h1.headin{
    padding-top:50px;
}
}
</style>