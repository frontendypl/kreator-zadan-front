<template>
  <nav class=" c-AppHeaderComponent navbar bg-dark text-light">
    <div class="container d-flex justify-content-between">
      <div class="logo font-element" v-if="screenWidth>600 || !list._id">
        <a class="logo__link link-light text-decoration-none" href="https://ucze.net">ucze.net</a>
      </div>
      <div v-if="list._id && screenWidth>600"
      >
        {{list.name}} <span class="p-1 fw-bold"></span>
      </div>
      <div>
        <div class="d-flex align-items-center" v-if="list._id">
          <span class="me-4" v-if="player._id && screenWidth>600">
            {{player.name}}
          </span>
          <button class="btn btn-outline-danger ms-2" @click="restartApp" v-if="list._id">Zamknij</button>
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
  computed: {
    screenWidth(){
      return window.outerWidth
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

<style lang="scss" scoped>
  .c-AppHeaderComponent{

    .logo{
      &__link {
        font-size: 2em;
      }
    }
  }
</style>