<template>
  <nav class=" c-AppHeaderComponent navbar bg-dark text-light">
    <div class="container d-flex justify-content-between">
      <div class="d-flex">
<!--        <div>-->
<!--          Pytania.ucze.net-->
<!--        </div>-->
        <div class=""
            v-if="list._id"
        >
          {{list.name}} - <span class="p-1 fw-bold">{{shortCode}}</span>
        </div>
      </div>
      <div>
        <div v-if="player._id">
          {{player.name}} <button class="btn btn-outline-danger ms-2" @click="restartApp" v-if="list._id">Zamknij</button>
        </div>
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