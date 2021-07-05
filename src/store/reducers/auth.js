import * as TYPE from '../actionType'
import role from '@/http/auth.json'
const authorities = role.data.authorities.map(item => item.authority)
const initState = {
    token: sessionStorage.getItem('token'),
    menu: [],
    authList: authorities
}

export default function auth(state = initState, action) {
    switch (action.type) {
        case TYPE.LOGIN_SUCCES:
            sessionStorage.setItem('token', action.value)
            return { ...state, token: action.value }
        default:
            return state
    }
}
