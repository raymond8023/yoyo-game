// pages/interest/interest.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    money:100,
    cycle:240,
    interest:3.1,
    monthly:5596.17,
    monthlyTotal:1343080.55,
    first:"6750.00",
    decrease:10.76,
    last:4177.43,
    total:1311291.67,
    start:100,
    end:120,
    months:12,
    rate:18.37,
  },

  bindSubmitMonthly(e){
    var money,cycle,interest,monthlyInterest,monthly,monthlyTotal,first,decrease,last,total
    money=e.detail.value.money*10000
    cycle=e.detail.value.cycle*1
    interest=e.detail.value.interest*1
    monthlyInterest=interest/1200
    // console.log(interest)
    //等额本息：月供=[借款金额×月利率×(1+月利率)^借款月数]÷[(1+月利率)^借款月数-1]
    monthly=money*monthlyInterest*Math.pow(1+monthlyInterest,cycle)/(Math.pow(1+monthlyInterest,cycle)-1)
    monthlyTotal=monthly*cycle
    //等额本金：月供=(借款金额/借款月数)+(借款金额-累计已还本金)×月利率
    decrease=money/cycle*monthlyInterest
    first=money/cycle+money*monthlyInterest
    last=money/cycle+money/cycle*monthlyInterest
    total=(first+last)*cycle/2
    this.setData({
      money:e.detail.value.money*1,
      cycle:cycle,
      interest:interest,
      monthly:monthly.toFixed(2),
      monthlyTotal:monthlyTotal.toFixed(2),
      first:first.toFixed(2),
      decrease:decrease.toFixed(2),
      last:last.toFixed(2),
      total:total.toFixed(2),
    })
  },

  bindSubmitRate(e){
    var start,end,months,rate
    start=e.detail.value.start
    end=e.detail.value.end
    months=e.detail.value.months
    rate=e.detail.value.rate
    if(start=="" && end!="" && months!="" && rate!="") {
      //计算start   
      start=(end/Math.pow(1+rate/1200,months)).toFixed(4)
    }
    else if(start!="" && end=="" && months!="" && rate!="") {
      //计算end    
      end=(start*Math.pow(1+rate/1200,months)).toFixed(4)
    }
    else if(start!="" && end!="" && months=="" && rate!="") {
      //计算months    
      months=(Math.log(end/start)/Math.log(1+rate/1200)).toFixed(2)  
    }
    else if(start!="" && end!="" && months!="") {
      //计算rate
      rate=((Math.pow(end/start,1/months)-1)*1200).toFixed(2)
    }
    else{
      wx.showModal({
        content: '条件不足，无法计算！',
        showCancel: false,
      })
    }
    this.setData({
      start:start,
      end:end,
      months:months,
      rate:rate
    })
  },

  bindReset(){
    this.setData({
      start:100,
      end:120,
      months:12,
      rate:18.37,
    })
  },
  clearStart(){
    this.setData({
      start:""
    })
  },
  clearEnd(){
    this.setData({
      end:""
    })
  },
  clearMonths(){
    this.setData({
      months:""
    })
  },
  clearRate(){
    this.setData({
      rate:""
    })
  },
  bindMode(e){
    this.setData({
      mode:e.detail.value*1
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
  
  onShow() {

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