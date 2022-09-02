<template>
  <div class="v-ExerciseView my-auto"
       :class="{'v-ExerciseView--no-image': !exercise.imageObject}"
  >

    <div class="container text-center" v-if="exercise.content">
      <div class="image-container row mb-3">
        <div class="col" v-if="exercise.imageObject">

          <img
              :src="exercise.imageObject.url"
              class="image-container__img img-fluid"
              alt=""
              v-if="exercise.imageObject.srcType === 'url' "
          >
          <img
              :src="`data:${exercise.imageObject.mimetype};base64,${exercise.imageObject.src}`"
              class="image-container__img img-fluid"
              :alt="exercise.imageObject.originalname"
               v-if="exercise.imageObject.srcType === 'buffer' "
          >
        </div>
      </div>
      <div class="content-container row mb-5"
           :class="[`font-${exercise.content.contentFont}`]"
      >
        <div class="col">
          <h2 class="text-content"
              :class="{'text-content--long': exercise.content.content.length > 100,
              'text-content--very-long': exercise.content.content.length > 500
          }"
          >{{ exercise.content.content }}</h2>
        </div>
      </div>
<!--      <div class="row justify-content-center mb-2" v-if="wrongAnswer">-->
<!--        <div class="col-auto" >-->
<!--          <h3 class="text-danger">Zła odpowiedź, wybierz inną!</h3>-->
<!--        </div>-->
<!--      </div>-->
      <div class="answers-container row justify-content-center"
           :class="[`font-${exercise.content.answersFont}`]"
      >
        <div class="col-auto">
          <button class="answer-button btn btn-primary btn-lg mb-2 w-100"
                  :class="{
                    'btn-danger': wrongAnswer && (option._id === userAnswerOption._id),
                    'btn-success': !wrongAnswer && (option._id === userAnswerOption._id)
                  }"
                  v-for="option in exercise.content.answerOptions"
                  :key="option._id"
                  @click="handleAnswer(option)"
                  :disabled="answerLoader || (userAnswerOption._id && userAnswerOption.isCorrect)"
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
    ...mapState(['answerLoader','exercise','wrongAnswer','player','userAnswerOption'])
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

  .image-container {

    .image-container__img {
      max-height: 50vh;
      width: auto;
    }
  }

  .content-container{

    &.font-element{
      font-family: element, sans-serif;
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
  }

  .answers-container{

    &.font-element{
      font-family: element, sans-serif;
    }

    .answer-button {
      font-size: 2rem;
    }

  }


}
</style>