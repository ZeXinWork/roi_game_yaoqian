const templateId = 'brB4ziJN4HM9hVnIhwkkp-S-WPGvkubEoGV_aTQRots'

/**
 * 一次性服务通知
 */
const getAuthOfSubscribeMessage = (handler) => {
	uni.requestSubscribeMessage({
	  tmplIds: [templateId],
	  success(res) {
		handler && handler()
	  },
	  fail(res) {
		uni.showModal({
			title: '提示',
			content: '请从右上角进入小程序设置，检查是否已开启接收订阅消息',
			showCancel: false
		})
	  }
	});
};

export default {
	getAuthOfSubscribeMessage,
};