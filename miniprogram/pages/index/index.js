//index.js
//获取应用实例

const db=wx.cloud.database() //使用云函数
const app=getApp() //全局app
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userPhone:'',
    motto: "猫",
    userName:''
  },
  //用户登录
  bindGetUserInfo:function(e){
    // console.log(12314142+e);
    
    const userInfo = e.detail.userInfo
    if(!this.data.canIUse && userInfo){
      db.collection('users').add({
        data:{
          userPhone:userInfo.avatarUrl,
          userName:userInfo.nickName,
          gender:userInfo.gender
        }
      }).then(res => {
        db.collection('users').doc(res._id).get().then(res => { //单条查询id
          app.userInfo = Object.assign(app.userInfo,res.data)
          //2.将数据设置到this.data
          this.setData({
            userPhone:app.userInfo.userPhone,
            userName:app.userInfo.userName,
            canIUse:true
          })
        })
      }).catch(err =>{
        console.log(err);
        
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
  },

  goimgs:function(){
    wx.navigateTo({
      url: '../../pages/components/uphead/uphead',
    })
  },

/**
 * 生命周期函数--监听页面初次渲染完成
 */
// 自动登录
onReady: function () {

// 查找数据库信息 使用云函数
wx.cloud.callFunction({
  // 云函数名称
  name: 'login',
  // 传给云函数的参数
  data: {},
})
.then(res => {
  // console.log(res.result.openid) //
  const openid=res.result.openid
  db.collection('users').where({
    _openid:openid
  }).get().then(res=>{
    app.userInfo=Object.assign(app.userInfo,res.data[0])
    
    console.log(app.userInfo);
    console.log(Object.assign(app.userInfo,res.data[0]));
    
    this.setData({
      userPhone:app.userInfo.userPhone,
      userName:app.userInfo.userName,
      canIUse:true
    })

  })

})
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
