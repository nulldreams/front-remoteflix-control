import Vuex from 'vuex'
import mutations from './mutations'

const createStore = () => {
  return new Vuex.Store({
    state: {
      socket: undefined,
      server: 'https://6bcaec2f.ngrok.io',
      genres: undefined,
      shows: undefined
    },
    mutations
  })
}

export default createStore