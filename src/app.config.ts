export default {
  pages: ["pages/index/index"],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black",
  },
  tabBar: {
    list: [{
      pagePath: 'pages/index/index',
      text: '最新'
    }, {
      pagePath: 'pages/index/index',
      text: '热门'
    }, {
      pagePath: 'pages/index/index',
      text: '节点'
    }],
    'color': '#000',
    'selectedColor': '#56abe4',
    'backgroundColor': '#fff',
    'borderStyle': 'white'
  },
};
