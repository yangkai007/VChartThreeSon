// pages/homepage/homepage.js
const db=wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    ThreeSongShop:[]
  },


  // 跳转详情
  goDetails:function(id){
    console.log(id);
    console.log(id.currentTarget.dataset.name);
    wx.navigateTo({
      url: '../details/details?id='+id.currentTarget.dataset.name+'&data='+id.currentTarget.dataset.data,
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
db.collection("ThreeSongShop").doc({}).get().then(res=>{
      // console.log(res);
      this.setData({
        ThreeSongShop:res.data.data
      })
      // console.log(res.data.data[0].img);  
    })
    // console.log(res+'asdasd');
    
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