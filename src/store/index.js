import { createStore } from 'vuex'
import charactersModule from "./charactersModule"
import episodesModule from './episodesModule'


export default createStore({
  modules: {
    charactersModule,
    episodesModule,
  }
})
