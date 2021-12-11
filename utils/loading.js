const show = (title = "加载中...") => {
	return uni.showLoading({
		title,
		mask: true,
	});
};

const hide = () => {
	return uni.hideLoading();
};

export default {
	show,
	hide,
};