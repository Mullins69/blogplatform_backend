<template>
  <div class="container">
              <h4> Welcome to The <span style="color:red">B</span>log </h4>
        <p>
          Thank you for signing up to  The <span style="color:red">B</span>log.
        </p>
        <p>
          Don't forget to check your email for your registration confirmation,
          however you can sign in immediately.
        </p>
      
      <div class="sign-up">
        <router-link :to="{ path: '/SignIn' }">
          <button class="btn btn-mod btn-border btn-large">Login</button>
        </router-link>
  </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.container {
    padding-top: 200px;
    height:100vh
}

.btn-mod.btn-large {
    height: auto;
    padding: 13px 52px;
    font-size: 15px;
     border-radius:2px;
    
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

</style>