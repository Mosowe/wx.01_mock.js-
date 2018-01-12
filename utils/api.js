let API_HOST = "http://xxx.com/xxx";
let DEBUG = true;//切换数据入口
var Mock = require('mock.js')
function ajax(data = '', fn, method = "get", header = {}) {
  if (!DEBUG) {
    wx.request({
      url: config.API_HOST + data,
      method: method ? method : 'get',
      data: {},
      header: header ? header : { "Content-Type": "application/json" },
      success: function (res) {
        fn(res);
      }
    });
  } else {
    // 模拟数据
    var res = Mock.mock({
      'error_code': '',
      'error_msg': '',
      'data|50': [{
        'id|+1': 1,
        'img': "@image(320x240, #999999,#fff,pic)",   // 调用mock.js里面的image方法随机生成图片
        'title': '@ctitle(3,8)',                      // 调用mock.js里面的ctitle方法随机生成中文标题，参数（min，max），最短min个字，最长max个字
        'city': "@county(true)",                      // 调用mock.js里面的county方法随机生成一个（中国）县，参数：true:显示省市区，空：不显示省市区
        'stock_num': '@integer(0,100)',               // 
        'marketing_start': '@datetime()',             //
        'marketing_stop': '@now()',                   // 
        'price': '@integer(100,2000)',                //
        'original_price': '@integer(100,3000)'        // 
      }]
    })
    // 输出结果
    // console.log(JSON.stringify(res, null, 2))
    fn(res);
  }
}
module.exports = {
  ajax: ajax
}