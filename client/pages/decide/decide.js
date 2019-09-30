// pages/decide/decide.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    multiArray: [['无', '有'], ['无', '有'], ['无', '有'], ['无', '有'], ['无', '有'], ['无', '有']],
    multiIndex: [0,0,0,0,0,0],

  },
  bindMultiPickerChange:function(event){
    // console.log(event.detail.value)
    this.setData({ multiIndex: event.detail.value})
  },

  submit:function(event){
    var that = this
    var name = wx.getStorageSync('user');
    var userinfo = wx.getStorageSync('userinfo').openId;
    
    wx.showLoading({
      title: '登录中...',
    })
    
    wx.request({
      url: 'https://ncggnunw.qcloud.la/weapp/info',
      method:'POST',
      data:{
        equip:this.data.multiIndex,
        user: name,
        info: userinfo

      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      
      success: function (res) {
        
        wx.showToast({
          title: 'Success',
          icon:'success'
        })
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