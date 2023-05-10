// index.js
const app=getApp();
import * as utils from '../../utils/util.js';
const yesapi = require('../../utils/yesapi.js');
var user;


Page({

  bindMenu(e){
    // console.log(e)
    wx.navigateTo({
      url: '/pages/'+e.currentTarget.dataset.link+'/'+e.currentTarget.dataset.link,
    })
  },

  onLoad(){

  }
})
