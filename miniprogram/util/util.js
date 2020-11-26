const db=wx.cloud.database() 

 function star(inthe) {//封装获取数据
    return db.collection(inthe).doc({}).get().then(function (res) {
      return Promise.resolve(res.data) //返回数据
    })
  }
  // function data(index) {//查询语句
  //   return db.collection().doc(index).get().then(function (res) {
  //     return Promise.resolve(res.data) //返回数据
  //   })
  // }


module.exports = {
  star: star,
}