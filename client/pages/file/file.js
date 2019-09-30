// client/pages/new/new.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    path: '',
    downarray: [],
    currentTab :0,

    array:{},
    
  },

  swiperTab:function(event){
    
      this.setData({ currentTab: event.detail.current })
    
  },
  download: function (event) {
    var that= this
    var name = event.target.dataset.name
    wx.showModal({
      title: 'Download',
      content: '确定下载？',
      success: function (res) {
        if (res.confirm) {
          wx.downloadFile({
            url: 'https://wafer-1257342876.cos.ap-guangzhou.myqcloud.com/' + name,
            success: function (res) {
              var filePath = res.tempFilePath
              var a = that.data.array
              
              
             
              
              // wx.openDocument({
              //   filePath: filePath,
              //   success: function (res) {
              //     console.log('打开文档成功')
              //   },
              // })
              wx.saveFile({
                tempFilePath: filePath,
                success: function (res) {
                  wx.showToast({
                    icon: 'success',
                    title:'success'
                  })
                  console.log(res)
                  
                  a[res.savedFilePath] = name
                  console.log(a)
                  wx.setStorage({
                    key: 'dict',
                    data: a,
                  })
                  that.setData({ array: a })
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
  open:function(event){
    console.log(event)
    
    wx.openDocument({
      filePath: event.target.dataset.url,
      success: function (res) {
        console.log('打开文档成功')
      },
    })
  },
  del:function(event){
    var that = this
    var url = event.target.dataset.url
    wx.showModal({
      title: 'Delete',
      content: '确定删除？',
      success: function (res) {
        if(res.confirm){
          wx.removeSavedFile({
            filePath: url,
            complete: function (res) {
              wx.showToast({
                title: 'Deleted!',
              })
              var a = that.data.array
              delete (a[url])
              that.setData({array:a})
              wx.setStorage({
                key: 'dict',
                data: a,
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
    var that =this
    // this.setData({array:wx.getStorageSync('dict')})
    wx.getStorage({
      key: 'dict',
      success: function(res) {
        
        that.setData({array:res.data})
        console.log(res)
      },
    })
    
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
        // console.log(res.data)
        that.setData({ downarray: res.data.data })
        
      },
      fail: function (res) {

      }
    })
    
  
    
    // wx.getSavedFileList({
    //   success: function (res) {
        
    //     // console.log(that.data.locarray)
    //   }
    // }) 


   
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