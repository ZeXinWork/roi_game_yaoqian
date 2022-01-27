// 基础地址
// export const BASE_URL = 'https://bobing.roi-cloud.com';
// 测试

let domainUrl = ""
let trackUrl = ""
if (process.env.NODE_ENV === 'development') {
	// 测试环境
	domainUrl = "https://game0.roi-cloud.com";
	trackUrl = "https://pay0.roi-cloud.com"
} else {
	// 正式环境
	domainUrl = "https://game.roi-cloud.com";
	trackUrl = "https://pay.roi-cloud.com"
}
export const BASE_URL = domainUrl;

export const TRACK_URL = trackUrl;

export const QINIU_UPLOAD_URL = 'https://up.qiniup.com';

export const QIU_DOMAIN_URL = 'https://static.roi-cloud.com';

// 地址

export const AREA_LIST = '/Api/Common/Area/getArea';

export const GAME_AREA = '/Api/Common/Game/Game/getGameArea';


// commmon 发送验证码

export const SMS_BIND_USER_VERIFY_CODE = '/Api/Common/VerifyCode/smsBindUserVerifyCode'

export const SMS_VERIFY_CODE = '/Api/Common/VerifyCode/smsVerifyCode'

// 登录注册

export const CHECK_MAIL_VERIFY = '/Api/user/auth/checkMailVerify'

export const CHECK_VERIFY = '/Api/user/auth/checkVerify'

export const WECHAT_MINI_OPEN_ID = '/Api/User/Auth/getWechatMiniOpenId'

export const LOGIN = '/Api/User/Auth/loginByWechatMiniCode'

export const LOGOUT = '/Api/user/auth/logout'


// 文件上传

export const UPLOAD_TOKEN = '/Api/User/FileUpload/getAppUploadToken'

export const FIEL_UPLOAD = '/Api/User/FileUpload/upload'

// 用户信息
export const USER_INFO = '/Api/User/User/UserInfo/getInfo'

export const UPDATE_USER_INFO = '/Api/User/User/UserInfo/updateAccount'

export const UPDATE_USER_AVATAR = '/Api/User/User/UserInfo/updateAvatar'

export const UPDATE_USER_PASSWORD = '/Api/User/User/UserInfo/updatePassword'

export const UPDATE_USER_PHONE = '/Api/User/User/UserInfo/updatePhone'

// 用户联系方式
export const USER_CONTACT_LIST = '/Api/User/User/UserContactWay/getList'

export const ADD_USER_CONTACT = '/Api/User/User/UserContactWay/add'

export const UPDATE_USER_CONTACT = '/Api/User/User/UserContactWay/update'

export const DELETE_USER_CONTACT = '/Api/User/User/UserContactWay/delete'

// 付费订单

export const ORDER_LIST = '/Api/User/Game/GamePayOrder/getList'

export const ORDER = '/Api/User/Game/GamePayOrder/getOne'

// 自定义广告

export const ADVERT_LIST = '/Api/User/Game/Advert/GameAdvert/getList'

export const ADD_ADVERT = '/Api/User/Game/Advert/GameAdvert/add'

export const UPDATE_ADVERT = '/Api/User/Game/Advert/GameAdvert/update'

export const BATCH_DELETE_ADVERT = '/Api/User/Game/Advert/GameAdvert/batchDelete'

export const COPY_ADVERT = '/Api/User/Game/Advert/GameAdvert/copy'

export const SET_TOP_ADVERT = '/Api/User/Game/Advert/GameAdvert/updateTop'

// 游戏数据

export const ADD_USER_GAME = '/Api/User/User/UserPlayGame/add'

export const USER_GAME = '/Api/User/User/UserPlayGame/getOne'

// 游戏记录

export const USER_GAME_RECORD_LIST = '/Api/User/User/UserPlayGameRecord/getList'

export const USER_GAME_RECORD = '/Api/User/User/UserPlayGameRecord/getOne'

export const ADD_USER_GAME_RECORD = '/Api/User/User/UserPlayGameRecord/add'

// 用户主力记录

export const USER_HELP_RECORD_LSIT = '/api/relay/friend'

export const USER_HELP_RECORD_MY_LSIT = '/api/relay/my'

export const USER_HELP_RECORD = '/Api/User/User/UserHelpRecord/getOne'

// 王中王排行榜

