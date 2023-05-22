// pages/boxes/boxes.js
var dataBuffer

Page({
  /**
   * 页面的初始数据
   */
  data: {
    isSelect: false,
    selectOption: "",
    isAnswer: false,
  },

  onShow() {
    dataBuffer=wx.getStorageSync('boxes')
    if(Object.keys(dataBuffer).length==0){
      dataBuffer={isAnswer:false,}
    }
    if(dataBuffer.isAnswer){
      this.setData({
        isAnswer:dataBuffer.isAnswer,
        isSelect:dataBuffer.isSelect,
        selectOption: dataBuffer.selectOption,
      })
    }
  },

  bindOption(e){
    if(this.data.isAnswer){
      wx.showModal({
        content: '你已看过答案，无法修改选择！',
        showCancel: false,
      })
    }
    else{
      this.setData({
        isSelect:true,
        selectOption:e.detail.value
      })
    }
  },

  bindAnswer(){
    if(!this.data.isAnswer){
      if(!this.data.isSelect){
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
              that.setData({
                isAnswer:true,
              })
              //写缓存
              dataBuffer.isAnswer=true
              dataBuffer.isSelect=true
              dataBuffer.selectOption=that.data.selectOption
              wx.setStorageSync('boxes', dataBuffer)
            } else if (res.cancel) {}
          }
        })
      }
    }
  },

  bindCheck(){
    wx.navigateTo({
      url: './check',
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