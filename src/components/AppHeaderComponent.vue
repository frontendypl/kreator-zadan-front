<template>
  <nav class=" c-AppHeaderComponent navbar bg-dark text-light">
    <div class="container-fluid d-flex justify-content-between">
      <div>
        Pytania.ucze.net
      </div>
      <div v-if="list._id">
        {{list.name}} - {{shortCode}}
      </div>
      <div v-if="player._id">
        {{player.name}}
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
    shortCode: {
      type: String,
    },
    list: {
      type: Object,
    },
    player: {
      type: Object
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