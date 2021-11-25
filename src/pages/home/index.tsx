import { 
  ScrollView,
  View,
  Text,
  Image,
 } from "@tarojs/components";
import React from 'react'
import {  } from "taro-hooks";
import Taro from '@tarojs/taro'
import {styled} from 'linaria/react'
import './index.scss'
import Skeleton from 'taro-skeleton'
import 'taro-skeleton/dist/index.css' // 引入组件样式
import { TaroVirtualList } from 'taro-virtual-list'
import {useState,useEffect,useRef} from 'react'
import axios from 'taro-axios'
import {Router} from 'tarojs-router-next'
import { AtTabs, AtTabsPane,AtDrawer,AtIcon,AtAvatar,AtList, AtListItem } from 'taro-ui'
import "taro-ui/dist/style/components/tabs.scss";
import "taro-ui/dist/style/components/icon.scss";

import VirtualList from '@tarojs/components/virtual-list'

const Title = styled(View)<{
  active:boolean
}>`
 color:${({active})=>active?'red':'blue'}
`

const EmptyData = ()=>{
  const temp = []
  tabList.map((item,index)=>{
    temp[index] = [{loading:true}]
  })
  console.log('-=-=-=-=',temp);
  
  return temp
}

const Home = () => {
  const [pageDatas,setPageDatas] = useState(EmptyData)
  const pageRef = useRef(0)
  const loading = useRef(false)
  // useEffect(()=>{
  //   getNewsData(tabList[0].title,0)
  // },[])

  const getNewsData = (type:string,index:number,loadMore?:boolean)=>{
    console.log('1234');
    
    if (pageDatas[index].length > 1 && !loadMore){
      setCurrent(index)

      return
    }
    loading.current = true
    axios
      .get(`https://way.jd.com/jisuapi/get?channel=${type}&num=10&start=${pageRef.current}&appkey=7e9979a264855fff26bea74a253fee06`)
      .then(res => {
        console.log('res.data',res.data)

        let temp = [...pageDatas]
        const data = res.data.result.result.list

        data.map((item)=>{
          item.loading = false 
        })
        if (loadMore){
          temp[index] = temp[index].concat(data)
        }else {
          temp[index] = data
          setCurrent(index)
        }

        setPageDatas(temp)
        loading.current = false
      }).catch(()=>{
        loading.current = false
      })
  }

  const renderFunc = (item, index, pageIndex) => {
    return (
      <Skeleton loading={item.loading} avatar title row={2}>
        <View className="el">
          <View className="item">
            <Image mode="aspectFill" className="avatar" src={item.pic}></Image>
            <View className="itemRight">
              <Text className="title">{item.title}</Text>
              <Text className="des">{item.time}{item.src}</Text>
            </View>
          </View>
        </View>
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
    // if (index == ){
      getNewsData(tabList[index].title,index)
    // }
  }
 
  useEffect(()=>{    
    getNewsData(tabList[current].title,current)
  },[current])
  
  const [current,setCurrent] = useState(0)

  const Row = React.memo(({id, index, style, data}) => {
    const item = data[index]
    return (
      <Skeleton loading={item.loading} avatar title row={2}>
        <View className="el">
          <View className="item">
            <Image mode="aspectFill" className="avatar" src={item.pic}></Image>
            <View className="itemRight">
              <Text className="title">{item.title}</Text>
              <Text className="des">{item.time}{item.src}</Text>
            </View>
          </View>
        </View>
      </Skeleton>
    );
  })
  return (
    <View>
      <AtTabs scroll current={current} tabList={tabList} onClick={handleClick}>
        {
          pageDatas.map((item:any,index:number)=>{        
            console.log('======',index,item);
                
            return <AtTabsPane current={current} index={index} >
               {/* <TaroVirtualList
                  className="virtualist"
                  key={item.time+item.title}
                  list={item}
                  listType={'single'}
                  onRender={renderFunc}
                  onBottom={handleBottom}
                  onComplete={handleComplete}
                /> */}
              
              <VirtualList
                height={800}
                width='100%'
                itemData={item}
                itemCount={item.length}
                itemSize={100}
                overscanCount={6}
                onScroll={({ scrollDirection, scrollOffset }) => {
                  console.log('scrollOffset===',scrollOffset);
                  
                  // 距离底部20，加载下一页数据
                  if (scrollOffset != 0 && scrollOffset > item.length * 100 - 800 - 20 
                    && scrollDirection == 'forward'
                    && !loading.current){
                    console.log('加载更多');
                    pageRef.current = pageRef.current + 1

                    getNewsData(tabList[index].title,index,true)

                  }
                }}
                renderBottom={<Skeleton loading={true} avatar title row={2}></Skeleton>}
              >
                {Row}
              </VirtualList>

            </AtTabsPane>
          })
        }
      </AtTabs>
    </View>
   
  );
};

// https://docs.taro.zone/docs/virtual-list
// https://github.com/Rahim-Chan/taro-listview
// https://github.com/tingyuxuan2302/taro3-virtual-list 当前

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