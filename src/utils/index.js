/**
 *
 * @param {*} str
 * @returns - 转化为驼峰
 */
const HorizontalFormHump = function (str) {
    if (typeof str !== 'string') return ''
    str = str.substring(0, 1).toUpperCase() + str.substring(1)
    return str.replace(/-\w/g, function (x) {
        return x.slice(1).toUpperCase()
    })
}

/**
 *
 * @param {*} list
 * @returns 处理muenList
 */
export const deepList = list => {
    if (!list) return []
    return list.map(item => {
        item.icon = HorizontalFormHump(item.icon)
        if (item.children.length) {
            deepList(item.children)
        }
        return item
    })
}
