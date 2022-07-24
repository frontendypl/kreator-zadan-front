<template>
  <div class="v-EnterView w-100 my-auto">

    <div class="container text-center">
      <form class="w-40" @submit.prevent="handleForm">
        <div class="row">
          <div class="col">
            <h1>Twoje imię</h1>
          </div>
        </div>
        <div class="row gx-2 justify-content-center">
          <div class="col col-xl-5">
            <input type="text" id="enter-code-input" class="form-control form-control-lg w-100 fs-1 mb-2 text-center"
              v-model="playerName"
            >
          </div>
          <div class="col col-auto">
            <button class="btn btn-primary text-light btn-lg"><i class="bi bi-check fs-1"></i></button>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <h4 class="text-danger">{{error}}</h4>
            <label for="enter-code-input">Wpisz swoje imię/pseudonim/nr dziennika itp</label>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapState, mapActions} from "vuex";
import axios from "axios";

export default {
  name: 'EnterNameView',
  data(){
    return {
      playerName: '',
      error: ''
    }
  },
  computed: {
    ...mapState(['player', 'list']),
    ...mapGetters(['apiUrl'])
  },
  methods :{
    ...mapActions(['setPlayer']),
    async handleForm() {
      try{
        const {data} = await axios.post(`${this.apiUrl}/players`, {name: this.playerName, listId: this.list._id})
        this.setPlayer(data)
      }catch (e) {
        this.error = e.response.data.errors.name.message
      }

    }
  }
}
</script>

<style lang="scss">


</style>