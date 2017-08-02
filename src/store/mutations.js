import C from './constants'
var storage = weex.requireModule('storage')


export default {
    [C.store.SET_USER](state, user) {
        // console.log('设置用户信息')
        state[C.store.USER] = user
        storage.setItem(C.store.USER, JSON.stringify(user), e => { })
    },
    [C.store.SET_TOKEN](state, token) {
        state[C.store.TOKEN] = token
        storage.setItem(C.store.TOKEN, token, e => { })
    },
    [C.store.PUSH_PAGE](state) {
        state[C.store.PAGE]++
    },
    [C.store.POP_PAGE](state) {
        state[C.store.PAGE]--
    }
}