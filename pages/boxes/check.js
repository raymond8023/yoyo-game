// pages/boxes/check.js
var dataBuffer

Page({

  /**
   * 页面的初始数据
   */
  data: {
    count:10,
    count2:0,
    redCount:0,
    redCount2:0,
    redRate:0,
    testList:[],
    isCheckTest:false,
    isShowCheck:false,
    isRecord:false,
    totalCount:0,
    totalRedCount:0,
    totalRedCount2:0,
    totalRedRate:0
  },

  onShow() {
    dataBuffer=wx.getStorageSync('boxes')
    if(Object.keys(dataBuffer).length==0){
      dataBuffer={isRecord:false,}
    }
    if(dataBuffer.isRecord){
      this.setData({
        isRecord:dataBuffer.isRecord,
        totalCount:dataBuffer.totalCount,
        totalRedCount:dataBuffer.totalRedCount,
        totalRedCount2:dataBuffer.totalRedCount2,
        totalRedRate:dataBuffer.totalRedRate
      })
    }
  },

  
  bindCheck(){
    var tmpList=[]
    var redCount=0, redCount2=0
    for(var i=0;i<this.data.count;i++){
      //box0:0,1红;box1:0红1蓝;box2:0,1蓝
      var tmpBox=Math.floor(Math.random()*3)
      var tmpBall=Math.floor(Math.random()*2)+tmpBox*2
      redCount=redCount+(tmpBall<3?1:0)
      redCount2=redCount2+(tmpBall<2?1:0)
      tmpList.push({
        box:String.fromCharCode(65 + tmpBox),
        ball:tmpBall
      })
    }
    this.setData({
      count2:this.data.count,
      testList:tmpList,
      redCount:redCount,
      redCount2:redCount2,
      redRate: Math.round(redCount2/redCount*100,2),
      totalCount:this.data.totalCount+this.data.count,
      totalRedCount:this.data.totalRedCount+redCount,
      totalRedCount2:this.data.totalRedCount2+redCount2,
      totalRedRate: Math.round((this.data.totalRedCount2+redCount2)/(this.data.totalRedCount+redCount)*100,2),
      isCheckTest:true,
      isShowCheck:true,
      isRecord:true
    })
    this.saveData()
  },

  saveData(){
    dataBuffer.isRecord=true
    dataBuffer.totalCount=this.data.totalCount
    dataBuffer.totalRedCount=this.data.totalRedCount
    dataBuffer.totalRedCount2=this.data.totalRedCount2
    dataBuffer.totalRedRate=this.data.totalRedRate
    wx.setStorageSync('boxes', dataBuffer)
  },

  bindClear(){
    this.setData({
      isRecord:false,
      totalCount:0,
      totalRedCount:0,
      totalRedCount2:0,
      totalRedRate:0,
      isCheckTest:false,
      isShowCheck:false,
      testList:[]
    })
    this.saveData()
  },
  
  bindCount(e){
    this.setData({
      count:e.detail.value*1,
    })
  },
  bindBack(){
    wx.navigateBack({
      delta: 9,
    })
  },
  bindHideCheck(){
    this.setData({
      isShowCheck: !this.data.isShowCheck
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