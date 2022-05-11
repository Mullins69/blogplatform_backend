<template>
  <footer id="contact-page">
    <div class="contact-container">
      <div class="contact-item">
        <div class="contact-heading">
          <h3>Get in touch with The <span style="color:red">B</span>log.</h3>
        </div>
        <div class="form">
          <form id="contact-form" target="_blank" @submit.prevent="handleSubmit">
            <div class="form-group">
              <label>Name</label>
              <input type="name" placeholder="Your name" name="_replyto" required class="shadow" v-model="name" />
            </div>
            <div class="form-group">
              <label>E-mail</label>
              <input type="email" placeholder="Your email" name="_replyto" required class="shadow" v-model="email"/>
            </div>
            <div class="form-group">
              <label>Message</label>
              <textarea  name="textarea"  placeholder="Your message"  required   class="shadow"  v-model="message" ></textarea>
            </div>
            <div class="form-button">
              <button :disabled="loading" type="submit" class="btn btn-mod btn-border btn-large">
                <span v-show="!loading">Submit</span>
                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" v-show="loading"></span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <!-- <div class="footer-copyright">
      <h6 class="copyright">Copyright @  The <span style="color:red">B</span>log 2022. All rights reserved.</h6>
    </div> -->
  </footer>
</template>

<script>
export default {
  name: "ContactView",
  data() {
    return {
      name:"",
      email: "",
      message: "",
      loading: false,
    };
  },
  methods: {
    handleSubmit() {
      this.loading = true;
      try {
        fetch("https://blogplatapi.herokuapp.com/contact", {
          method: "POST",
          body: JSON.stringify({
            name:this.name,
            email: this.email,
            message: this.message,
            subject: "Blog Contact"
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        })
          .then((response) => response.json())
          .then((json) => alert((json.msg = "Form has been submitted")))
          .then(() => (this.loading = false));
      } catch (error) {
        alert((error.message = "An error occurred while submitting"));
      }
    },
  },
};
</script>

<style scoped>

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
    border-color:black;
    
    outline: none;
}
.blog-footer {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.95);
  bottom: 0;
  margin: 0;
  width: 100%;
}
.footer-copyright {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 8px;
}
.copyright {
  color: #fff;
  font-size: 12px;
  margin: 0;
}
* {
  box-sizing: border-box;
  scroll-behavior: smooth;
}
footer {
  display: flex;
  width: 100%;
  background: rgba(0, 0, 0, 0.95);
  flex-wrap: wrap;
  flex-direction: column;
  color: #fff;
  justify-content: center;
  align-items: center;
}
.contact-container {
  margin: 2rem 0;
  display: flex;
  flex-direction: row;
  width: 60%;
  justify-content: center;
  align-items: center;
}
.contact-item {
  width: 50%;
  color: #fff;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 0;
  row-gap: 1rem;
  padding: 0;
}
.contact-item h3 {
  font-size: 20px;
  color: #fff;
}
.form {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
label {
  font-size: 15px;
  color: #fff;
  font-weight: 600;
}

.form-group {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  row-gap: 0.5rem;
  width: 100%;
}
.form-button {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  row-gap: 0.5rem;
}
#contact-form {
  width: 100%;
  gap: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  padding: 0;
  margin: 0;
}
#contact-form input,
textarea {
  min-width: 300px;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  font-weight: 600;
  
}
#contact-form input::placeholder,
textarea::placeholder {
  color: white;
}
#contact-form input {
  height: 40px;
  padding: 10px;
}
#contact-form textarea {
  height: 60px;
  padding: 10px;
}
@media only screen and (max-width: 770px) {
  .contact-container {
    gap: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    flex-wrap: wrap;
    width: 100%;
  }
  .contact-item {
    width: 95%;
  }
  #contact-form input,
  textarea {
    min-width: 250px;
    font-weight: 600;
  }
  .form-group {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    row-gap: 0.5rem;
    width: 100%;
  }
  .form-button {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    row-gap: 0.5rem;
  }
}
</style>