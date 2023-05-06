// app.js
// const app=getApp();
// import * as utils from './utils/util.js';
// const yesapi = require('./utils/yesapi.js');
// var user;


App({
  // globalData:{
  //   yesApiHost: "https://hn216.api.yesapi.cn", // TODO: 配置成你所在的接口域名记得加https
  //   yesApiAppKey: "DAA98CD0956F702EF75A047B73C01AF0", // TODO：改为你的APP_KEY 在http://open.yesapi.cn/?r=App/Mine寻找
  //   yesApiAppSecret: "2k6m0fTnZEge8IvEwLrfpzBZAWRKb9oSEmyBhxHzvGHDFZiFkM3tIUjW93QPH9dlyKOff", // TODO：改为你的APP_SECRET
  // },

  // getOpenid(){
  //   return new Promise((resolve, reject) => {
  //     //login获取code
  //     wx.login({
  //       success: (res) => {
  //         //request获取openid
  //         console.log(res.code)
  //         let params = {
  //           service: "App.Weixin.GetWeixinInfoMini", 
  //           code: res.code,
  //           appname: "wx_app_yoyogame",
  //         };
  //         wx.request({
  //           header: utils.requestHeader(),
  //           url: this.globalData.yesApiHost,
  //           data: yesapi.enryptData(params),
  //           success: (res1) => {
  //             // console.log("request openid succeed.",res1)
  //             resolve(res1.data.data.openid)
  //           },
  //           fail: (err1)=> {
  //             console.log("request openid failed.",err1)
  //             reject();
  //           }
  //         })
  //       },
  //       fail: (err) => {
  //         console.log("login failed.",err)
  //         reject();
  //       }
  //     })        
  //   });
  // },

  // getUserInfo(openid){
  //   return new Promise(async (resolve, reject)=>{
  //     let userInfo={openid:openid,nickname:'微信用户'} 
  //     let userData=JSON.stringify(userInfo)
  //     console.log(userData)
  //     let params = {
  //       service: "App.Table.CheckCreate", // 如果没有就直接创建
  //       model_name: "user",
  //       check_field: "openid",
  //       data: userData,
  //     };
  //     wx.request({
  //       header: utils.requestHeader(),
  //       url: this.globalData.yesApiHost,
  //       data: yesapi.enryptData(params),
  //       success: (res) => {
  //         console.log("request user succeed.",res)
  //         let params1 = {
  //           service: "App.Table.GetOneDataByOneField", // 必须，待请求的接口服务名称
  //           model_name: "user",
  //           field_name: "openid",
  //           field_value: openid,
  //         };
  //         wx.request({
  //           header: utils.requestHeader(),
  //           url: this.globalData.yesApiHost,
  //           data: yesapi.enryptData(params1),
  //           success: (res1) => {
  //             // console.log(res1)
  //             wx.setStorageSync('userInfo', res1.data.data.data)
  //             resolve(res1.data.data.data);
  //           },
  //           fail: (err1) => {
  //             console.log('get userinfo error.', err1);
  //             reject();
  //           }  
  //         })
  //       },
  //       fail: (err) => {
  //         console.log('add user error.', err);
  //         reject();
  //       }    
  //     }) 
  //   })
  // },
  
  // userLogin(){
  //   return new Promise(async (resolve, reject)=>{
  //     //检查缓存的userInfo
  //     var userInfo=wx.getStorageSync('userInfo')
  //     if(userInfo == null || Object.keys(userInfo).length==0){
  //       //如果没有则需要登录
  //       console.log("no storage userInfo.")
  //       this.getOpenid().then(res=>{  //res是openid
  //         // console.log(res)
  //         this.getUserInfo(res).then(res1=>{  //res1是userInfo
  //           resolve(res1)
  //         })
  //       })
  //     }
  //     else{
  //       //缓存有userInfo
  //       // console.log("userInfo:", userInfo)
  //       resolve(userInfo)
  //     }
  //     //需要加刷新缓存的办法
  //   })
  // },

  onload(){

  }

})
