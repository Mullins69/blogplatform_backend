<template>
<div class="container">
 <div class="row">
    <div class="col">
      <select v-model="selected"  class="form-select"  aria-label="Default select example">
        <option selected value="">Display All</option>
        <option value="mask">Masks</option>
        <option value="wetsuits">Wetsuits</option>
        <option value="camera">Camera</option>
      </select>
    </div>
    <div class="col">
      <form class="d-flex">
        <input class="form-control me-2" type="text" v-model="search" placeholder="Search"  aria-label="Search"/>
      </form>
    </div>
        <!-- <div class="col"></div> -->
  </div> 
  <div class="row">
    <div  class="col-lg-4 col-md-6 mb-3"  v-for="blogs of filterblogs" :key="blogs._id"></div>
  </div>
 
</div>

<Contact/>
</template>

<script>
import Contact from "@/components/Contact.vue";
export default {
  name: "HomeView",
  components: {
    Contact,
  },
  data() {
    return {
      blog: null,
      search: "",
      selected: "",
    };
  },
  computed: {
    filterblogss: function () {
      let filtered = this.blogs
      if (this.selected == '') {
          filtered = filtered.filter((blogs) => {
           return blogs.category.match(this.selected) ;
          
        });
        if(this.search){
          filtered = filtered.filter((blogs) =>{
            return blogs.title.match(this.search)
          })
        }
        return filtered
      }
      if (this.selected) {
        filtered = filtered.filter((blogs) => {
           return blogs.category.match(this.selected) ;
          
        });
        if(this.search){
          filtered = filtered.filter((blogs) =>{
            return blogs.title.match(this.search)
          })
        }
        return filtered
        
      }
  
      
    },
  },
};
</script>

<style scoped>
.container{
  display: flex;
  justify-content: center;
  margin-top: 100px;
}
</style>

