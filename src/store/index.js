import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userName: '',
    listId: '',
    activeExercise: {
      id: '',
      img: '',
      imgLink: '',
      answers: ''
    },
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
