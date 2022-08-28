<template>
  <nav class=" c-AppHeaderComponent navbar bg-dark text-light">
    <div class="container-fluid d-flex justify-content-center">
      <div>
        Pytania.ucze.net
      </div>
      <div v-if="list._id">
        <a class="navbar-brand text-light" href="#">{{list.name}}</a>
      </div>
      <div v-if="list._id">
        <button class="btn btn-light" @click="restartApp">Restart</button>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'AppHeaderComponent',
  props: {
    list: {
      type: Object,
    },
    clearPlayerSession: {
      type: Function
    },
    setAppLoader: {
      type: Function
    }
  },
  methods: {
    restartApp(){
      this.setAppLoader(true)
      this.clearPlayerSession()
      this.$router.push({name: 'StartCodeView'})
      window.location.reload()
    }
  }
}
</script>