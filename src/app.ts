import { Component } from "react";
import "./app.scss";
import 'taro-skeleton/dist/index.css' // 引入组件样式

class App extends Component {
  componentDidMount() {}

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}

  // this.props.children 是将要会渲染的页面
  render() {
    return this.props.children;
  }
}

export default App;
