<script>
export default {
  onLaunch: function () {
    console.log('App Launch')
    // 获取手机系统信息
    const info = uni.getSystemInfoSync()
    const options = uni.getLaunchOptionsSync()
    this.$storage.set("options", options)
    // 设置状态栏高度（H5顶部无状态栏小程序有状态栏需要撑起高度）
    this.globalData.statusBarHeight = info.statusBarHeight
    // 除了h5 app mp-alipay的情况下执行
    // #ifndef H5 || APP-PLUS || MP-ALIPAY
    // 获取胶囊的位置
    const menuButtonInfo = uni.getMenuButtonBoundingClientRect()
    // (胶囊底部高度 - 状态栏的高度) + (胶囊顶部高度 - 状态栏内的高度) = 导航栏的高度
    this.globalData.navBarHeight =
      menuButtonInfo.bottom -
      info.statusBarHeight +
      (menuButtonInfo.top - info.statusBarHeight)
    this.globalData.windowWidth = menuButtonInfo.left
    // #endif
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  },
  globalData: {
    statusBarHeight: 20 /* 状态栏高度 */,
    navBarHeight: 45 /* 导航栏高度 */,
    windowWidth: 375 /* 窗口宽度 */,
  },
}
</script>

<style>
/*每个页面公共css */
</style>
