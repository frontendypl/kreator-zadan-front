<template>
  <div class="v-ExerciseView my-auto">

    <div class="container text-center">
      <div class="row mb-3">
        <div class="col">
          <img :src="activeExercise.imgLink" class="v-ExerciseView__img mx-auto" alt="">
        </div>
      </div>
      <div class="row mb-4">
        <div class="col">
          <h2>{{activeExercise.question}}</h2>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-auto">
          <button class="btn btn-primary btn-lg mb-2 w-100" v-for="answer in activeExercise.answers" :key="answer.id">
            {{answer.text}}
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: 'ExerciseView',
  data(){
    return {

    }
  },
  computed: {
    ...mapState(['activeExercise'])
  },
  methods: {

  },
  created() {

  },
  mounted() {
  }
}
</script>

<style lang="scss">
.v-ExerciseView{

  &__img{
    max-height: 50vh;
    width: auto;
  }
}
</style>