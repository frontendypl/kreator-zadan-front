import Vue from 'vue'
import Vuex from 'vuex'

import router from "@/router";
import axios from "axios";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    answerLoader: false,
    shortCode: '',
    shortCodeErrors: {},
    playerNameErrors: {},
    list: {},
    player: {},
    exercise: {},
    wrongAnswer: false,
  },
  getters: {
    apiUrl(){
      return location.href.indexOf('localhost') === -1? 'https://api.kreator-zadan.pl' : 'http://localhost:2000'
    },
  },
  mutations: {
    setAnswerLoader(state, payload){
      state.answerLoader = payload
    },
    setShortCode(state, shortCode){
      state.shortCode = shortCode
    },
    setShortCodeErrors(state, errors){
      state.shortCodeErrors = {...errors}
    },
    setPlayerNameErrors(state, errors){
      state.playerNameErrors = {...errors}
    },
    setList(state, list){
      state.list = {...state.list, ...list}
    },
    setPlayer(state, player){
      state.player = {...state.player, ...player}
    },
    getExercise(state, exercise){
      state.exercise = {...exercise}
    },
    setWrongAnswer(state, payload){
      state.wrongAnswer = payload
    },

    clearExercise(state){
      state.exercise = {}
    },
    clearList(state){
      state.list = {}
    },
    clearPlayer(state){
      state.player = {}
    },
  },
  actions: {
    /**
     *
     * @param state
     * @param {Boolean} payload
     */
    setAnswerLoader(state, payload){
      state.answerLoader = payload
    },
    /**
     * Set shortcode from input or URL
     * @param commit
     * @param {string} shortCode
     */
    setShortCode({commit}, shortCode){
      commit('setShortCode', shortCode)
    },
    /**
     * get list data from API using shortcode
     * @param commit
     */
    async getList({commit, dispatch, state, getters}){
      // commit('clearList')
      commit('setShortCodeErrors', {})

      try{
        const response = await axios.post(`${getters.apiUrl}/lists/validation`,{
          shortCode: state.shortCode
        })
        console.log({response})
        commit('setList', response.data)

      }catch (e) {
        console.log(e.response.data)
        commit('setShortCodeErrors', e.response.data.errors)
      }
    },

    async setPlayer({commit, state, getters}, playerName){
      // commit('clearPlayer')
      commit('setPlayerNameErrors', {})

      try{
        const response = await axios.post(`${getters.apiUrl}/players`,{
          name: playerName,
          listId: state.list._id
        })
        commit('setPlayer', response.data)
      }catch (e) {
        console.log(e)
        commit('setPlayerNameErrors', e.response.data.errors)
      }
    },

    async getExercise({commit, state, getters}){
      // commit('clearExercise')
      console.log(state.exercise)

      try{
        const response = await axios.get(`${getters.apiUrl}/lists/${state.list._id}/${state.player._id}/exercises`)

        if(response.data.completed){
          console.log('completed')
          return router.push({name: 'ResultView'})
        }

        commit('getExercise', response.data)

      }catch (e) {
        console.log(e)
      }
    },

    /**
     *
     * @param state
     * @param commit
     * @param dispatch
     * @param getters
     * @param {Object} answerOption
     * @return {Promise<void>}
     */
    async postAnswer({state, commit, dispatch, getters}, {answerOption}){

      try {
        commit('setAnswerLoader', true)
        commit('setWrongAnswer',false)
        const response = await axios.post(`${getters.apiUrl}/answers`,{
          isCorrect: answerOption.isCorrect,
          list: state.list._id,
          player: state.player._id,
          exercise: state.exercise.content._id,
          answerOption: answerOption._id
        })
        console.log(response.data)
        if(response.data.isCorrect){
          dispatch('getExercise')
        }else{
          commit('setWrongAnswer',true)
        }
        commit('setAnswerLoader', false)
      }catch (e) {
        console.log(e)
      }

    }

  },
  modules: {
  }
})
