<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
html {
  background-color: rgba(242, 242, 242, 1);
}
body {
  padding: 0;
  margin: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  /* color: #2c3e50; */
  /* margin-top: 60px; */
}
a {
  text-decoration: none;
}
a:-webkit-any-link {
  text-decoration: none;
}
textarea {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}
</style>
