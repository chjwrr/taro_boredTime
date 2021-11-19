import { 
  ScrollView,
  View,
  Text
 } from "@tarojs/components";
import {  } from "taro-hooks";
import Taro from '@tarojs/taro'
import {styled} from 'linaria/react'
import './index.scss'
import Skeleton from 'taro-skeleton'
import 'taro-skeleton/dist/index.css' // 引入组件样式
import { TaroVirtualList } from 'taro-virtual-list'
import {useState,useEffect} from 'react'
import axios from 'taro-axios'
import {Router} from 'tarojs-router-next'
import { AtTabs, AtTabsPane,AtDrawer,AtIcon } from 'taro-ui'
import "taro-ui/dist/style/components/tabs.scss";
import "taro-ui/dist/style/components/icon.scss";

const Title = styled(View)<{
  active:boolean
}>`
 color:${({active})=>active?'red':'blue'}
`

const Home = () => {
  const [pageDatas,setPageDatas] = useState([])

  useEffect(()=>{
    getNewsData(tabList[0].title,0)
  },[])

  const getNewsData = (type:string,index:number)=>{
    
    axios
      .get('http://api.wpbom.com/api/wallpa.php?msg=4')
      .then(res => {
        console.log('res.data',res.data)


      })
  }

  const renderFunc = (item, index, pageIndex) => {
    return (
      <Skeleton loading={true} avatar title row={2}>
        <View className="el">{`当前是第${item}个元素，是第${pageIndex}页的数据`}</View>
      </Skeleton>
    )
  }
  const handleBottom = () => {
    console.log('触底了')
  }
  const handleComplete = () => {
    console.log('加载完成')
  }
  const onScrollToLower = ()=>{
    console.log('分页加载')
  }
  
  const handleClick = (index:number)=>{
    console.log('index==',index);
    setCurrent(index)
  }
 
  
  const [current,setCurrent] = useState(0)

  return (
    <View>
<TaroVirtualList
                list={[1,2,3,4,5]}
                listType={'single'}
                onRender={renderFunc}
                onBottom={handleBottom}
                onComplete={handleComplete}
              />
    </View>
   
  );
};

export default Home;

const tabList = [
  {title:'头条'},
  {title:'新闻'},
  {title:'国内'},
  {title:'国际'},
  {title:'政治'},
  {title:'财经'},
  {title:'体育'},
  {title:'娱乐'},
  {title:'军事'},
  {title:'教育'},
  {title:'科技'},
  {title:'NBA'},
  {title:'股票'},
  {title:'星座'},
  {title:'女性'},
  {title:'健康'},
  {title:'育儿'}]