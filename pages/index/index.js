// index.js
const app=getApp();
import * as utils from '../../utils/util.js';
const yesapi = require('../../utils/yesapi.js');
var user;


Page({

  bindMenu(){
    wx.navigateTo({
      url: '/pages/threedoors/threedoors',
    })
  },

  onLoad(){
    user = app.userLogin().then(res=>{
      // console.log(res)
    })
  }
})
