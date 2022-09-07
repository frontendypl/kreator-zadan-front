<template>
  <div class="v-ExerciseView my-auto"
       :class="{'v-ExerciseView--no-image': !exercise.imageObject}"
  >

    <div class="container text-center" v-if="exercise.content">
      <div class="image-container row" v-if="exercise.imageObject">
        <div class="col" >

          <img
              :src="exercise.imageObject.url"
              class="image-container__img"
              alt=""
              v-if="exercise.imageObject.srcType === 'url' "
          >
          <img
              :src="`data:${exercise.imageObject.mimetype};base64,${exercise.imageObject.src}`"
              class="image-container__img"
              :alt="exercise.imageObject.originalname"
               v-if="exercise.imageObject.srcType === 'buffer' "
          >
        </div>
      </div>
      <div class="content-container row"
           :class="[`font-${exercise.content.contentFont}`]"
           v-if="exercise.content.content"
      >
        <div class="col">
          <p class="text-content"
              :class="{'text-content--long': exercise.content.content.length > 100,
              'text-content--very-long': exercise.content.content.length > 500
          }"
          >{{ exercise.content.content }}</p>
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
          <button class="answer-button btn btn-primary mb-1 w-100"
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

  font-size: 10px;
  @media (min-width: 450px) {
    font-size: 16px;
  }


  &--no-image{

  }

  .image-container {
    margin-bottom:2em;
    .image-container__img {
      max-height: 50vh;
      //width: auto;
    }
  }

  .content-container{
    margin-bottom: 2em;

    &.font-element{
      font-family: element, sans-serif;
    }

    .text-content {
      margin-bottom: 0;

      font-size: 3em;
      font-weight: 600;

      &--long{
        //font-size: 2rem;
      }

      &--very-long{
        //font-size: 1.5rem;
      }
    }
  }

  .answers-container{

    @media (min-width: 1000px) {
      max-width: 600px;
      margin: 0 auto;
    }


    &.font-element{
      font-family: element, sans-serif;
    }

    .answer-button {
      font-size: 1.5em;
      font-weight: 600;
    }

  }


}
</style>