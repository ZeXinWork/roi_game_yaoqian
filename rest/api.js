import {
	GET,
	GET_LIST,
	POST,
	FILE,
	POSTBODY
} from './types.js';
import simple from './simple.js';
import * as api from './config.js';

const restResult = simple.restResult;

export const login = (params) => {
	return restResult(POST, api.LOGIN, params);
};

export const qiniuYunUpload = (params, extra) => {
	return restResult(FILE, '/', params, extra);
};

export const smsBindUserVerifyCode = (params) => {
	return restResult(POST, api.SMS_BIND_USER_VERIFY_CODE, params);
};

export const smsVerifyCode = (params) => {
	return restResult(POST, api.SMS_VERIFY_CODE, params);
};

export const checkMailVerify = (params) => {
	return restResult(POST, api.CHECK_MAIL_VERIFY, params);
};

export const checkVerify = (params) => {
	return restResult(POST, api.CHECK_VERIFY, params);
};

export const wechatMiniOpenId = (params) => {
	return restResult(POST, api.WECHAT_MINI_OPEN_ID, params);
};

export const logout = (params) => {
	return restResult(POST, api.LOGOUT, params);
};

export const areaList = (params) => {
	return restResult(GET, api.AREA_LIST, params);
};

export const gameArea = (params) => {
	return restResult(GET, api.GAME_AREA, params);
};

export const uploadToken = (params) => {
	return restResult(POST, api.UPLOAD_TOKEN, params);
};

export const fileUpload = (params) => {
	return restResult(POST, api.FIEL_UPLOAD, params);
};

export const userInfo = (params) => {
	return restResult(GET, api.USER_INFO, params);
};

export const updateUserInfo = (params) => {
	return restResult(POST, api.UPDATE_USER_INFO, params);
};

export const updateUserAvatar = (params) => {
	return restResult(POST, api.UPDATE_USER_AVATAR, params);
};

export const updateUserPassword = (params) => {
	return restResult(POST, api.UPDATE_USER_PASSWORD, params);
};

export const updateUserPhone = (params) => {
	return restResult(POST, api.UPDATE_USER_PHONE, params, {}, false);
};

export const userContactList = (params) => {
	return restResult(GET_LIST, api.USER_CONTACT_LIST, params);
};

export const addUserContact = (params) => {
	return restResult(POST, api.ADD_USER_CONTACT, params);
};

export const updateUserContact = (params) => {
	return restResult(POST, api.UPDATE_USER_CONTACT, params);
};

export const deleteUserContact = (params) => {
	return restResult(POST, api.DELETE_USER_CONTACT, params);
};

export const orderList = (params) => {
	return restResult(GET_LIST, api.ORDER_LIST, params);
};

export const order = (params) => {
	return restResult(POST, api.ORDER, params);
};

export const advertList = (params) => {
	return restResult(GET_LIST, api.ADVERT_LIST, params);
};

export const addAdvert = (params) => {
	return restResult(POST, api.ADD_ADVERT, params);
};

export const updateAdvert = (params) => {
	return restResult(POST, api.UPDATE_ADVERT, params);
};

export const batchdeleteAdvert = (params) => {
	return restResult(POST, api.BATCH_DELETE_ADVERT, params);
};

export const copyAdvert = (params) => {
	return restResult(POST, api.COPY_ADVERT, params);
};

export const setTopAdvert = (params) => {
	return restResult(POST, api.SET_TOP_ADVERT, params);
};

export const addUserGame = (params) => {
	return restResult(POST, api.ADD_USER_GAME, params);
};

export const userGame = (params) => {
	return restResult(GET, api.USER_GAME, params);
};

export const userGameRecordList = (params) => {
	return restResult(GET_LIST, api.USER_GAME_RECORD_LIST, params);
};

export const userGameRecord = (params) => {
	return restResult(GET, api.USER_GAME_RECORD, params);
};

export const addUserGameRecord = (params) => {
	return restResult(POST, api.ADD_USER_GAME_RECORD, params, {}, false);
};

export const userHelpRecordList = (params) => {
	return restResult(GET_LIST, api.USER_HELP_RECORD_LSIT, params);
};

export const userHelpRecord = (params) => {
	return restResult(GET, api.USER_HELP_RECORD, params);
};

