<template>
  <div class="v-ResultView">
    Koniec <br>
    Ilość pytań: {{correctAnswers.length}}, <br>
    Błędów: {{wrongAnswers.length}} <br>
    Gratulacje

    <br><br>
    <button @click="startAgain">
      Rozwiąż jeszcze raz
    </button>
    <br><br>
    <button @click="restartApp">
      Koniec
    </button>

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