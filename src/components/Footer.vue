<template>
  <footer>Copyright @  The Blog 2022. All rights reserved.</footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style scoped>
footer {
  width: 100%;
  position: absolute;
  bottom: -35px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  min-height: 50px;
  background-color: black;
  font-size: 10px;
  font-weight: 600;
  color: #fff;
}
/* span{
    font-family: 'Inter';
    font-style: italic;
} */
/* @media screen and (max-width: 600px) {
  footer {
    min-height: 35px;
  }
} */
</style>