<template>
  <div id="app" class="d-flex flex-column min-vh-100">
    <AppLoaderComponent v-if="appLoader" />
    <AppHeaderComponent
        :shortCode="shortCode"
        :list="list"
        :player="player"
        :clearPlayerSession="clearPlayerSession"
        :setAppLoader="setAppLoader"
    />

    <router-view />

    <AppFooterComponent />

<!--    <PWAPrompt />-->

  </div>
</template>

<script>
import {mapState, mapGetters, mapActions} from "vuex"
import AppLoaderComponent from "@/components/AppLoaderComponent";
import AppHeaderComponent from "@/components/AppHeaderComponent";
import PWAPrompt from "@/components/PWAPrompt";
import AppFooterComponent from "@/components/AppFooterComponent";
// import axios from "axios";

export default {
  components: {
    AppFooterComponent,
    // PWAPrompt,
    AppLoaderComponent,
    AppHeaderComponent
  },
  data(){
    return {

    }
  },
  computed: {
    ...mapState(['appLoader', 'list', 'shortCode', 'player','exercise','userLists']),
    urlShortCode(){
      return this.$route.params.shortCode
    }
  },
  methods: {
    ...mapActions(['setShortCode','getList', 'getExercise','returnPlayerSession', 'clearPlayerSession','setAppLoader'])
  },
  watch: {
    urlShortCode: {
      handler(newValue, oldValue){
        console.log({newValue})
        console.log({oldValue})
        if(newValue){
          console.log(newValue)
          this.setShortCode(newValue)
        }
      }
    },
    shortCode: {
      handler(newValue, oldValue){
        this.getList()
      }
    },
    list: {
      handler(){
        if(this.$route.name !== 'EnterNameView' && !this.player._id){
          this.$router.push({name: 'EnterNameView', params: {shortCode: this.shortCode}})
        }
        if(this.player._id){
          this.getExercise()
        }
      },
      deep: true
    },
    userLists: {
      handler(){
        this.$router.push({name: 'UserListsView', params: {shortCode: this.shortCode}})
      },
      deep: true
    },
    player: {
      handler(){
        if(this.list._id){
          this.getExercise()
        }
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
    this.returnPlayerSession(this.$route.params.shortCode)

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

.font-element{
  font-family: element, sans-serif;
}

body{
  background-image: url("@/assets/images/background.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-attachment: fixed;
  min-height: 100vh;
}

img{
  max-width: 100%;
}

</style>