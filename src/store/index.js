import Vuex from 'vuex'
import User from './store/user'

const store = new Vuex.Store({
    modules:{
       User:User,
    },
})

export default store