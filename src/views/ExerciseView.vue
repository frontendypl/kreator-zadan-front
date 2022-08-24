<template>
  <div class="v-ExerciseView my-auto"
       :class="{'v-ExerciseView--no-image': !exercise.imageObject}"
  >

    <div class="container text-center" v-if="exercise.content">
      <div class="row mb-3">
        <div class="col" v-if="exercise.imageObject">

          <img
              :src="exercise.imageObject.url"
              class="exercise-image img-fluid"
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
      <div class="row mb-5"

      >
        <div class="col">
          <h2 class="text-content"
              :class="{'text-content--long': exercise.content.content.length > 100,
              'text-content--very-long': exercise.content.content.length > 500
          }"
          >{{ exercise.content.content }}</h2>
        </div>
      </div>
      <div class="row justify-content-center mb-2" v-if="wrongAnswer">
        <div class="col-auto" >
          <h3 class="text-danger">Zła odpowiedź, wybierz inną!</h3>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-auto">
          <button class="answer-button btn btn-primary btn-lg mb-2 w-100"
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

  &--no-image{

  }

  .text-content {
    font-size: 4rem;

    &--long{
      font-size: 2rem;
    }

    &--very-long{
      font-size: 1.5rem;
    }
  }

  .answer-button {
    font-size: 2rem;
  }

  .exercise-image{
    max-height: 50vh;
    width: auto;
  }

  .answer-button {

  }
}
</style>