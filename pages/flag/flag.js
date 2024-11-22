// pages/flag/flag.js
const app=getApp();
import * as utils from '../../utils/util.js';
const yesapi = require('../../utils/yesapi.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    flagList: [],
    groupedFlags: [],
    isShowAll: false
  },

  bindEdit(e) {
    wx.navigateTo({
        url: "./edit?id=" + e.currentTarget.dataset.id
    });
  },
  bindShowAll() {
    this.setData({
        isShowAll: !this.data.isShowAll
    });
  },
  bindBack() {
    wx.navigateBack({
        delta: 9
    });
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
    wx.request({
      header: utils.requestHeader(),
      url: app.globalData.yesApiHost,
      data: yesapi.enryptData({
          service: "App.Table.FreeQuery",
          model_name: "flags",
          perpage: 512
      }),
      success: (res) => {
        this.setData({
            flagList: res.data.data.list
        });
        // console.log(this.data.flagList)
        // 使用 reduce 方法来分组数据
        var tmpList = this.data.flagList.reduce((acc, item) => {
          const { start_year } = item;
          // 格式化日期
          item.start_date = item.start_date.split(' ')[0];
          item.finish_date = item.finish_date.split(' ')[0];
          // 如果 acc 中没有当前年份的数据，则添加新的年份条目
          if (!acc[start_year]) {
              acc[start_year] = { year: start_year, events: [] }; 
          }
          // 向对应年份的 events 数组中添加当前项
          acc[start_year].events.push(item);
          return acc;
        }, {});
        // 将分组后的对象转换成数组，并按年份降序排列
        const sortedList = Object.values(tmpList).sort((a, b) => b.year - a.year);
        // console.log(sortedList)
        // 更新组件状态（假设这是在一个组件中）
        this.setData({
          groupedFlags: sortedList
        });
      },
      fail: (err) => {
        console.log("get flags failed.",err)
      }
    });
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