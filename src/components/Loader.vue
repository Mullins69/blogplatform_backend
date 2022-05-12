<template>
<ClipLoader color="black"/>
</template>

<script>
import ClipLoader from "vue-spinner/src/ClipLoader.vue"
export default {
    name: "Loader",
    props: {
        color: "",
    },
    components: {
        ClipLoader,
    }
}
</script>

<style scoped>
    *{
        background: transparent;
    }

    
</style>