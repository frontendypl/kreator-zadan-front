<template>
  <div class="v-ExerciseView my-auto">

    <div class="container text-center" v-if="exercise.content">
      <div class="row mb-3">
        <div class="col" v-if="exercise.imageObject">
<!--          <img :src="activeExercise.imgLink" class="v-ExerciseView__img mx-auto" alt="">-->

          <img
              :src="exercise.imageObject.url"
              class="img-fluid"
              alt=""
              v-if="exercise.imageObject.srcType === 'url' "
          >
          <img
              :src="`data:${exercise.imageObject.mimetype};base64,${exercise.imageObject.src}`"
              class="img-fluid"
              :alt="exercise.imageObject.originalname"
               v-if="exercise.imageObject.srcType === 'buffer' "
          >
        </div>
      </div>
      <div class="row mb-2">
        <div class="col">
          <h2>{{exercise.content.content}}</h2>
        </div>
      </div>
      <div class="row justify-content-center mb-2" v-if="wrongAnswer">
        <div class="col-auto" >
          <h3 class="text-danger">Zła odpowiedź, wybierz inną!</h3>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-auto">
          <button class="btn btn-primary btn-lg mb-2 w-100"
                  v-for="option in exercise.content.answerOptions"
                  :key="option._id"
                  @click="handleAnswer(option)"
                  :disabled="answerLoader"
          >
            {{option.text}}
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import {mapState, mapActions} from "vuex";

export default {
  name: 'ExerciseView',
  data(){
    return {

    }
  },
  computed: {
    ...mapState(['answerLoader','exercise','wrongAnswer','player'])
  },
  methods: {
    ...mapActions(['postAnswer','setAnswerLoader']),
    handleAnswer(answerOption){
      this.postAnswer({
        answerOption
      })
    }
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