export const GAME_KING_OF_KINGS_LIST = '/Api/Common/Game/Game/getKingOfKingsPointsList'
export const GAME_KING_OF_KINGS_Prize_LIST = '/Api/Common/Game/Game/getKingOfKingsPrizeList'

export const GAME_KING_OF_KINGS_RANK_SCORE = '/Api/User/Game/KingOfKings/KingOfKings/getRankScore'

// 游戏规则

export const DELETE_GAME_RULE = '/Api/User/Game/Rule/Rule/delete'

export const EXCHANGE_GAME = '/Api/User/Game/Points/Points/getExchange'

export const GAME_RULE_LIST = '/Api/User/Game/Rule/Rule/getList'

export const GAME_RULE = '/Api/User/Game/Rule/Rule/getOne'

export const GAME_AWARD = '/Api/User/Game/Points/Points/getWin'

// 游戏背景图片

export const GAME_BACKGROUNDS = '/Api/User/Game/GameBackground/getAll'

export const GAME_BACKGROUND_LIST = '/Api/User/Game/GameBackground/getList'

export const GAME_BACKGROUND = '/Api/User/Game/GameBackground/getOne'

// 游戏联系方式设置

export const GAME_CONTACT_LIST = '/Api/User/Game/Contact/ContactWay/getList'

export const GAME_CONTACT = '/api/user/prizeContact'

export const ADD_GAME_CONTACT = '/Api/User/Game/Contact/ContactWay/add'

export const UPDATE_GAME_CONTACT = '/Api/User/Game/Contact/ContactWay/update'

export const DELETE_GAME_CONTACT = '/Api/User/Game/Contact/ContactWay/delete'

// 游戏管理

export const ADD_GAME = '/Api/User/Game/Operate/Game/add'

export const CLOSE_GAME = '/Api/User/Game/Operate/Game/close'

export const CREATE_GAME_PHONE = '/Api/User/Game/Operate/Game/createGameSetPhone'

export const PROGRESS_GAME_LIST = '/Api/User/Game/Operate/Game/getGameInProgressList'

export const GAME_LSIT = '/Api/User/Game/Operate/Game/getList'

export const GAME = '/Api/User/Game/Operate/Game/getOne'

export const GAME_RECENT_SETTING_LIST = '/Api/User/Game/Operate/Game/getRecentGameList'

export const GAME_RECENT_SETTING = '/Api/User/Game/Operate/Game/getRecentGamePrizeSetting'

export const GAME_WIN_RESULT = '/Api/User/Game/Operate/Game/getWinResult'

export const UPDATE_GAME_RESULT = '/Api/User/Game/Operate/Game/update'

export const UPDATE_GAME_PRIZE_METHOD = '/Api/User/Game/Operate/Game/updatePrizeMethod'

export const UPDATE_GAME_REGION = '/Api/User/Game/Operate/Game/updateRegion'

// 游戏概率

export const GAME_SETTING = '/Api/User/Game/Operate/GameSetting/getOne'

export const ADD_GAME_SETTING = '/Api/User/Game/Operate/GameSetting/add'

export const UPDATE_GAME_SETTING = '/Api/User/Game/Operate/GameSetting/update'

// 游戏统计

export const STATISTICS_ALL_GAME_LIST = '/Api/User/Statistics/Game/allGameList'

export const STATISTICS_GAME = '/Api/User/Statistics/Game/countMyGame'

export const STATISTICS_WIN_GAME = '/Api/User/Statistics/Game/countWinGame'

export const STATISTICS_ALL_GAME = '/Api/User/Statistics/Game/countAllGame'

export const STATISTICS_GAME_LIST = '/Api/User/Statistics/Game/myGameList'

// 游戏奖品

export const GAME_PRIZE_LIST = '/Api/User/Game/Prize/Setting/getList'

export const ADD_GAME_PRIZE = '/Api/User/Game/Prize/Setting/add'

export const DELETE_GAME_PRIZE = '/Api/User/Game/Prize/Setting/delete'

export const UPDATE_GAME_PRIZE = '/Api/User/Game/Prize/Setting/update'

// 游戏奖品核销

export const ADD_GAME_PRIZE_VERIFY = '/Api/User/Game/Prize/Verify/add'

// 游戏奖品兑换

export const EXCHANGE_GAME_PRIZE_LIST = '/api/gameAward/index'

