import { createStore } from "vuex";

const store = createStore({
    state(){
        return{
            isAuthenticated:false,
            access_token:null
        }
    },
    getters:{
        isAuthenticated(state){
            return state.isAuthenticated
        },
        accessToken(state){
            return state.access_token
        }
    },
    mutations:{
        setAccessToken(state, payload){
            state.access_token = payload.newToken
        }
    }
})

export default store