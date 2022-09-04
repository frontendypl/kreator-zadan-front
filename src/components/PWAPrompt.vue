<template>
  <div class="c-PWAPrompt w-100 fixed-bottom p-2" v-if="shown">

    <div class="row">
      <div class="col-6">
        <button class="btn btn-lg btn-success w-100" @click="installPWA">
          Otwórz w aplikacji.
        </button>
      </div>
      <div class="col-6">
        <button class="btn btn-lg btn-danger w-100" @click="dismissPrompt">
          Może później.
        </button>
      </div>
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

<style lang="scss">
.c-PWAPrompt{
  background-color: rgba(0,0,0,0.8);
}
</style>