const set = (key, value) => {
  try {
    uni.setStorageSync(key, value)
  } catch (e) {}
}

const get = (key) => {
  try {
    return uni.getStorageSync(key)
  } catch (e) {
    return false
  }
}

const clear = (key) => {
  try {
    return uni.removeStorageSync(key)
  } catch (e) {
    return false
  }
}

const getUser = () => {
  try {
    const value = get('user')
    return JSON.parse(value) || {}
  } catch (e) {
    return {}
  }
}

const setUser = (user) => {
  set('user', JSON.stringify(user))
}

const clearUser = () => {
  clear('user')
}

const getGameSetting = () => {
  try {
    const value = get('gameSetting')
    return JSON.parse(value) || {}
  } catch (e) {
    return {}
  }
}

const setGameSetting = (gameSetting) => {
  set('gameSetting', JSON.stringify(gameSetting))
}

const clearGameSetting = () => {
  clear('gameSetting')
}

const getVipGame = () => {
  try {
    const value = get('vipGame')
    return JSON.parse(value) || {}
  } catch (e) {
    return {}
  }
}

const setVipGame = (gameSetting) => {
  set('vipGame', JSON.stringify(gameSetting))
}

const clearVipGame = () => {
  clear('vipGame')
}

export default {
  getUser,
  setUser,
  clearUser,
  get,
  set,
  getGameSetting,
  setGameSetting,
  clearGameSetting,
  getVipGame,
  setVipGame,
  clearVipGame,
  clear,
}
