/**
 *
 * @param {*} str
 * @returns - 转化为驼峰
 */
export const HorizontalFormHump = function (str) {
    if (typeof str !== 'string') return ''
    str = str.substring(0, 1).toUpperCase() + str.substring(1)
    return str.replace(/-\w/g, function (x) {
        return x.slice(1).toUpperCase()
    })
}
