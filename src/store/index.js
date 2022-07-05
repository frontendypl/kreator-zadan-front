import Vue from 'vue'
import Vuex from 'vuex'

import router from "@/router";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
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
    // listId(){
    //   return router.currentRoute.params.listId || ''
    // },
    apiUrl(){
      return location.href.indexOf('localhost') === -1? 'https://api.kreator-zadan.pl' : 'http://localhost:2000'
    },
  },
  mutations: {
    setPlayer(state, player){
      state.player = {...state.player, ...player}
    }
  },
  actions: {
    setPlayer(context, player){
      context.commit('setPlayer', player)
    }
  },
  modules: {
  }
})
