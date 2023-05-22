// pages/fairgamble/check.js
var dataBuffer
const MAXNUM=100000
const INITMONEY=10
var answerList=[],isMission=false

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShowTip:true,
    isShowTest:true,
    isShowContinuous:false,
    isShowCheck:false,
    isCheckTest:false,
    startNumber:0,
    money:INITMONEY,
    cycle:0,
    loseCount:0,
    totalCycle:0,
    averageCycle:0,
    continuousCount:10,
    count:1,
    cost:5,
    costRate:5,
    maxMoney:INITMONEY,
    missionCount:0,
    missionRate:0,
    testList:[],
    continuousList:[],
    resultList:[]
  },

  onShow() {
    dataBuffer=wx.getStorageSync('fairgamble')
    if(Object.keys(dataBuffer).length==0){
      dataBuffer={isRecord:false,}
    }
    if(dataBuffer.isRecord){
      this.setData({
        isRecord:dataBuffer.isRecord,
        money:dataBuffer.money,
        cycle:dataBuffer.cycle,
        loseCount:dataBuffer.loseCount,
        averageCycle:dataBuffer.averageCycle,
        maxMoney:dataBuffer.maxMoney,
        missionCount:dataBuffer.missionCount,
        missionRate:dataBuffer.missionRate
      })
    }
  },
  
  bindReCreate(){
    answerList=[]
    for (var i=0;i<MAXNUM;i++){
      answerList.push(Math.floor(Math.random()*2))
    }
    this.bindRandomStart()
  },

  bindRandomStart(){
    this.setData({
      startNumber:Math.floor(Math.random()*MAXNUM),
    })
    this.continuousCreate()
    this.testCreate()
  },

  continuousCreate(){
    var tmpList=[]
    for(var i=this.data.startNumber-this.data.continuousCount;i<this.data.startNumber;i++){
      if(i<0){
        i=0
      }
      tmpList.push({
        idx:i,
        answer:answerList[i]
      })
    }
    this.setData({
      continuousList:tmpList
    })
  },
  
  testCreate(){
    var tmpList=[]
    for(var i=0;i<this.data.count;i++){
      tmpList.push({
        idx:(this.data.startNumber+i)%MAXNUM,
        answer:answerList[(this.data.startNumber+i)%MAXNUM],
      })
    }
    this.setData({
      testList:tmpList
    })
    this.bindOptionAll({detail:{value:-1}})
  },
    
  bindSearch(){
    for(var i=0;i<MAXNUM;i++){
      var cnt=1
      for(var j=i+1;j<MAXNUM;j++){
        if(answerList[(this.data.startNumber+i)%MAXNUM]==answerList[(this.data.startNumber+j)%MAXNUM]){
          cnt=cnt+1
          if(cnt>=this.data.continuousCount){
            this.setData({
              startNumber:(this.data.startNumber+j+1)%MAXNUM,
            })
            this.continuousCreate()
            this.testCreate()
            return
          }
        }
        else{
          break
        }
      }
      i=j-1
    }
  },

  
  bindCheck(){
    var tmpList=this.data.testList
    var resList=this.data.resultList
    var money=this.data.money
    for(var i=0;i<this.data.count;i++){
      var cost=money<this.data.cost?money:this.data.cost
      if(tmpList[i].answer==tmpList[i].option){
        money=money+cost
        tmpList[i].money=money
      }
      else{
        money=money-cost
        tmpList[i].money=money
      }
      var res="第"+tmpList[i].idx+"期：硬币为"+(tmpList[i].answer==0?'正':'反')+"面，你"+(tmpList[i].option==tmpList[i].answer?'押中了':'没押中')+"，结算资金："+tmpList[i].money+"元。"
      resList.unshift(res)
      if(money>99 && isMission==false){
        isMission=true
        this.setData({
          missionCount:this.data.missionCount+1,
          missionRate:Math.round((this.data.missionCount+1)/(this.data.loseCount+1)*100,2)
        })
      }
      if(money>this.data.maxMoney){
        this.setData({
          maxMoney:money
        })
      }
      if(money==0){
        resList.unshift("你输光啦，本次你总共坚持了"+(this.data.cycle+i+1)+"轮。")
        resList=resList.slice(0,1000)
        isMission=false
        this.setData({
          money:INITMONEY,
          loseCount:this.data.loseCount+1,
          totalCycle:this.data.totalCycle+this.data.cycle+i+1,
          cycle:0,
          startNumber:this.data.startNumber+i+1,
          resultList:resList,
          isCheckTest: true,
          isShowCheck: true,
          averageCycle: Math.floor((this.data.totalCycle+this.data.cycle+i+1)/(this.data.loseCount+1)),
          missionRate:Math.round((this.data.missionCount)/(this.data.loseCount+1)*100,2)
        })
        this.saveData()
        this.testCreate()
        return
      }
    }
    resList=resList.slice(0,1000)
    this.setData({
      money:money,
      startNumber:this.data.startNumber+this.data.count,
      cycle:this.data.cycle+this.data.count,
      resultList:resList,
      isCheckTest: true,
      isShowCheck: true,
    })
    this.saveData()
    this.testCreate()
  },

  saveData(){
    dataBuffer.isRecord=true
    dataBuffer.money=this.data.money
    dataBuffer.cycle=this.data.cycle
    dataBuffer.loseCount=this.data.loseCount
    dataBuffer.averageCycle=this.data.averageCycle
    dataBuffer.maxMoney=this.data.maxMoney
    dataBuffer.missionCount=this.data.missionCount
    dataBuffer.missionRate=this.data.missionRate
    wx.setStorageSync('fairgamble',dataBuffer)
  },

  bindClear(){
    this.setData({
      money:INITMONEY,
      cycle:0,
      loseCount:0,
      totalCycle:0,
      averageCycle:0,
      continuousCount:10,
      count:1,
      cost:5,
      costRate:5,
      maxMoney:INITMONEY,
      missionCount:0,
      missionRate:0,
    })
    this.saveData()
  },
  
  bindOptionAll(e){
    var tmpList=this.data.testList
    for(var i=0;i<this.data.count;i++){
      tmpList[i].option=e.detail.value<0?Math.floor(Math.random()*2):e.detail.value*1
    }
    this.setData({
      testList:tmpList,
    })
  },
  bindOption(e){
    var tmpList=this.data.testList
    for(var i=0;i<this.data.count;i++){
      tmpList[i].option=e.detail.value*1
    }
    this.setData({
      testList:tmpList,
    })
  },
  bindInputNumber(e){
    this.setData({
      startNumber:e.detail.value*1
    })
    this.continuousCreate()
    this.testCreate()
  },
  bindCount(e){
    this.setData({
      count:e.detail.value*1,
      isShowTest:e.detail.value>99?false:true
    })
    this.testCreate()
  },
  bindSliderContinuous(e){
    this.setData({
      continuousCount:e.detail.value*1
    })
  },  
  bindSliderCost(e){
    this.setData({
      costRate:e.detail.value*1,
      cost:Math.floor(e.detail.value*1*this.data.money/10)
    })
  },
  bindInputCost(e){
    this.setData({
      cost:e.detail.value*1,
      costRate:Math.floor(e.detail.value*10/this.data.money)
    })
  },

  bindHide(){
    this.setData({
      isShowTest:false,
      isShowCheck:false,
      isShowContinuous:false
    })
  },
  bindHideTip(){
    this.setData({
      isShowTip:!this.data.isShowTip
    })
  },
  bindHideTest(){
    this.setData({
      isShowTest:!this.data.isShowTest
    })
  },
  bindHideContinuous(){
    this.setData({
      isShowContinuous:!this.data.isShowContinuous
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
    this.bindReCreate()
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