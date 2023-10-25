import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate';

export default  createStore({
    state () {
      return {
        username: '',
        token: '',
          id:'',
      }
    },
    mutations: {
      update (state,input) {
        state.username = input.username;
        state.token = input.token;
        state.id= input.id
      }
    },
    plugins: [createPersistedState()]
})