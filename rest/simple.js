import { GET_LIST, GET, POST, FILE, POSTBODY } from './types.js'
import * as api from './config.js'
import storage from '@/utils/storage.js'
import toast from '@/utils/toast.js'
import Vue from 'vue'

let accountFlag = true

const restResult = (type, url, params = {}, extra = {}, showTips = true) => {
  let user = storage.getUser()
  if (user.user_token) {
    params.user_token = user.user_token
  }
  return fetchResponse(type, url, params, extra, showTips)
}

const fetchResponse = (type, url, params, extra, showTips) => {
  let fullUrl = api.BASE_URL + url
  switch (type) {
    case GET_LIST:
      return getRequest(type, fullUrl, params, showTips)
    case GET:
      return getRequest(type, fullUrl, params, showTips)
    case POST:
      return postRequest(type, fullUrl, params, showTips)
    case FILE:
      return fileRequest(type, fullUrl, params, extra, showTips)
    case POSTBODY:
      return postWithBodyRequest(type, fullUrl, params, showTips)
    default:
      throw new Error(`unsupport type ${type}`)
  }
}

const getRequest = (type, url, params, showTips) => {
  return new Promise((resolve, reject) => {
    uni.request({
      url: url,
      data: params,
      method: 'GET',
      dataType: 'json',
      success: function (response) {
        formatResponse(response, type, resolve, reject, showTips)
      },
      fail: function (error) {
        //fetchError(error);
        reject(error)
      },
    })
  })
}

const postRequest = (type, url, params, showTips) => {
  return new Promise((resolve, reject) => {
    uni.request({
      url: url,
      data: params,
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      method: 'POST',
      dataType: 'json',
      success: function (response) {
        formatResponse(response, type, resolve, reject, showTips)
      },
      fail: function (error) {
        //fetchError(error);
        reject(error)
      },
    })
  })
}

const postWithBodyRequest = (type, url, params, showTips) => {
  return new Promise((resolve, reject) => {
    uni.request({
      url: url,
      data: params,
      header: {
        'content-type': 'application/json',
      },
      method: 'POST',
      dataType: 'json',
      success: function (response) {
        formatResponse(response, type, resolve, reject, showTips)
      },
      fail: function (error) {
        //fetchError(error);
        reject(error)
      },
    })
  })
}

const fileRequest = (type, url, params, extra, showTips) => {
  return new Promise((resolve, reject) => {
    uni.uploadFile({
      url: url,
      formData: params,
      filePath: extra.filePath,
      name: extra.name,
      header: {
        'Content-Type': 'multipart/form-data',
      },
      success: function (response) {
        return formatResponse(response, type, resolve, reject, showTips)
      },
      fail: function (error) {
        //fetchError(error);
        reject(error)
      },
    })
  })
}

const formatResponse = (response, type, resolve, reject, showTips) => {
  if (response.statusCode) {
    let { data } = response
    if (response.statusCode == 200) {
      if (data.errno === '100013') {
        uni.showToast({
          title: '登录过期!',
          icon: 'none',
        })
        uni.removeStorageSync('user')
        uni.removeStorageSync('gameSetting')
        uni.removeStorageSync('gameTemplate')
      }
      switch (type) {
        case GET_LIST:
          if (data.errno !== '0') {
            resolve(data)
            return
          }
          resolve(data.data)
        case GET:
          if (data.errno !== '0') {
            resolve(data)
            return
          }

          resolve(data.data)
        case POST:
          if (data.errno !== '0') {
            resolve(data)
            return
          }
          resolve(data.data)
        case FILE:
          if (isJSON(data) && JSON.parse(data).errno !== '0') {
            data = typeof data === 'string' ? JSON.parse(data) : data
            resolve(data)
            return
          }

          data = typeof data === 'string' ? JSON.parse(data) : data
          resolve(data.data)
		  case POSTBODY:
		    if (data.errno !== '0') {
		      resolve(data)
		      return
		    }
		    resolve(data.data)
        default:
          resolve(data)
      }
    } else if (response.statusCode == 400) {
      if (showTips) {
        setTimeout(() => {
          uni.hideLoading()
          uni.showToast({
            title: response.data.msg || '出错啦～',
            icon: 'none',
          })
        }, 600)
      }

      reject(data)
    } else if (response.statusCode == 403005) {
      if (accountFlag) {
        uni.hideLoading()
        accountFlag = false
        this.$storage.clearUser()
        uni.showToast({
          title: response.data.msg || '出错啦～',
          icon: 'none',
        })
      }
      reject(data)
    } else {
      if (showTips) {
        setTimeout(() => {
          uni.hideLoading()
          uni.showToast({
            title: response.data.msg || '出错啦～',
            icon: 'none',
          })
        }, 600)
      }
      reject(data)
    }
  } else {
    reject('服务器出现错误')
  }
}
const isJSON = (str) => {
  if (typeof str == 'string') {
    try {
      const obj = JSON.parse(str)
      if (typeof obj == 'object' && obj) {
        return true
      } else {
        return false
      }
    } catch (e) {
      return false
    }
  }
}
export default {
  restResult,
}
