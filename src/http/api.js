import instance from './index'

/**
 *
 * @returns 获取验证码
 */
export const Captcha = () => instance.get('/file/captcha')

/**
 *
 * @returns 登陆
 */
export const login = data => instance.post('/login', data)

/**
 * @returns 获取侧边栏权限列表
 */

export const userInfoMenus = () => instance.get('/main/menu?type=pro')
