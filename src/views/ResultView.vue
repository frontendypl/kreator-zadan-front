<template>
  <div class="v-ResultView">
    Koniec <br>
    Dobre Odpowiedzi: 10, <br>
    Błędy: {{userAnswers.filter(answer=>!answer.answerOption.isCorrect).length}} <br>
    Gratulacje

    <br><br>
    <router-link :to="{name: 'EnterNameView', params: {shortCode: list.shortCode}}">Spróbuj jeszcze raz</router-link>
    <br><br>
    <router-link :to="{name: 'StartCodeView'}">Koniec</router-link>

  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'

export default {
  name: 'ResultView',
  computed: {
    ...mapState(['list', 'userAnswers'])
  },
  methods:{
    ...mapActions(['clearPlayerSession'])
  },
  mounted() {
    this.clearPlayerSession()
  }
}
</script>