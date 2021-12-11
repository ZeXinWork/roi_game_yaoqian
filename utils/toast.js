const show = (title, duration = 2000) => {
	return uni.showToast({
		title,
		position: "center",
		duration,
		mask: true,
	});
};

const error = (title, duration = 2000) => {
	return uni.showToast({
		title,
		position: "center",
		duration,
		icon: "none",
		mask: true,
	});
};

export default {
	show,
	error
};