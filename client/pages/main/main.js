// pages/main/main.js
var config = require('../../config')
Page({

  /**
   * 页面的初始数据
   */
  data: {
      game:'',
      train:'',
      currentTab: 1,
      flag:false,
      equip:[0,0,0,0,0,0],
      playerdata:{},
      userinfo:{},
      schedule:{},
      date:{},
    array: ['甲', '头盔', '防撞裤', '主场球衣', '客场球衣', '牙套'],
    dict: { 甲: 'pad', 头盔: 'helmet', 防撞裤: 'pant', 主场球衣: 'homejersey', 客场球衣: 'guestjersey', 牙套: 'mouthguard' },
    
    

  },



  onPullDownRefresh: function () {
    console.log('onPullDownRefresh')

  },
  swiperTab: function (event) {
    this.setData({ currentTab: event.detail.current })
  },
  //点击切换
  clickTab: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */               
  match:function(event){
    var that = this
    wx.showModal({
      title: 'SIGN UP',
      content: '确认报名么？报名后暂时不能修改',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: 'https://jackyzs.com/weapp/sign',
            method: 'POST',
            data: {
              game: true,
              id: that.data.playerdata.id,
              train: false
            }
            ,
            header: {
              'content-type': 'application/x-www-form-urlencoded' // 默认值
            },
            success: function (res) {
              wx.showToast({
                title: 'Success',
                
              })
                var game = "playerdata.game"
                that.setData({ [game]: 1 })
                console.log(that.data.playerdata)
            },
            fail: function (res) {
              wx.showToast({
                title: 'Failed',
              })
            }
          })
        }
        else if (res.cancel) {
        }
      }
    })

  },
  

  train: function (event) {
    var that = this
    wx.showModal({
      title: 'SIGN UP',
      content: '确认报名么？报名后暂时不能修改',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: 'https://jackyzs.com/weapp/sign',
            method: 'POST',
            data: {
              game: false,
              id: that.data.playerdata.id,
              train: true
            }
            ,
            header: {
              'content-type': 'application/x-www-form-urlencoded' // 默认值
            },
            success: function (res) {
              wx.showToast({
                title: 'Success',
              })
                var train = "playerdata.train"
                that.setData({ [train]: 1 })
                
            },
            fail: function (res) {
              wx.showToast({
                title: 'Failed',
              })
            }
          })
        }
        else if (res.cancel) {
        }
      }
    })

  },

  
  onLoad: function (options) {//更新用户头像信息并没有写
    var that = this
    wx.setStorage({
      key: 'verified',
      data: true,
    })
    this.setData({ userinfo: wx.getStorageSync('userinfo') })
    console.log(that.data.userinfo)
    wx.request({
      url: 'https://jackyzs.com/weapp/feed',
      method: 'POST',
      data: {
        info: that.data.userinfo.openId
      }
      ,
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        
        var flag = JSON.stringify(res.data.data.msg)//这里逻辑要和下面改下
        if (flag == 'true') {
          // console.log(res.data.data.data)
          wx.setStorage({
            key: 'playerdata',
            data: res.data.data.data,
            
          })
          wx.setStorage({
            key: 'user',
            data: res.data.data.data.phone,
          })
          if (res.data.data.stage.status=='0'){
            that.setData({train:false})
            that.setData({ game: false })
          }
          if (res.data.data.stage.status=='1') {
            that.setData({ train: true })
            that.setData({ game: false })
          }
          if (res.data.data.stage.status=='2') {
            that.setData({ train: false })
            that.setData({ game: true })
          }
          that.setData({ playerdata: wx.getStorageSync('playerdata') })
        }
      },
      fail: function (res) {
        that.setData({ playerdata: wx.getStorageSync('playerdata') })
      }
    })
    wx.request({
      url: `${config.service.host}/weapp/date`,
      method: 'POST',
      data: {

      }
      ,
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        console.log(res)
        that.setData({date:res.data.date})
        that.setData({ schedule: res.data.schedule })
        

      },
      fail: function (res) {

      }
    })
    // console.log(that.data.userinfo)
    
  },
  edit:function(event){
    // console.log(this.data.playerdata)
    wx.navigateTo({
      url: '/pages/tab/tab',
    })
  },
  sudo:function(event){
    wx.navigateTo({
      url: '/pages/sudo/sudo',
    })
  },
  file:function(event){
    wx.navigateTo({
      url: '/pages/file/file',
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var page = getCurrentPages().pop()
    page.onLoad()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})