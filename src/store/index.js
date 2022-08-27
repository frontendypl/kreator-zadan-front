import Vue from 'vue'
import Vuex from 'vuex'

import router from "@/router";
import axios from "axios";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    answerLoader: false,
    appLoader: false,
    shortCode: '',
    shortCodeErrors: {},
    playerNameErrors: {},
    list: {},
    userLists: [],
    player: {},
    exercise: {},
    wrongAnswer: false,
    userAnswers: []
  },
  getters: {
    apiUrl(){
      return location.href.indexOf('localhost') === -1? 'https://pytania-api.ucze.net' : 'http://localhost:2000'
    },
    frontUrl(){
      return location.href.indexOf('localhost') === -1? 'https://pytania.ucze.net' : 'http://localhost:8081'
    },
  },
  mutations: {
    setAnswerLoader(state, payload){
      state.answerLoader = payload
    },
    setAppLoader(state, payload){
      state.appLoader = payload
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
    setUserLists(state, userLists){
      state.userLists = [...userLists]
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

    getUserAnswers(state, payload){
      state.userAnswers = payload
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
    setAnswerLoader({commit}, payload){
      commit('setAnswerLoader', payload)
    },
    setAppLoader({commit}, payload){
      commit('setAppLoader', payload)
    },
    /**
     * Set shortcode from input or URL
     * @param commit
     * @param {string} shortCode
     */
    setShortCode({state, commit}, shortCode){
      commit('setShortCode', shortCode)
      if(shortCode.slice(0,1) === 'L'){
        localStorage.setItem('shortCode', state.shortCode)
      }
    },
    /**
     * get list data from API using shortcode
     * @param commit
     */
    async getList({commit, dispatch, state, getters}){
      // commit('clearList')
      dispatch('setAppLoader', true)
      commit('setShortCodeErrors', {})

      try{
        const response = await axios.post(`${getters.apiUrl}/lists/validation`,{
          shortCode: state.shortCode
        })
        response.data.list ? commit('setList', response.data.list) : commit('setUserLists', response.data.userLists)

        dispatch('setAppLoader', false)
      }catch (e) {
        console.log(e.response.data)
        commit('setShortCodeErrors', e.response.data.errors)
        dispatch('setAppLoader', false)
      }
    },

    async setPlayer({commit, state, getters, dispatch}, playerName){
      // commit('clearPlayer')
      dispatch('setAppLoader', true)
      commit('setPlayerNameErrors', {})

      try{
        const response = await axios.post(`${getters.apiUrl}/players`,{
          name: playerName,
          listId: state.list._id
        })
        commit('setPlayer', response.data)
        localStorage.setItem('player', JSON.stringify(response.data))
      }catch (e) {
        commit('setPlayerNameErrors', e.response.data.errors)
        dispatch('setAppLoader', false)
      }
    },

    async getExercise({commit, state, getters, dispatch}){
      dispatch('setAppLoader', true)
      try{
        const response = await axios.get(`${getters.apiUrl}/lists/${state.list._id}/${state.player._id}/exercises`)

        if(response.data.completed){
          await dispatch('getUserAnswers')
          return router.push({name: 'ResultView'})
        }

        commit('getExercise', response.data)

        dispatch('setAppLoader', false)
        await router.push({name: 'ExerciseView', params: {shortCode: state.shortCode}})
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
        dispatch('setAnswerLoader', true)
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

    },
    /**
     * Return player data from last session
     * @param commit
     */
    returnPlayerSession({commit, state, dispatch}, urlShortCode){
      const shortCode = localStorage.getItem('shortCode')

      if(urlShortCode === shortCode || !urlShortCode){
        if(shortCode){
          commit('setShortCode', shortCode )
          router.push({name: 'EnterNameView', params: {shortCode: state.shortCode}})
        }
        const player = localStorage.getItem('player')
        if(player){
          commit('setPlayer', JSON.parse(player) )
        }
      }
      else{
        dispatch('clearPlayerSession')
      }

    },
    /**
     * Clear localStorage data after
     */
    clearPlayerSession(){
      localStorage.clear()
    },

   async getUserAnswers({dispatch, commit, getters, state}){

      try{
        const response = await axios.get(`${getters.apiUrl}/players/${state.player._id}/answers`)
        commit('getUserAnswers', response.data)
        dispatch('setAppLoader', false)
      }catch (e) {
        console.log(e)
      }

    }

  },
  modules: {
  }
})
