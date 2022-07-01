<template>
  <div id="app" class="d-flex flex-column min-vh-100">

    <AppHeader/>

    <router-view/>

  </div>
</template>

<style lang="scss">

@import "bootstrap/dist/css/bootstrap.min.css";
@import "bootstrap-icons/font/bootstrap-icons.css";

body{
  background-image: url("@/assets/images/background.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  min-height: 100vh;
}

</style>
<script>
import AppHeader from "@/components/AppHeader";
export default {
  components: {AppHeader}
}
</script>