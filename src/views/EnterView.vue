<template>
  <div class="v-EnterView w-100 my-auto">

    <div class="container text-center">
      <form class="w-40" @submit.prevent="handleForm">
        <div class="row">
          <div class="col">
            <h1>Kod Dostępu</h1>
          </div>
        </div>
        <div class="row gx-2 justify-content-center">
          <div class="col col-xl-5">
            <input type="text" id="name-input" class="form-control form-control-lg w-100 fs-1 mb-2 text-center"
                   v-model="shortCode"
            >
          </div>
          <div class="col col-auto">
            <button class="btn btn-primary text-light btn-lg">
              <i class="bi bi-check fs-1"></i>
            </button>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <h4 class="text-danger">{{shortCodeError}}</h4>
            <label for="name-input">Podaj kod który otrzymałeś od nauczyciela</label>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

import {mapActions, mapGetters} from 'vuex'
export default {
  name: 'EnterView',
  props: {
    shortCodeError: {
      type: String
    }
  },
  data(){
    return {
      shortCode: '',
    }
  },
  computed: {
  },
  methods: {
    ...mapActions(['setShortCode']),

    handleForm(){
      this.setShortCode(this.shortCode)
      // this.$router.push({name: 'EnterNameView', params: {shortCode: this.shortCode}})
    }
  },
  mounted(){

  }
}
</script>

<style lang="scss">


</style>