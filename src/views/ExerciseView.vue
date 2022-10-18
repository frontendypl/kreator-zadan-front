<template>
  <div class="v-ExerciseView my-auto"
       :class="{'v-ExerciseView--no-image': !exercise.imageObject}"
  >

    <div class="container text-center" v-if="exercise.content">
      <div class="image-container row" v-if="exercise.imageObject">
        <div class="col-auto position-relative justify-content-center mx-auto" >

          <img
              :src="exercise.imageObject.url"
              class="image-container__img"
              :class="{'image-container__img--magnified':magnification}"
              alt=""
              v-if="exercise.imageObject.srcType === 'url' "
          >
          <img
              :src="`data:${exercise.imageObject.mimetype};base64,${exercise.imageObject.src}`"
              class="image-container__img"
              :class="{'image-container__img--magnified':magnification}"
              :alt="exercise.imageObject.originalname"
               v-if="exercise.imageObject.srcType === 'buffer' "
          >

          <i class="image-container__icon bi bi-arrows-fullscreen"
             v-if="!magnification"
             @click="magnification = true"
          ></i>
          <i class="image-container__icon bi bi-box-arrow-in-down-left"
             v-if="magnification"
             @click="magnification = false"
          >
          </i>

        </div>
      </div>
      <div class="content-container row"
           :class="[`font-${exercise.content.contentFont}`]"
           v-if="exercise.content.content"
      >
        <div class="col">
          <p class="text-content"
              :class="{
              'text-content--long': exercise.content.content.length > 100,
              'text-content--very-long': exercise.content.content.length > 500,
              'text-content--no-image': !exercise.imageObject
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
          <button class="answer-button btn btn-primary white mb-3 w-100"
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
      magnification: false,
      // imageRatio: 1
    }
  },
  computed: {
    ...mapState(['answerLoader','exercise','wrongAnswer','player','userAnswerOption']),
  },
  methods: {
    ...mapActions(['postAnswer','setAnswerLoader']),
    handleAnswer(answerOption){
      this.postAnswer({
        answerOption
      })
    },
    // countImageRatio(){
    //     const image = document.querySelector('.image-container__img')
    //     this.imageRatio=  image? image.wid/window.outerHeight: 1
    // }
  },
  watch: {
    exercise: {
      handler(){
        this.magnification = false;
        // setTimeout(()=>{
        //   this.countImageRatio()
        // },100)
      },
      deep: true
    }
  },
  created() {

  },
  mounted() {
    window.addEventListener('resize',()=>{
      // this.countImageRatio()
    })
  },
}
</script>

<style lang="scss" scoped>

body{
  background-image: none;
}

.v-ExerciseView{

  font-size: 10px;
  @media (min-width: 450px) {
    font-size: 12px;
  }
  @media (min-width: 1367px) {
    font-size: 16px;
  }

  padding: 1em;

  @media screen and (min-width: 1600px) {
    padding: 2em;
  }

  &--no-image{

  }

  .image-container {
    margin-bottom:2.5em;
    position: relative;

    @media screen and (min-width: 1600px) {
      margin-bottom:2em;
    }

    &__icon{
      font-size: 1.5em;
      position: absolute;
      right: 0;
      bottom: 0;
      transform: translate(-25%, 50%);
      background-color: rgba(255,255,255,0.8);
      color: black;
      border: 1px solid black;
      border-radius: 5px;
      padding: 5px;
      transition: all 0.25s;
      cursor: pointer;

      &:hover {
        transform: scale(1.2) translate(-25%, 50%);
      }

      @media screen and (min-width: 450px){
        transform: translate(25%, 50%);
        &:hover {
          transform: scale(1.2) translate(25%, 50%);
        }
      }

    }

    .image-container__img {
      max-height: 45vh;
      transition: all 0.1s;

      @media screen and (min-width: 1600px) {
        max-height: 50vh;
      }

      &--magnified {
        max-height: 100%;
      }
      //width: auto;

      //transition: all 0.25s;
      //&:hover {
      //  transform: scale(1.2);
      //}
    }
  }

  .content-container{
    margin-bottom: 1em;

    @media screen and (min-width: 1600px) {
      margin-bottom:2em;
    }

    .text-content {
      margin-bottom: 0;

      font-size: 3em;

      font-weight: 600;

      &--no-image{
        font-size: 4.5em;
      }

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

    .answer-button {
      font-size: 2em;
      font-weight: 600;

      border: 2px solid #0b5ed7;
      background-color: #fff;
      color: black;

      &.btn-danger{
        border-color: red;
      }
      &.btn-success{
        border-color: green;
        color: white;
        background-color: green;
      }
    }

  }


}
</style>