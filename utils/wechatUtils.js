const templateId = 'HAp4RAP9prwx7B6vIIJBwyQAMM_T0lalyUIdDIbVh6M'

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
			console.log(res, "ressssssss")
		}
	});
};

export default {
	getAuthOfSubscribeMessage,
};
