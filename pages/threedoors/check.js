// pages/threedoors/checkthreedoors.js
var dataBuffer

Page({

  /**
   * 页面的初始数据
   */
  data: {
    count:10,
    aCount:0, //换门中奖次数
    aRate:0,
    totalCount:0,
    totalACount:0,
    totalARate:0,
    testList:[],
    resultList:[],
    isShowTest: false,
    isShowCheck: false,
    isCheckTest: false,
    isRecord: false
  },

  onShow() {
    dataBuffer=wx.getStorageSync('threedoors')
    if(Object.keys(dataBuffer).length==0){
      dataBuffer={isRecord:false,}
    }
    if(dataBuffer.isRecord){
      this.setData({
        isRecord:dataBuffer.isRecord,
        totalCount:dataBuffer.totalCount,
        totalACount:dataBuffer.totalACount,
        totalARate:dataBuffer.totalARate,
        isShowTest: true
      })
    }
    this.bindCreate()
  },

  bindCreate(){
    var tmpList=[]
    for(var i=0;i<this.data.count;i++){
      tmpList.push({
        answer:Math.floor(Math.random()*3),
        option:Math.floor(Math.random()*3),
      })
    }
    this.setData({
      testList:tmpList
    })
  },

  bindCheck(){
    //处理数据
    var acnt=0
    var tmpList=this.data.testList
    for(var i=0;i<this.data.count;i++){
      tmpList[i].erase=this.getErase(tmpList[i].answer,tmpList[i].option)
      if(tmpList[i].answer==tmpList[i].option){
        tmpList[i].a=0
      }
      else{
        tmpList[i].a=1
        acnt=acnt+1
      }
    }
    //写入缓存
    dataBuffer.isRecord=true
    dataBuffer.totalCount=this.data.totalCount+this.data.count
    dataBuffer.totalACount=this.data.totalACount+acnt
    dataBuffer.totalARate=Math.round(dataBuffer.totalACount/dataBuffer.totalCount*100,2)
    wx.setStorageSync('threedoors',dataBuffer)
    //更新显示
    this.setData({
      resultList:tmpList,
      isCheckTest: true,
      isShowCheck: true,
      aCount:acnt,
      aRate:Math.round(acnt/this.data.count*100,2),
      totalCount:dataBuffer.totalCount,
      totalACount:dataBuffer.totalACount,
      totalARate:dataBuffer.totalARate,
      isRecord: true,
      isShowTest:false
    })
    this.bindCreate()
  },

  getErase(answer,option){
    var a=[0,1,2]
    a = a.filter(item=>item!=answer && item!=option)
    if(a.length==1){
      return a[0]
    }
    else{
      return a[Math.floor(Math.random()*2)]
    }
  },

  bindClear(){
    this.setData({
      isCheckTest: false,
      isRecord:false,
      totalCount:0,
      totalACount:0,
      totalARate:0,
    })
    dataBuffer.isRecord=false
    dataBuffer.totalCount=0
    dataBuffer.totalACount=0
    dataBuffer.totalARate=0
    wx.setStorageSync('threedoors',dataBuffer)
  },

  bindCount(e){
    this.setData({
      count:e.detail.value*1
    })
    this.bindCreate()
  },
  bindOption(e){
    var tmpList=this.data.testList
    tmpList[e.currentTarget.dataset.id].option=e.detail.value*1
    this.setData({
      testList:tmpList
    })
  },  
  bindOptionAll(e){
    if(this.data.isCreateTest){
      var tmpList=this.data.testList
      for(var i=0;i<this.data.count;i++){
        tmpList[i].option=e.detail.value*1
      }
      this.setData({
        testList:tmpList,
      })
    }
  },
  bindRandom(){
    var tmpList=this.data.testList
    for(var i=0;i<this.data.count;i++){
      tmpList[i].option=Math.floor(Math.random()*3)
    }
    this.setData({
      testList:tmpList,
      isShowTest:true
    })
  },

  bindHideTest(){
    this.setData({
      isShowTest:!this.data.isShowTest
    })
  },
  bindHideCheck(){
    if(this.data.isCheckTest){
      this.setData({
        isShowCheck:!this.data.isShowCheck
      })
    }
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