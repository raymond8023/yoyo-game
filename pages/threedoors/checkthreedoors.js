// pages/threedoors/checkthreedoors.js
var threedoors

Page({

  /**
   * 页面的初始数据
   */
  data: {
    count:10,
    aCount:0,
    aRate:0,
    totalCount:0,
    totalACount:0,
    totalARate:0,
    testList:[],
    isShowTest: false,
    isCreateTest: false,
    isShowCheck: false,
    isCheckTest: false,
    isRecord: false
  },

  createOneTest(){
    return (Math.floor(Math.random()*3))
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

  bindCheck(){
    var acnt=0
    var tmpList=this.data.testList
    if(this.data.isCreateTest){
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
      this.setData({
        testList:tmpList,
        isCheckTest: true,
        isShowCheck: true,
        aCount:acnt,
        aRate:Math.round((acnt/this.data.count)*100,2),
        totalCount:this.data.totalCount+this.data.count,
        totalACount:this.data.totalACount+acnt,
        totalARate:Math.round(((this.data.totalACount+acnt)/(this.data.totalCount+this.data.count))*100,2),
        isRecord: true
      })
      threedoors.isRecord=true
      threedoors.totalCount=this.data.totalCount
      threedoors.totalACount=this.data.totalACount
      wx.setStorageSync('threedoors', threedoors)
      this.setData({
        isShowTest:false
      })
    }
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

  bindCheat(){
    wx.navigateTo({
      url: '/pages/threedoors/cheat',
    })
  },

  bindRandom(){
    if(this.data.isCreateTest){
      var tmpList=this.data.testList
      for(var i=0;i<this.data.count;i++){
        tmpList[i].option=this.createOneTest()
      }
      this.setData({
        testList:tmpList,
      })
      // console.log(this.data.testList)
    }
  },

  bindCreate(){
    var tmpList=[]
    for(var i=0;i<this.data.count;i++){
      tmpList.push({
        answer:this.createOneTest(),
        option:this.createOneTest(),
      })
    }
    this.setData({
      testList:tmpList,
      isShowTest:true,
      isCreateTest:true
    })
    // console.log(this.data.testList)
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
    this.bindCreate()
    threedoors=wx.getStorageSync('threedoors')
    if(Object.keys(threedoors).length==0){
      threedoors={isRecord:false,}
    }
    if(threedoors.isRecord==true){
      this.setData({
        isRecord:threedoors.isRecord,
        totalCount:threedoors.totalCount,
        totalACount:threedoors.totalACount,
      })
    }
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