export const gameKingOfKingsList = (params) => {
	return restResult(GET_LIST, api.GAME_KING_OF_KINGS_LIST, params);
};
export const gameKingofKingsPrizeList = (params) => {
	return restResult(GET_LIST, api.GAME_KING_OF_KINGS_Prize_LIST, params);
};

export const gameKingOfKingsRankScore = (params) => {
	return restResult(GET, api.GAME_KING_OF_KINGS_RANK_SCORE, params);
};

export const deleteGameRule = (params) => {
	return restResult(POST, api.DELETE_GAME_RULE, params);
};

export const exchangeGame = (params) => {
	return restResult(GET, api.EXCHANGE_GAME, params);
};

export const gameRuleList = (params) => {
	return restResult(GET_LIST, api.GAME_RULE_LIST, params);
};

export const gameRule = (params) => {
	return restResult(GET, api.GAME_RULE, params);
};

export const gameAward = (params) => {
	return restResult(GET, api.GAME_AWARD, params);
};

export const gameBackgrounds = (params) => {
	return restResult(GET_LIST, api.GAME_BACKGROUNDS, params);
};

export const gameBackgroundList = (params) => {
	return restResult(GET, api.GAME_BACKGROUND_LIST, params);
};

export const gameBackground = (params) => {
	return restResult(GET, api.GAME_BACKGROUND, params);
};

export const gameContactList = (params) => {
	return restResult(GET, api.GAME_CONTACT_LIST, params);
};

export const gameContact = (params) => {
	return restResult(GET, api.GAME_CONTACT, params);
};

export const addGameContact = (params) => {
	return restResult(POST, api.ADD_GAME_CONTACT, params);
};

export const updateGameContact = (params) => {
	return restResult(GET, api.UPDATE_GAME_CONTACT, params);
};

export const deleteGameContact = (params) => {
	return restResult(GET, api.DELETE_GAME_CONTACT, params);
};

export const addGame = (params) => {
	return restResult(POST, api.ADD_GAME, params);
};

export const closeGame = (params) => {
	return restResult(GET, api.CLOSE_GAME, params);
};

export const createGamePhone = (params) => {
	return restResult(POST, api.CREATE_GAME_PHONE, params, {}, false);
};

export const progressGameList = (params) => {
	return restResult(GET_LIST, api.PROGRESS_GAME_LIST, params);
};

export const gameList = (params) => {
	return restResult(GET_LIST, api.GAME_LSIT, params);
};

export const game = (params) => {
	return restResult(GET, api.GAME, params);
};



export const gameRecentSettingList = (params) => {
	return restResult(GET, api.GAME_RECENT_SETTING_LIST, params);
};

export const gameRecentSetting = (params) => {
	return restResult(GET, api.GAME_RECENT_SETTING, params);
};

export const gameWinResult = (params) => {
	return restResult(GET, api.GAME_WIN_RESULT, params);
};

export const updateGamePrizeMethod = (params) => {
	return restResult(POST, api.UPDATE_GAME_PRIZE_METHOD, params);
};

export const updateGameRegion = (params) => {
	return restResult(POST, api.UPDATE_GAME_REGION, params);
};

export const gameSetting = (params) => {
	return restResult(GET, api.GAME_SETTING, params);
};

export const addGameSetting = (params) => {
	return restResult(POST, api.ADD_GAME_SETTING, params);
};

export const updateGameSetting = (params) => {
	return restResult(POST, api.UPDATE_GAME_SETTING, params);
};

export const statisticsAllGameList = (params) => {
	return restResult(GET, api.STATISTICS_ALL_GAME_LIST, params);
};

export const statisticsGame = (params) => {
	return restResult(GET, api.STATISTICS_GAME, params);
};

export const statisticsWinGame = (params) => {
	return restResult(GET, api.STATISTICS_WIN_GAME, params);
};

export const statisticsAllGame = (params) => {
	return restResult(GET, api.STATISTICS_ALL_GAME, params);
};

export const statisticsGameList = (params) => {
	return restResult(GET, api.STATISTICS_GAME_LIST, params);
};

export const gamePrizeList = (params) => {
	return restResult(GET_LIST, api.GAME_PRIZE_LIST, params);
};

export const addGamePrize = (params) => {
	return restResult(POST, api.ADD_GAME_PRIZE, params);
};

