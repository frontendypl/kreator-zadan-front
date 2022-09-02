<template>
  <div class="v-ResultView my-auto">

    <div class="container">
      <div class="summary row mb-5">
        <div class="col-12 text-center">
          <h1 class="summary__text">
            <span class="summary__text__span summary__text__span--wrong" title="Ilość błędów">{{wrongAnswers.length}}</span>
            /
            <span class="summary__text__span summary__text__span--correct" title="Ilość odpowiedzi">{{correctAnswers.length}}</span>
          </h1>
        </div>
      </div>

      <div class="buttons row justify-content-center gy-2">
        <div class="col-12 col-md-6 col-lg-3">
          <button class="btn btn-lg btn-primary w-100" @click="startAgain">
            Rozwiąż jeszcze raz
          </button>
        </div>
        <div class="col-12 col-md-6 col-lg-3">
          <button class="btn btn-lg btn-danger w-100" @click="restartApp">
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

  .summary {

    &__text {

      font-size: 8em;
      &__span{

        &--correct{
          color: #198754;
        }
        &--wrong{
          color: #bb2d3b;
        }

      }
    }
  }
}

</style>