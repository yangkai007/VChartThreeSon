// miniprogram/pages/components/uphead/uphead.js
const app=getApp() //全局app
const db=wx.cloud.database() 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userPhone:''
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
    this.setData({
      userPhone:app.userInfo.userPhone,
    })
  },
// 头像
getToPhone(){
  console.log(3323);
  
  wx.chooseImage({
    count: 1,
    // ['original', 'compressed'] 原图  压缩图
    sizeType: ['compressed'],
    sourceType: ['album', 'camera'],
    success:(res) =>{
  console.log(122);

      // tempFilePath可以作为img标签的src属性显示图片
      const tempFilePaths = res.tempFilePaths[0]
      console.log("啊啊啊"+tempFilePaths);
      this.setData({
        userPhone:tempFilePaths
      })
      console.log(tempFilePaths);
    }
  })
},
handleBtn(){
  console.log(123123123123);
  
  wx.showLoading({
    title:'上传中~~~~~'
  })
  // 将本地资源上传至云存储空间，如果上传至同一路径则是覆盖写
  wx.cloud.uploadFile({
    cloudPath: 'index/aa.png',
    filePath: this.data.userPhone // 文件路径
  }).then(res => {
    // 将得到的fileID储存到数据库json里
    const fileID=res.fileID
    console.log(res.fileID)
    if(fileID){
      db.collection('users').doc(app.userInfo._id).update({
        // data 传入需要局部更新的数据
        data: {
          // 表示将 done 字段置为 true
          userPhone: fileID
        }
      }).then(res=>{
        console.log(res);
        
        wx.showLoading()
        wx.showToast({
          title: '修改成功',
        })
      })
    }

  }).catch(error => {
    // handle error
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