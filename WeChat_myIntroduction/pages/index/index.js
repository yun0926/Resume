//index.js
//获取应用实例

var sha1 = require("../../utils/sha1.js");
var app = getApp()
Page({
  data: {
    location: '位置不明',
    weather:"雾霾",
    array:["刘海云",24,"女","18842646955","18842646955@163.com","二年"],
    key:[,"性别","年龄","电话","邮箱","现居地"],
    name:["姓名："],
  },
  callphone:function(){
    wx.makePhoneCall({
      phoneNumber: '18842646955'
    })
  },
  onLoad: function () {
    var that = this
    wx.getLocation({
      type: 'wgs84',
      success: function(res) {
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy
        translateAddress(latitude,longitude)
      }
    })
    var now = Date.now();
    var appId = "A6931668884431";
    var appKey = "11475575-F9D0-D5EC-D14D-2F2DE3503DA8";
    appKey = sha1.hex_sha1(appId+"UZ"+appKey+"UZ"+now)+"."+now

    wx.request({
      url: "https://d.apicloud.com/mcm/api/shop?filter=%7B%22where%22%3A%7B%7D%2C%22skip%22%3A0%2C%22limit%22%3A20%7D",
      header: {
        "X-APICloud-AppId": appId,
        "X-APICloud-AppKey": appKey
      },
      type: "GET",
      success:function (res) {
         that.setData({
              shop_info_list:res.data
            })
      },
      fail:function (err) {
        console.log(err);
      }
    })
    function translateAddress(lat,lng){
        wx.request({
          type: "GET",
          url:"https://api.map.baidu.com/geocoder/v2/?output=json&pois=0",
          data:{
            ak:"3mOpzQemQA95gDM2PVSft1lFtb1E3deG",
            location: lat + "," + lng
          },
          success: function(res){  
            that.setData({
              location:res.data.result.formatted_address
            })
         },  
         fail: function(){  
             console.log('fail');  
         }
        });
      }
  }
})
