<template>
  <div class="v-ResultView">
    Koniec <br>
    Dobre Odpowiedzi: 10, <br>
    Błędy: 1 <br>
    Gratulacje

    <br><br>
    <router-link :to="{name: 'EnterNameView', params: {shortCode: list.shortCode}}">Spróbuj jeszcze raz</router-link>
    <br><br>
    <router-link :to="{name: 'StartCodeView'}">Koniec</router-link>

  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'ResultView',
  computed: {
    ...mapState(['list'])
  }
}
</script>