export const updateGamePrize = (params) => {
	return restResult(POST, api.UPDATE_GAME_PRIZE, params);
};

export const deleteGamePrize = (params) => {
	return restResult(POST, api.DELETE_GAME_PRIZE, params);
};

export const addGamePrizeVerify = (params) => {
	return restResult(POST, api.ADD_GAME_PRIZE_VERIFY, params);
};

export const exchangeGamePrizeList = (params) => {
	return restResult(GET_LIST, api.EXCHANGE_GAME_PRIZE_LIST, params);
};

export const exchangeGamePrize = (params) => {
	return restResult(GET, api.EXCHANGE_GAME_PRIZE, params);
};

export const addExchangeGamePrize = (params) => {
	return restResult(POST, api.ADD_EXCHANGE_GAME_PRIZE, params);
};

export const addGameHelp = (params) => {
	return restResult(POST, api.ADD_GAME_HELP, params, {}, false);
};

export const verifyGameHelp = (params) => {
	return restResult(POST, api.VERIFY_GAME_HELP, params);
};

export const gameProductList = (params) => {
	return restResult(GET_LIST, api.GAME_PRODUCT_LIST, params);
};

export const gameProduct = (params) => {
	return restResult(GET, api.GAME_PRODUCT, params);
};

export const addGameProduct = (params) => {
	return restResult(POST, api.ADD_GAME_PRODUCT, params);
};

export const payGameProduct = (params) => {
	return restResult(POST, api.PAY_GAME_PRODUCT, params);
};

export const prizeList = (params) => {
	return restResult(GET_LIST, api.PRIZE_LIST, params);
};

export const prize = (params) => {
	return restResult(GET, api.PRIZE, params);
};

export const propretaryInfomationList = (params) => {
	return restResult(GET_LIST, api.PROPRIETARY_INFOMATION_LIST, params);
};

export const updatePropretaryInfomation = (params) => {
	return restResult(POST, api.UPDATE_PROPRIETARY_INFOMATION, params);
};



export const refundBillList = (params) => {
	return restResult(GET_LIST, api.REFUND_BILL_LIST, params);
};

export const addRefundBill = (params) => {
	return restResult(POST, api.ADD_REFUND_BILL, params);
};

export const refundBill = (params) => {
	return restResult(GET, api.REFUND_BILL, params);
};

export const auditContentResult = (params) => {
	return restResult(GET, api.AUDIT_CONTENT_RESULT, params);
};

export const auditImageResult = (params) => {
	return restResult(GET, api.AUDIT_IMAGE_RESULT, params);
};

export const apiGetGameInfo = (params) => {
	return restResult(GET, api.GET_GAME_INFO, params, {}, false);
};

export const apiGetMinSetting = (params) => {
	return restResult(GET, api.GET_MIN_SETTING, params);
};

export const apiSetUserLocation = (params) => {
	return restResult(GET, api.SET_USER_LOCATION, params);
};

export const apiGetAdvert = (params) => {
	return restResult(GET, api.GAME_ADVERT, params);
};

export const apiGetPrizeSetting = (params) => {
	return restResult(GET, api.GET_GAME_PRIZE_SETTING, params);
};

export const prizeGameList = (params) => {
	return restResult(GET, api.PRIZE_GAME_LIST, params);
};

export const apiShareQrCode = (params) => {
	return restResult(GET, api.SHARE_QRCODE, params);
};
export const apiKingOfKingPrize = (params) => {
	return restResult(GET, api.KING_OF_KING_PRIZE, params);
};
export const apiGetMiniQrcode = (params) => {
	return restResult(GET, api.GET_MINI_QRCODE, params);
};

export const userLogin = (params) => {
	return restResult(POSTBODY, api.USER_LOGIN, params);
}

//手机号解密
export const getPhone = (params) => {
	return restResult(POSTBODY, api.USER_PHONE, params)
}

//获取当前游戏信息
export const gameInfo = (params) => {
	return restResult(GET, api.GAME_INFO, params);
}

//获取当前游戏次数
export const gameNumber = (params) => {
	return restResult(GET, api.GAME_PLAY_NUMBER, params);
}

//获取游戏结果
export const gameResult = (params) => {
	return restResult(GET, api.GAME_RESULT, params);
}
