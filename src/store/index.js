import Vue from 'vue'
import Vuex from 'vuex'

import router from "@/router";
import axios from "axios";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    shortCode: '',
    shortCodeErrors: {},
    playerNameErrors: {},

    list: {
      _id: ''
    },
    player: {
      _id: '',
      name: '',
      listId: ''
    },


    activeExercise: {
      id: 'sdv45345',
      img: '',
      imgLink: 'https://images.pexels.com/photos/1819656/pexels-photo-1819656.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      question: 'Jaką nazwe nosi to zjawisko?',
      answers: [{id:1,text: 'Tęcza'},{id:2,text: 'Szron'},{id:3,text: 'Zorza polarna'},]
    },
  },
  getters: {
    // playerName(){
    //   return router.currentRoute.params.playerName || ''
    // },
    apiUrl(){
      return location.href.indexOf('localhost') === -1? 'https://api.kreator-zadan.pl' : 'http://localhost:2000'
    },
  },
  mutations: {
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
    }
  },
  actions: {
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

  },
  modules: {
  }
})
