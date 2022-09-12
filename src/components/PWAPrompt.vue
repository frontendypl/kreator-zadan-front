<template>
  <div class="c-PWAPrompt w-100" v-if="shown">
<!--  <div class="c-PWAPrompt w-100">-->

<!--    <div class="container">-->
<!--      <div class="row">-->
<!--        <div class="col p-2">-->
<!--          <p>-->
<!--            Zainstaluj aplikacje-->
<!--          </p>-->
<!--        </div>-->
<!--      </div>-->
<!--      <div class="row">-->
<!--        <div class="col-6">-->
<!--          <button class="btn btn-lg btn-success w-100" @click="installPWA">-->
<!--            Tak-->
<!--          </button>-->
<!--        </div>-->
<!--        <div class="col-6">-->
<!--          <button class="btn btn-lg btn-danger w-100" @click="dismissPrompt">-->
<!--            Nie-->
<!--          </button>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->

    <img class="logo" src="/img/icons/android-chrome-512x512.png" alt="" @click="installPWA">
    <div class="text" @click="installPWA">
      Pobierz aplikacje
    </div>
    <div class="close" @click="dismissPrompt">
      x
    </div>

  </div>
</template>

<script>
export default {
  data: () => ({
    shown: false,
  }),

  beforeMount() {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault()
      this.installEvent = e
      this.shown = true
    })
  },

  methods: {
    dismissPrompt() {
      this.shown = false
    },

    installPWA() {
      this.installEvent.prompt()
      this.installEvent.userChoice.then((choice) => {
        this.dismissPrompt() // Hide the prompt once the user's clicked
        if (choice.outcome === 'accepted') {
          // Do something additional if the user chose to install
        } else {
          // Do something additional if the user declined
        }
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.c-PWAPrompt{
  font-size: 10px;

  display: flex;
  align-items: center;
  padding: 0.5em;
  border-top: 1px solid rgba(0,0,0,0.4);
  background-color: #fff;

  .logo{
    width: 6em;
    margin-right: 1.5em;
  }
  .text{
    font-size: 2em;
    font-weight: 600;
    text-transform: uppercase;
    margin-right: 1em;
  }
  .close{
    font-size: 2.5em;
    line-height: 0;
    padding: 0.5em 0 0 0;
    align-self: flex-start;

  }
}
</style>