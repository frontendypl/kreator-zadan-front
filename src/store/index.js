import Vue from 'vue'
import Vuex from 'vuex'

import router from "@/router";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    shortCode: '',
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
    setList(state, list){
      state.list = {...state.list, ...list}
    },
    setPlayer(state, player){
      state.player = {...state.player, ...player}
    }
  },
  actions: {
    setShortCode(context, shortCode){
      context.commit('setShortCode', shortCode)
    },
    setList(context, list){
      context.commit('setList', list)
    },
    setPlayer(context, player){
      context.commit('setPlayer', player)
    }
  },
  modules: {
  }
})
