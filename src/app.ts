import { Component } from "react";
import "./app.scss";
import Taro from '@tarojs/taro'

class App extends Component {
  componentDidMount() {

    Taro.getSystemInfo({})
    .then(res  => {     
      Taro.$navBarMarginTop =  res.statusBarHeight || 0
      Taro.$windowWidth =  res.windowWidth || 0
      Taro.$windowHeight =  res.windowHeight || 0
    })
  }

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}

  // this.props.children 是将要会渲染的页面
  render() {
    return this.props.children;
  }
}

export default App;
