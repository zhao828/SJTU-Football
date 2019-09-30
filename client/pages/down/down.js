// client/pages/down/down.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array:[]
  },
  download: function () {
    var that = this
    wx.downloadFile({
      url: 'https://wafer-1257342876.cos.ap-guangzhou.myqcloud.com/test.xls',
      success: function (res) {
        var filePath = res.tempFilePath
        wx.showToast({
          title: 'success',
          icon: 'success'
        })
        wx.saveFile({
          tempFilePath: filePath,
          success: function (res) {
            var savedFilePath = res.savedFilePath
            that.setData({ list: savedFilePath })
          }
        })
        // wx.openDocument({
        //   filePath: filePath,
        //   success: function (res) {
        //     console.log('打开文档成功')
        //   }
        // })
      }
    })
  },
  long:function(event){
    var name = event.target.dataset.name
    wx.showModal({
      title: 'Download',
      content: '确定下载',
      success: function (res) {
        if (res.confirm) {
          wx.downloadFile({
            url: 'https://wafer-1257342876.cos.ap-guangzhou.myqcloud.com/'+name,
            success: function (res) {
              var filePath = res.tempFilePath
              
              wx.saveFile({
                tempFilePath: filePath,
                success: function (res) {
                  wx.showToast({
                    title: 'Download Success',
                    icon: 'success'
                  })
                }
              })
            }
          })



          
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
    var that = this
    wx.request({
      url: 'https://jackyzs.com/weapp/download',
      method: 'POST',
      data: {

      }
      ,
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        console.log(res.data)
        that.setData({ array: res.data.data })

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