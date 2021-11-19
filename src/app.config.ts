export default {
  pages: [
    "pages/home/index",
    "pages/image/index",
  ],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black",
  },
  tabBar:{
    color:"#000000",
    selectedColor:"red",
    list:[
     {
        pagePath:"pages/home/index",
        text:"新闻",
        // iconPath,
        // selectedIconPath
     },
     {
      pagePath:"pages/image/index",
      text:"图片",
      // iconPath,
      // selectedIconPath
     }
    ]
  }
};
