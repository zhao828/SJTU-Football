// client/pages/text/text.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time:'',
    loc:'',
    name:'',
    urgent:'',

  },
  timeinput: function (event) {
    this.setData({ time: event.detail.value })
  },
  nameinput: function (event) {
    this.setData({ name: event.detail.value })
  },
  locinput: function (event) {
    this.setData({ loc: event.detail.value })
  },
  send:function(event){
    var that = this;
    wx.showModal({
      title: 'SUBMIT',
      content: '确认发送 【雄狮队员们, ' + that.data.name + '报名已经开始，时间为' + that.data.time + ',地点在' + that.data.loc+', 请在小程序内报名, 若要请假者请在群里告知队长。】吗？ 请务必确保名称，地点，时间均填写',
      success: function (res) {
        if (res.confirm) {

          wx.request({
            url: 'https://jackyzs.com/weapp/text',
            method: 'POST',
            data: {
              urgent:that.data.urgent,
              time: that.data.time,
              loc: that.data.loc,
              name: that.data.name,

            },
            header: {
              'content-type': 'application/x-www-form-urlencoded' // 默认值
            },

            success: function (res) {
              console.log(JSON.stringify(res.data))
              wx.showToast({
                title: 'Success',
                icon: 'success'
              })
              },

            fail: function (res) {
              wx.showToast({
                title: 'Fail',
              })
            }
          })
        }
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