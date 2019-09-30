// pages/tab/tab.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    verifyflag:false,
    currenttab:0,
    no:'',
    playername:'',
    name: wx.getStorageSync('user'),
    array: ['甲', '头盔', '防撞裤', '主场球衣', '客场球衣', '牙套'],
    dict: { 甲: 'pad', 头盔: 'helmet', 防撞裤: 'pant', 主场球衣: 'homejersey', 客场球衣: 'guestjersey', 牙套: 'mouthguard' },
    
    multiIndex: [0, 0, 0, 0, 0, 0],
    array:[{
      name:'甲',
      select: ['无','租球队的','自己买的']
    },
      {
        name: '头盔',
        select: ['无', '租球队的', '自己买的']
      },
      {
        name: '防撞裤',
        select: ['无', '有']
      },{
        name: '主场球衣',
        select: ['无', '有']
      }, {
        name: '客场球衣',
        select: ['无', '有']
      }, {
        name: '牙套',
        select: ['无', '有']
      },
      ]


    


  },
  bindPickerChange: function (event) {
    var that = this
    var i = event.currentTarget.dataset.index
    var data = 'multiIndex['+i+']'
    var value = parseInt(event.detail.value)
    this.setData({ [data] : value })
    
      
  },
  noinput:function(event){
    this.setData({no:event.detail.value})
  },
  nameinput: function (event) {
    this.setData({ playername: event.detail.value })
  },
  bindChange:function(event){
    
    
      
    this.setData({currenttab:event.detail.current})
  }, 

  submit:function(event){
    var that = this;
    var name = wx.getStorageSync('user');
    
    var infos = wx.getStorageSync('userinfo').openId
    
  
    console.log(this.data.name)
    wx.showModal({
      title: 'SUBMIT',
      content: '确定要提交么?以上信息填写后。目前暂时只能联系队长修改',
      success: function(res) {
				if (res.confirm) {
          
          wx.request({
            url: 'https://jackyzs.com/weapp/info',
            method: 'POST',
            data: {
              equip: that.data.multiIndex,
              user: name,
              info: infos,
              num: that.data.no,
              player:that.data.playername,

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
              
              wx.setStorage({
                key: 'playerdata',
                data: res.data.data,
              })
              wx.redirectTo({
                url: '/pages/main/main',
              })
              // wx.navigateBack({
              // })
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
  catchTouchMove:function(res){
    if(this.data.verifyflag==true){
      return false
    }
    else{
      return true
    }
  },
  onLoad: function (options) {
    var that = this
    
    wx.getStorage({
      key: 'playerdata',
      success: function(res) {
        console.log(res.data)
        that.setData({ playername:res.data.name})
        that.setData({ no: res.data.number })
        that.setData({ currenttab: 1 })
        that.setData({verifyflag:true})
        // that.setData({ 'multiIndex[3]': 1 })
        // console.log(that.data.multiIndex)
        for (var i in that.data.array) {
          
          var item = 'multiIndex[' + i + ']';
          
          var itemname = res.data[that.data.dict[that.data.array[i].name]];
          
          
          that.setData({[item] : itemname})
         
        }
       
        




      },
      
  
        
      
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