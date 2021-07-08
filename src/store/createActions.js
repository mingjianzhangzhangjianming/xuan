import * as TYPE from './actionType'
import { message } from 'antd'
import { login, userInfoMenus } from '@/http/api'
import { deepList } from '@/utils/'
import role from '@/http/auth.json'

const authList =
    JSON.parse(localStorage.getItem('role')) ||
    role.data.authorities
        .map(item => item.authority)
        .map(item => {
            if (item.indexOf('file') > -1) return 'info'
            return item.split(':')[1].split('_').join('-')
        })

export const LoginIn = (form, history, callback) => async dispatch => {
    try {
        let token = null
        const res = await login(form)
        message[['success', 'info'][res.code]]({ content: res?.msg })
        if (res.code === 0) {
            token = res.token_type + ' ' + res.access_token
            sessionStorage.setItem('token', token)
            dispatch(SetToken(token))
            history.push('/dashboard/workplace')
        }
        callback()

        const result = await userInfoMenus()
        let menu = deepList(result.data)
        menu.forEach(item => {
            if (item.path === '/system') {
                item.children = item.children.filter(_item => {
                    let pathName = _item.path.split('/').pop()
                    return authList.some(i => pathName.indexOf(i) > -1)
                })
            }
        })
        localStorage.setItem('role', JSON.stringify(authList))
        localStorage.setItem('menu', JSON.stringify(menu))
        dispatch(SetAuth({ authList, menu }))
    } catch (err) {
        console.log(authList, 'err')
    }
}

export const SetToken = value => ({ type: TYPE.LOGIN_SUCCES, value })

export const SetAuth = value => ({ type: TYPE.SET_AUTH, value })

export const LoginOut = history => ({ type: TYPE.LOGIN_OUT, history })
