<template>
  <nav class=" c-AppFooterComponent navbar bg-dark text-light">
    <div class="container d-flex justify-content-center">
      <a class="logo__link link-light text-decoration-none font-element" href="https://ucze.net">ucze.net</a>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'AppFooterComponent',
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
  .c-FooterComponent{

    .logo{
      &__link {
        font-size: 2em;
      }
    }
  }
</style>