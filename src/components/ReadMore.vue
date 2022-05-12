<template>
    <div class="container">
        <div class="row" v-if="singleblog">
            <div class="col" v-for="blog of singleblog.post" :key="blog._id">
                <h1>
                    {{blog.title}}
                </h1>
                <img :src="blog.img" alt="pic" height="300px">
                <p>
                    {{blog.details}}
                </p>
            </div>
        </div>
        <div class="row" v-else>
            <h1>Loading single blog...</h1>
        </div>
    </div>
</template>
<script>

export default {
    props: ['id'],
    data() {
    return {
      singleblog: null,
    };
  },
  mounted(){
      fetch("https://blogplatapi.herokuapp.com/posts/" + this.id, {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        this.singleblog = json
      })
      .catch((err) => {
        alert(err);
        console.log(err);
      });
  }
}
</script>
<style scoped>

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 150px;
}
</style>