// pages/firstpage/firstpage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user:"",
    password:"",
    result:""
  },
  user:function(event){
    this.setData({user:event.detail.value})

  },
  password: function (event) {
    this.setData({password:event.detail.value})

  },
  login: function (event) {
    var that = this
    wx.showLoading({
      title: '登录中...',
    })
    wx.request({
      url: 'https://jackyzs.com/weapp/demo', //仅为示例，并非真实的接口地址
      method: 'POST',
      data: {
        name:this.data.user,
        pass:this.data.password
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        that.setData({
          result: JSON.stringify(res.data.data.msg)
        })
        
        
      
        if (that.data.result==1) {
          wx.showToast({
            title: 'success',
            icon: 'success'

          })
          wx.setStorage({
            key: 'user',
            data: that.data.user,
          })
          
          wx.redirectTo({
            url: '/pages/tab/tab',
          })
          
          }
          else{
          wx.hideLoading()
          wx.showModal({
            title: 'log in Fail',
            content: 'wrong password or phone number',
            showCancel: false, //不显示取消按钮
            confirmText: '确定'
          })
          }
        


      },
      fail: function (res) {
        wx.showToast({
          title: 'Fail',
        })


      }



    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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