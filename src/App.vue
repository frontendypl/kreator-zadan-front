<template>
  <div id="app" class="d-flex flex-column min-vh-100">
    <AppLoaderComponent v-if="appLoader" />
<!--    <AppHeaderComponent :list="list" />-->
    <router-view />

  </div>
</template>

<script>
import {mapState, mapGetters, mapActions} from "vuex"
import AppLoaderComponent from "@/components/AppLoaderComponent";
// import AppHeaderComponent from "@/components/AppHeaderComponent";
// import axios from "axios";

export default {
  components: {AppLoaderComponent},
  data(){
    return {

    }
  },
  computed: {
    ...mapState(['appLoader', 'list', 'shortCode', 'player','exercise'])
  },
  methods: {
    ...mapActions(['setShortCode','getList', 'getExercise','returnPlayerSession'])
  },
  watch: {
    list: {
      handler(){
        if(this.$route.name !== 'EnterNameView'){
          this.$router.push({name: 'EnterNameView', params: {shortCode: this.shortCode}})
        }
      },
      deep: true
    },
    player: {
      handler(){
        this.getExercise()
      },
      deep: true
    },
    exercise: {
      handler(){
        if(this.$route.name === 'EnterNameView'){
          this.$router.push({name: 'ExerciseView', params: {shortCode: this.shortCode}})
        }
      },
      deep: true
    }
  },
  created(){
    this.returnPlayerSession()

    if(this.$route.params.shortCode){
      this.setShortCode(this.$route.params.shortCode)
      this.getList()
    }
  },
  mounted() {
    console.log(this.$route)
  },
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