import * as TYPE from '../actionType'

const initState = {
    token: sessionStorage.getItem('token'),
    menu: JSON.parse(localStorage.getItem('menu')) || [],
    authList: JSON.parse(localStorage.getItem('role')) || []
}

export default function auth(state = initState, action) {
    switch (action.type) {
        case TYPE.LOGIN_SUCCES:
            sessionStorage.setItem('token', action.value)
            return { ...state, token: action.value }
        case TYPE.SET_AUTH:
            return { ...state, ...action.value }
        case TYPE.LOGIN_OUT:
            sessionStorage.removeItem('token')
            action.history.replace('/')
            return { ...state, token: null }
        default:
            return state
    }
}
