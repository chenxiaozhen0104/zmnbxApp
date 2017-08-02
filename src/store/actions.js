import { _getUser } from './fecth'
import C from './constants'
const storage = weex.requireModule('storage')



export default {
    [C.store.GET_USER]({ commit, state }) {
        return state.user
            ? Promise.resolve(state.user)
            : _getUser().then(user => commit(C.store.SET_USER, user))
    },
    [C.store.GET_TOKEN]({ commit, state }) {
        return state[C.store.TOKEN] ?
            Promise.resolve(state.user)
            : storage.getItem(m => commit(C.store.SET_TOKEN, m.data))
    },
    [C.store.GET_PAGE]({ commit, state }) {
        return state[C.store.PAGE]
    }
}