export const EXCHANGE_GAME_PRIZE = '/Api/User/Game/Prize/Exchange/getOne'

export const ADD_EXCHANGE_GAME_PRIZE = '/api/game/redeem'

// 游戏助力

export const ADD_GAME_HELP = '/api/relay/help' // 助力

export const INVITE_GAME_HELP = '/api/invite/add' // 获取邀请码

export const INVITE_INFO_GAME_HELP = '/api/invite/info' // 获取邀请码信息

// export const VERIFY_GAME_HELP = '/Api/User/Game/Help/Help/verify'
export const VERIFY_GAME_HELP = '/Api/Common/Game/Game/verify'

// 游戏付费产品查询

export const GAME_PRODUCT_LIST = '/Api/User/Product/PaidProduct/getList'

export const GAME_PRODUCT = '/Api/User/Product/PaidProduct/getOne'

export const ADD_GAME_PRODUCT = '/Api/User/Product/PaidProduct/add'

export const PAY_GAME_PRODUCT = '/Api/User/Product/PaidProduct/pay'

// 奖品管理

export const PRIZE_LIST = '/api/user/prize'

export const PRIZE = '/Api/User/User/UserPrize/getOne'

// 商户专有信息设置

export const PROPRIETARY_INFOMATION_LIST = '/Api/User/User/proprietaryInformation/getList'

export const UPDATE_PROPRIETARY_INFOMATION = '/Api/User/User/proprietaryInformation/update'

// 退款申请

export const REFUND_BILL_LIST = '/Api/User/Bill/RefundBill/getList'

export const ADD_REFUND_BILL = '/Api/User/Bill/RefundBill/add'

export const REFUND_BILL = '/Api/User/Bill/RefundBill/getOne'

// 阿里云内容审计

export const AUDIT_CONTENT_RESULT = '/Api/User/Game/Audit/Audit/getContentResult'

export const AUDIT_IMAGE_RESULT = '/Api/User/Game/Audit/Audit/getImageResult'

// 获取游戏信息

export const GET_GAME_INFO = '/api/game/info'
export const GET_MIN_SETTING = '/Api/Common/SystemConfig/getMiniSetting'

// 获取用户地址
export const SET_USER_LOCATION = '/api/user/map'


// 广告
export const GAME_ADVERT = '/Api/Common/Game/Game/getAdvert'
export const GET_GAME_PRIZE_SETTING = '/Api/User/Game/Operate/Game/getGamePrizeSetting'

// 中奖

export const PRIZE_GAME_LIST = '/Api/User/User/UserPrize/getPrizeGameList'

export const SHARE_QRCODE = '/Api/User/Game/Operate/Game/shareQrCode'

export const KING_OF_KING_PRIZE = '/Api/User/Game/KingOfKings/KingOfKingsUserPrize/getOne'

export const GET_MINI_QRCODE = '/Api/User/Game/Operate/Game/getGameMiniQrcode'

//登录
export const USER_LOGIN = '/api/user/auth'

//手机号登录
export const USER_PHONE = '/api/user/update'

//当前游戏信息
export const GAME_INFO = '/api/game/info'

//获取游戏可玩次数
export const GAME_PLAY_NUMBER = '/api/game/playTime'

//获取游戏结果
export const GAME_RESULT = '/api/game/play'

//获取中奖明细
export const PRIZE_DETAIL = '/api/integrals/win'

//兑奖明细
export const CASH_DETAIL = '/api/integrals/expend'

//获取我的游戏列表
export const MY_GAME = '/api/game/index'

//获取我的游戏列表详情
export const MY_GAME_LIST = '/api/game/index'

//获取用户协议
export const ARG = '/api/user/privacy'

//获取排行榜信息
export const GET_RANK = '/api/game/ranking'

//获取排行榜开奖结果
export const GET_FINAL_RANK = '/api/game/userFinalRanking'

export const GET_MY_RANK = '/api/user/ranking'

// 小程序通知开关
export const WECHAT_MESSAGE = '/api/subscribe/index'

//获取相关兑奖信息
export const GET_CASH_LIST = '/api/game/redeemlog'

export const GET_RAIN_SET = '/api/extra/red'

export const ADD_RAIN_SCORE = '/api/extra/update'

// =============================================
// 数据上传
export const TRACK_LOG = '/track'
