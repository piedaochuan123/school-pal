import {setToken} from '@/utils/localStorage'
import {getToken} from '@/utils/localStorage'
import {getUser} from '@/utils/localStorage'
import {setUser} from '@/utils/localStorage'
const user= {
    state: {
        // user:getUser(),
        // token:getToken(),
        user:getUser(),
        token:getToken(),
        money:0
    },
    getters: {
        user:state=>state.user,
        token:state=>state.token
    },
    mutations: {
        setUser(state,user){
            state.user=user
            setUser(user)
        },
        setToken(state,token){
            state.token=token
            setToken(token)
        }
    }
}
export default user