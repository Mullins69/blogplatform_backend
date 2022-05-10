<template>
  <div class="container">
      <div class="name">
       <h1 class="signup">Sign Up</h1>
      </div>
     

 <div id="card">
    <div id="card-content">
      <div id="card-title">
        <h1>Create Account</h1>
        <h3 class="desciption_create">It’s free & hardly takes more than 30 seconds.</h3>
        <!-- <div class="border"></div> -->
 
      </div>
      <Form @submit="handleRegister" :validation-schema="schema">
        <div v-if="!successful">
        
                <div class="form-group">
                    <label class="form-label" id="nameLabel" for="name"></label>
                    <Field type="text" class="form-control" id="customername" name="customername" placeholder="Username" tabindex="1"  />
                    <ErrorMessage name="customername" class="error-feedback" />
                </div>

                <div class="form-group">
                    <label class="form-label" id="emailLabel" for="email"></label>
                    <Field type="email" class="form-control" id="email" name="email" placeholder="Email Address" tabindex="2" />
                    <ErrorMessage name="email" class="error-feedback" />
                </div>


                <div class="form-group">
                    <label class="form-label" id="subjectLabel" for="sublect"></label>
                    <Field type="text" class="form-control" id="password" name="password" placeholder="Password" tabindex="3"/>
                    <ErrorMessage name="password" class="error-feedback" />
                </div>
                <div class="form-group">
                    <label class="form-label" id="subjectLabel" for="sublect"></label>
                    <Field type="text" class="form-control" id="confirm_password" name="confirm_password" placeholder="Confirm Password" tabindex="3" />
                    <ErrorMessage name="confirm_password" class="error-feedback" />
                </div>

                <div class=" b text-center margin-top-25">
                    <button class="btn btn-mod btn-border btn-large">
                       <span class="sign" v-show="!loading">SIGN UP</span>
                      <span v-show="loading"><Loader/></span>
                    </button>
                </div>
                <div class="form-group">
                  <div v-if="message" class="alert alert-danger" role="alert">
                      {{message}}
                  </div>
               </div>
          <!-- <div class="signUp">
              <h6> Already have an account?   <router-link :to="{ name: 'SignUp'}">Login</router-link></h6>      
          </div> -->
        
        </div>
      </Form>
    </div>
  </div>
 </div>
  <!-- </div> -->
</template>

<script>
import Loader from "../components/Loader.vue"
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
export default {
  name: "Register",
  components: {
    Form,
    Field,
    ErrorMessage,
    Loader,
  },
  data() {
    const schema = yup.object().shape({
      customername: yup
        .string()
        .required("Username is required!")
        .min(3, "Must be at least 3 characters!")
        .max(20, "Must be maximum 20 characters!"),
      email: yup
        .string()
        .required("Email is required!")
        .email("Email is invalid!")
        .max(50, "Must be maximum 50 characters!"),
      password: yup
        .string()
        .required("Password is required!")
        .min(6, "Must be at least 6 characters!")
        .max(40, "Must be maximum 40 characters!"),
     phone_number: yup
        .string()
        .required("Phone Number is required!")
        // .min(6, "Must be at least 6 characters!")
        // .max(40, "Must be maximum 40 characters!"),
    });
    return {
      successful: false,
      loading: false,
      schema,
      message: "",
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  mounted() {
    if (this.loggedIn) {
      this.$router.push("/Success");
    }
  },
  methods: {
      handleRegister(user) {
      this.message = "";
      this.successful = false;
      this.loading = true;
      this.$store.dispatch("auth/register", user).then(
        (data) => {
          this.message = data.message;
          this.successful = true;
          this.loading = false;
          this.$router.push("/Success");
        },
        (error) => {
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          this.successful = false;
          this.loading = false;
        }
      );
    },
    // handleRegister(user) {
    //   this.errorMessage = "";
    //   this.successful = false;
    //   this.loading = true;
    //   this.$store.dispatch("auth/register", user).then(
    //     (data) => {
    //       this.message = data.message;
    //       this.successful = true;
    //       this.loading = false;
    //        this.$router.push("/");
    //     }
    //   ).catch((error) => {
    //          error = this.errorMessage;
    //   });
    // },
  },
};
</script>

<style scoped>
 .container{
     display: grid; 
     justify-content:center;

 }
.desciption_create{
  font-family: 'Inter';
font-style: italic;
font-weight: 300;
font-size: 20px;
line-height: 29px;
/* identical to box height */


color: rgba(0, 0, 0, 0.5);
}
.signup{
  
font-family: 'Inter';
font-style: italic;
font-weight: 500;
font-size: 40px;
line-height: 77px;

color: #000000;

}
.name{
  margin-top: 70px;
  align-items: center;
}
/* #card-content {
margin-top: 300px;
} */
a {
  text-decoration: none;
}

.signUp{
    padding-top: 20px;
}
body {
  background: -webkit-linear-gradient(bottom, #2dbd6e, #a6f77b);
  background-repeat: no-repeat;
}

#forgot-pass {
  font-size: 10pt;
  margin-top: 3px;
  text-align: right;
}
#card {

  height: 650px;

  width: 330px;
}

#card-title {
 
  font-family: 'Inter';
  font-style: italic;
  font-weight: 300;
  font-size: 48px;
  line-height: 58px;
  color: #000000;
  padding-bottom: 23px;
  /* padding-top: 13px; */
  text-align: center;
}
#signup {
 
  font-size: 10pt;
  margin-top: 16px;
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
.sign{
  
  background: transparent;
}
/* #submit-btn:hover {
  box-shadow: 0px 1px 18px #1e90ff;
} */
.form {
  align-items: left;
  display: flex;
  flex-direction: column;
}
.form-border {
  background:#b68345;
  height: 1px;
  width: 100%;
}
.form-content {
  
  border: none;
  outline: none;
  padding-top: 14px;
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
/* .containe {
  display:flex;
  padding: none;
  margin-bottom:50px;
} */

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

}

.form-group .form-control {
    display: block;
    border-radius: 0.25rem;
    width: 100%;
    height: 48px;
    padding: 10px 24px;
    font-size: 15px;
    font-weight: 400;
    /* border-radius: 25px; */
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
    /* color: #fff; */
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


.fas{
  display:flex;
  justify-content: center;
  font-size:35px;

  
}

.call-me{
  display:flex;
  justify-content: center;
  color:#9dd8e0;
}

.call-me-1{
  display:flex;
  justify-content: center;

}
.call-holder{
  padding-top: 15px;
}
.fas{
  color:#1e90ff;
}
.b{
  display:flex;
  justify-content: space-around;
  
  
}

.btn{
    
    padding: 25px 43px;
    /* border-radius: 30px; */

    


}




@media only screen and (max-width: 494px) {
    h1.headin{
    padding-top:50px;
}
}
.border{
    border-top: 1px solid;
    width: 100px;
    display:inline-flex;
    justify-content: center;
}
 
</style>
