<template>
  <div id="app" class="d-flex flex-column min-vh-100">

    <AppHeaderComponent :list="list" />

    <router-view :shortCodeError="shortCodeError"/>

  </div>
</template>

<script>
import {mapState, mapGetters, mapActions} from "vuex"
import AppHeaderComponent from "@/components/AppHeaderComponent";
import axios from "axios";
import router from "@/router";

export default {
  components: {AppHeaderComponent},
  data(){
    return {
      shortCodeError: '',
    }
  },
  computed: {
    ...mapState(['list', 'shortCode', 'player']),
    ...mapGetters(['apiUrl']),
  },
  methods: {
    ...mapActions(['setList','setShortCode']),
    // async getListData(){
    //   this.shortCodeError = ''
    //   try {
    //     const response = await axios.get(`${this.apiUrl}/lists/validation/${this.shortCode}`)
    //     await this.setList(response.data)
    //     await this.$router.push({name: 'EnterNameView', params: {shortCode: this.shortCode}})
    //   }catch (e) {
    //     this.shortCodeError = e.response.data.error
    //     if(this.$route.path !== '/'){
    //       await this.$router.push({path: '/'})
    //     }
    //   }
    // },

  },
  watch: {
    shortCode: {
      handler(newValue, oldValue){
        if(newValue){
          this.getListData()
        }
      },
      deep: true
    },
    player: {
      handler(newValue, oldValue){
        if(newValue._id){
          // this.$router.push({name: 'ExerciseView', params: {shortCode: this.list.shortCode}})

        }
      },
      deep: true
    }
  },
  created(){
    this.setShortCode(this.$router.currentRoute.params.shortCode || '')
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