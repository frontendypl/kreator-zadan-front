<template>
  <div class="v-ResultView my-auto">

    <div class="container">
      <div class="summary row">
        <div class="col-12 text-center">
          <h1 class="summary__text">
            Błędy: {{wrongAnswers.length}}
          </h1>
          <h2 class="summary__congrats"
              v-if="!wrongAnswers.length"
          >
            Gratulacje !
          </h2>
        </div>
      </div>

      <div class="buttons row justify-content-center gy-2">
        <div class="col-12 col-md-6 col-lg-4">
          <button class="buttons__button btn btn-primary w-100" @click="startAgain">
            Rozwiąż jeszcze raz
          </button>
        </div>
        <div class="col-12 col-md-6 col-lg-4">
          <button class="buttons__button btn btn-danger w-100" @click="restartApp">
            Koniec
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'

export default {
  name: 'ResultView',
  computed: {
    ...mapState(['shortCode','player','list', 'userAnswers']),
    correctAnswers(){
      return this.userAnswers.filter(answer=>answer.answerOption.isCorrect)
    },
    wrongAnswers(){
      return this.userAnswers.filter(answer=>!answer.answerOption.isCorrect)
    },
  },
  methods:{
    ...mapActions(['clearPlayerSession','setAppLoader','setPlayer']),
    startAgain(){
      this.setAppLoader(true)
      // this.clearPlayerSession()
      this.$router.push({name: 'EnterNameView', params: {shortCode: this.shortCode}})
      this.setPlayer(this.player.name)
      //
    },
    restartApp(){
      this.setAppLoader(true)
      this.clearPlayerSession()
      this.$router.push({name: 'StartCodeView'})
      window.location.reload()
    }
  },
  mounted() {
  },
}
</script>

<style lang="scss">
//https://blog.logrocket.com/best-practices-for-loading-fonts-in-vue/
.v-ResultView{
  font-size: 10px;


  .summary {
    margin-bottom: 3em;
    @media (min-width: 450px) {
      font-size: 16px;
    }

    &__text {
      font-size: 7em;
    }
    &__congrats {
      font-size:4em;
    }
  }

  .buttons{

    &__button{
      font-size: 3em;
      font-weight: 600;
    }
  }
}

</style>