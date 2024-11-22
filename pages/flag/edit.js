// pages/flag/edit.js
var d = new Date();
var today = d.getFullYear() + "-" + (d.getMonth() < 10 ? "0" : "") + (d.getMonth() + 1) + "-" + (d.getDate() < 10 ? "0" : "") + d.getDate();
const app=getApp();
import * as utils from '../../utils/util.js';
const yesapi = require('../../utils/yesapi.js');


Page({
  /**
   * 页面的初始数据
   */
  data: {
    flagId: "",
    content: "",
    start_year: d.getFullYear(),
    start_date: today,
    is_done: false,
    finish_date: today
  },

  bindInput(e) {
    this.setData({
        content: e.detail.value
    });
  },
  bindDate(e) {
      this.setData({
          start_date: e.detail.value,
          start_year: e.detail.value.split("-")[0]
      });
  },
  bindFinish(e) {
      this.setData({
          is_done: e.detail.value,
      });
  },
  bindFinishDate(e) {
      this.setData({
          finish_date: e.detail.value
      });
  },
  async bindDelete() {
    console.log("delete " + this.data.flagId);
    await wx.showModal({
        title: '注意',
        content: '确认要删除这条记录吗?'
    }).then(async result=>{
      if(result.confirm){
        let params = {
          service: "App.Table.Delete", 
          model_name: "flags",
          id: this.data.flagId,
        };
        wx.request({
          header: utils.requestHeader(),
          url: app.globalData.yesApiHost,
          data: yesapi.enryptData(params),
          success: (res) => {
            console.log("delete log succeed.",res)
          },
          fail: (err) => {
            console.log("delete log failed.",err)
          },
          complete: () => {
            wx.navigateBack({
              delta:1
            })
          }
        })
      }
    })
  },
  bindSubmit() {
    if ("" != this.data.flagId && "" != this.data.content) {
      var flag = {
          id: "new" == this.data.flagId ? "" : this.data.flagId,
          content: this.data.content,
          start_year: this.data.start_year,
          start_date: this.data.start_date,
          is_done: this.data.is_done ? "1" : "0",
          finish_date: this.data.is_done ? this.data.finish_date : ""
      };
      console.log(JSON.stringify(flag));
      var params = {
          service: "App.Table.CheckCreateOrUpdate",
          model_name: "flags",
          check_field: "id",
          data: JSON.stringify(flag)
      };
      wx.request({
        header: utils.requestHeader(),
        url: app.globalData.yesApiHost,
        data: yesapi.enryptData(params),
        success: (res) => {
          console.log("update flag succeed.", res);
        },
        fail: (err) => {
          console.log("update flag failed.", err);
        },
        complete: () => {
          wx.navigateBack({
              delta: 1
          });
        }
      });
    }
  },
  bindBack() {
    wx.navigateBack({
        delta: 9
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    if(Object.keys(options).length!=0){
      await this.setData({
        flagId: options.id
      })
    }
    else{
      wx.navigateBack({
        delta:1
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  async onShow() {
    if (this.data.flagId != "new" && this.data.flagId != ""){
      let params = {
        service: "App.Table.GetOneDataByOneField",
        model_name: "flags",
        field_name: "id",
        field_value: this.data.flagId
      }
      await wx.request({
        header: utils.requestHeader(),
        url: app.globalData.yesApiHost,
        data: yesapi.enryptData(params),
        success: (res) => {
            console.log("get flag succeed.", res)
            this.setData({
              content: res.data.data.data.content,
              start_year: res.data.data.data.start_year,
              start_date: res.data.data.data.start_date.split(" ")[0],
              is_done: "0" != res.data.data.data.is_done,
              finish_date: res.data.data.data.finish_date.split(" ")[0]=="0000-00-00"?today:res.data.data.data.finish_date.split(" ")[0]
            });
        },
        fail: (err) => {
            console.log("get flag failed.", err);
        }
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