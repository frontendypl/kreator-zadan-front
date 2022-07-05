<template>
  <div id="app" class="d-flex flex-column min-vh-100">

    <AppHeader/>

    <router-view/>

  </div>
</template>

<script>
import {mapState, mapGetters} from "vuex"
import AppHeader from "@/components/AppHeader";
export default {
  components: {AppHeader},
  computed: {
    ...mapGetters(['listId']),
  },
  watch: {
    // player: {
    //   handler(newValue, oldValue) {
    //     if (newValue !== '')
    //       this.$router.push({name: 'EnterNameView', params: {listId: newValue}})
    //   },
    //   deep: true
    // },
    // userName(newValue, oldValue){
    //   if(newValue !== '' && this.listId !== ''){
    //     this.$router.push({name: 'ExerciseView', params: {userName: newValue}})
    //   }
    // }
  },
  mounted() {

  }
}
</script>

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

img{
  max-width: 100%;
}

</style>