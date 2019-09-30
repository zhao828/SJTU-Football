// pages/welcome/welcome.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')
Page({
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    verifyflag:true,
    authorflag:false,
    loginflag:false,

  },

  onLoad: function () {
    // 查看是否登记过
  
    var that = this
    console.log(wx.getStorageSync('verified'))
    wx.getStorage({
      key: 'verified',
      success: function(res) {
        that.setData({ verifyflag:true})
      },
      fail:function(err){
        that.setData({ verifyflag:false })
      }
    })

    },

  login:function(event){
    wx.redirectTo({
      url: '/pages/main/main',
    })
  },
  register: function (event) {
    wx.redirectTo({
      url: '/pages/firstpage/firstpage',
    })
  },
  
  bindGetUserInfo: function (e) {
    var that = this
    wx.showLoading({
      title: 'loading',
    })
    if (e.detail.userInfo) {
      qcloud.login({
        success: res => {
          console.log(res)
          wx.setStorage({
            key: 'userinfo',
            data: res,
          })

         wx.request({
           url: 'https://jackyzs.com/weapp/feed',
           method:'POST',
           data:{
             info:res.openId 
           }
         ,
          header: {
            'content-type': 'application/x-www-form-urlencoded' // 默认值
          },
          success:function(res){
            console.log(res)
            that.setData({ authorflag: true })
            wx.hideLoading()
          
            
            
            var flag = JSON.stringify(res.data.data.msg)//这里逻辑要和下面改下
            
            if(flag=='true'){
              that.setData({loginflag:true})
              wx.setStorage({
                key: 'playerdata',
                data: res.data.data.data,
              })
            }
            else{
              that.setData({loginflag: false})
            }
           
          },
          
          fail:function(res){
            
            wx.showToast({
              title: '网络连接错误',
            })
        
         }
        })
        },
        fail: err => {
          console.log(err)
          wx.hideLoading()
          wx.showToast({
            title: '网络连接错误',
          })
        }
      })
      
      //用户按了允许授权按钮
    } else {
      wx.hideLoading()
      //用户按了拒绝按钮
    }
  }
})