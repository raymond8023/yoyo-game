// pages/threedoors/threedoors.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    threedoors: {
      isSelect: false,
      selectOption: "",
      isAnswer: false,
    }
  },

  bindOption(e){
    if(this.data.threedoors.isAnswer){
      wx.showModal({
        content: '你已看过答案，无法修改选择！',
        showCancel: false,
      })
    }
    else{
      var tmp=this.data.threedoors
      tmp.isSelect=true
      tmp.selectOption=e.detail.value
      this.setData({
        threedoors:tmp,
      })
    }
  },

  bindAnswer(){
    if(!this.data.threedoors.isAnswer){
      if(this.data.threedoors.selectOption==""){
        wx.showModal({
          content: '你还没有选择，请先选择！',
          showCancel: false,
        })
      }
      else{
        var that=this
        wx.showModal({
          content: '看过答案后将无法修改选择！',
          success (res) {
            if (res.confirm) {
              var tmp=that.data.threedoors
              tmp.isAnswer=true
              that.setData({
                threedoors:tmp,
              })
              //写缓存
              wx.setStorageSync('threedoors', tmp)
            } else if (res.cancel) {
  
            }
          }
        })
      }

    }
    this.setData({
      isAnswer: !this.data.isAnswer
    })
  },

  bindCheck(){
    wx.navigateTo({
      url: '/pages/threedoors/checkthreedoors',
    })
  },

  bindBack(){
    wx.navigateBack({
      delta: 9,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    var tmp=wx.getStorageSync('threedoors')
    this.setData({
      threedoors:tmp
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})