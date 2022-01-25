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
	  fail(res) {}
	});
};

export default {
	getAuthOfSubscribeMessage,
};