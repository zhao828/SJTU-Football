// pages/sudo/sudo.js
var config = require('../../config')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
    currentTab:0,
    starttrain:'',
    startmatch:'',
    firstcall:true,
    absense:[],
    oncall: [],
    array: ['甲', '盔', '裤', '主', '客', '牙'],
    dict: { 甲: 'pad', 盔: 'helmet', 裤: 'pant', 主: 'homejersey', 客: 'guestjersey', 牙: 'mouthguard' },
  },
  train:function(event){
    var that = this
    if(this.data.starttrain){
    wx.showModal({
      title: 'ATTENTION!',
      content: '是否确定要取消训练？',
      success: function (res) {
        if (res.confirm) {
          that.setData({ startmatch: false })

          that.setData({ starttrain: false })

          wx.request({
            url: 'https://jackyzs.com/weapp/absense',
            method: 'POST',
            data: {
              matchcall: that.data.startmatch,
              traincall: that.data.starttrain,
              firstcall: that.data.firstcall
            }
            ,
            header: {
              'content-type': 'application/x-www-form-urlencoded' // 默认值
            },
            success: function (res) {
              console.log(res.data.stage)
              that.setData({ absense:[] })
              that.setData({ oncall: [] })
            },
            fail: function (res) {

            }
          })


        } else if (res.cancel) {
          
        }
      }
    })
    }
    else{
      wx.showModal({
        title: 'ATTENTION!',
        content: '是否确定要召集训练？',
        success: function (res) {
          if (res.confirm) {
            that.setData({ starttrain: true })
            that.setData({ startbreak: false })
            
            wx.request({
              url: 'https://jackyzs.com/weapp/absense',
              method: 'POST',
              data: {
                matchcall: that.data.startmatch,
                traincall: that.data.starttrain,
                firstcall: that.data.firstcall
              }
              ,
              header: {
                'content-type': 'application/x-www-form-urlencoded' // 默认值
              },
              success: function (res) {
                console.log(res.data.stage)
                that.setData({ absense: res.data.absense })
                that.setData({ oncall: res.data.oncall })
                
              },
              fail: function (res) {

              }
            })
          } else if (res.cancel) {

          }
        }
      })
    }
  },
  text:function(event){
    wx.navigateTo({
      url: '/pages/text/text',
    })

  },
  match: function (event) {
    var that = this
    if (this.data.startmatch) {
      wx.showModal({
        title: 'ATTENTION!',
        content: '是否确定要取消比赛？',
        success: function (res) {
          if (res.confirm) {
            that.setData({ startmatch: false })
            
            that.setData({ starttrain: false })
            
            wx.request({
              url: 'https://jackyzs.com/weapp/absense',
              method: 'POST',
              data: {
                matchcall: that.data.startmatch,
                traincall: that.data.starttrain,
                firstcall: that.data.firstcall
              }
              ,
              header: {
                'content-type': 'application/x-www-form-urlencoded' // 默认值
              },
              success: function (res) {
                console.log(res.data.stage)
                that.setData({ absense: [] })
                that.setData({ oncall: [] })
              },
              fail: function (res) {

              }
            })
          } else if (res.cancel) {

          }
        }
      })
    }
    else {
      wx.showModal({
        title: 'ATTENTION!',
        content: '是否确定要召集比赛？',
        success: function (res) {
          if (res.confirm) {
            
            that.setData({ startmatch: true })
          
            // console.log(that.data.startmatch)
            wx.request({
              url: 'https://jackyzs.com/weapp/absense',
              method: 'POST',
              data: {
                matchcall: that.data.startmatch,
                traincall: that.data.starttrain,
                firstcall: that.data.firstcall
              }
              ,
              header: {
                'content-type': 'application/x-www-form-urlencoded' // 默认值
              },
              success: function (res) {
                console.log(res.data.stage)
                that.setData({ absense: res.data.absense })
                that.setData({ oncall: res.data.oncall })
              },
              fail: function (res) {

              }
            })
        



          } else if (res.cancel) {

          }
        }
      })
    }
  },

  change:function(event){
    var that = this
    var toStatus = event.target.dataset.change
    var name = event.target.dataset.name
    var game= this.data.startmatch
    var train = this.data.starttrain
    wx.showModal({
      title: 'Attention!',
      content: '确定修改'+name+'吗？',
      success: function (res) {
        if (res.confirm) {
    
    
    wx.request({
      url: 'https://jackyzs.com/weapp/change',
      method: 'POST',
      data: {
        tostatus: toStatus,
        name: name,
        train:train,
        game:game
      }
      ,
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        console.log(res)
        var page = getCurrentPages().pop()
        page.onLoad()

      }
    })
        }
      }

    }) 
  
  
  },
  

  swipertab:function(event){
    this.setData({currentTab:event.detail.current})
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    
    wx.request({
      url: 'https://jackyzs.com/weapp/absense',
      method: 'POST',
      
      data: {
        matchcall: this.data.startmatch,
        traincall:this.data.starttrain,
        firstcall: that.data.firstcall,
      }
      ,
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        console.log(res.data.stage)
        that.setData({ firstcall: false })
        if(res.data.stage=='train'){
          that.setData({ starttrain: true }) 
          that.setData({ absense: res.data.absense })
          that.setData({ oncall: res.data.oncall })
          
        }
        if (res.data.stage == 'match') {
          that.setData({ startmatch: true })
          that.setData({ absense: res.data.absense })
          that.setData({ oncall: res.data.oncall })
         
        }
        if (res.data.stage == 'break') {
          that.setData({ startmatch: false })
          that.setData({ starttrain: false })
           
          
        }
        
      },
      fail: function (res) {
        
      }
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
    var page = getCurrentPages().pop()
    page.onLoad()
    setTimeout(function () {
      wx.stopPullDownRefresh()
        },1500)
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