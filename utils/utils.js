/**
 *
 * @param {*} index  变量名
 * @param {*} value  变量值
 */
export const emitDataPrevpage = (index, value) => {
  const pages = getCurrentPages()
  const prevPage = pages[pages.length - 2]
  prevPage[index] = value
}

/**
 *
 * @param {*} index 变量名
 * @returns 返回变量值
 */
export const acceptDataPrevpage = (index) => {
  const pages = getCurrentPages()
  const prevPage = pages[pages.length - 1]
  return prevPage[index]
}

//清除数组里的空值
export const cleanArray = (target) => {
  if (Array.isArray(target)) {
    const res = target.reduce((pre, cur) => {
      if (!isVoid(cur)) {
        pre.push(cur)
      }
      return pre
    }, [])
    return res
  } else {
    return []
  }
}

//判断空值
export const isVoid = (value) => {
  const res =
    value === undefined ||
    value === null ||
    value === '' ||
    (value instanceof Array && cleanArray(value).length === 0)

  return res
}

//清除对象中的空值
export const cleanObject = (object) => {
  const result = { ...object } //深度克隆，不改变元对象
  Object.keys(result).forEach((key) => {
    //删除对象值为false的值
    if (isVoid(result[key])) {
      delete result[key]
    }
  })
  return result
}

/**
 * 获取游戏状态
 */
export const getGameStatus = (status) => {
	const orderStatus = {
	  1: '待设置',
	  2: '待开始',
	  3: '进行中',
	  4: '兑奖中',
	  5: '领奖中',
	  6: '已结束',
	  7: '已下架',
	}
	return orderStatus[Number(status)] || ''
}