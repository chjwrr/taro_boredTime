import { 
  ScrollView,
  View,
  Text,
  Image,
  Button
 } from "@tarojs/components";
import Taro from '@tarojs/taro'
import {styled} from 'linaria/react'
import './index.scss'
import Skeleton from 'taro-skeleton'
import 'taro-skeleton/dist/index.css' // 引入组件样式
import { TaroVirtualList } from 'taro-virtual-list'
import {useState,useEffect} from 'react'
import axios from 'taro-axios'
import {Router} from 'tarojs-router-next'
import "taro-ui/dist/style/components/tabs.scss";
import "taro-ui/dist/style/components/icon.scss";
import React,{useRef} from 'react'

const Home = () => {

  const [imageList,setImageList] = useState([])

  const page = useRef(1)
  const loading = useRef(false)

  useEffect(()=>{
    getNewsData()
  },[])

  const getNewsData = ()=>{
    loading.current = true
    axios
    .get(`https://way.jd.com/showapi/tpxh?time=2015-07-10&page=${page.current}&maxResult=20&appkey=7e9979a264855fff26bea74a253fee06`)
    .then(res => {
      console.log('page.current==',page.current)
      console.log('res=',res);
      
      loading.current = false
      if(res.data.code == "10000"){        
        let temp = [...imageList]
        res.data.result.showapi_res_body.contentlist.map((item:any)=>{
          temp.push(item.img.replace('http://','https://'))
        })
        console.log('temp===',temp);
        
        setImageList(temp)
      }
    }).catch(()=>{  
      loading.current = false    
    })
  }
 
  const renderFunc = (item, index, pageIndex) => {
    
    return (
      <Skeleton loading={false} title >
        <Button key={item} className="itemView" onClick={()=>{          
          Taro.previewImage({
            current: item,
            urls: imageList
          })
        }}>
          <Image mode={'widthFix'} src={item}/>
        </Button>
      </Skeleton>
    )
  }
  const handleBottom = () => {
    console.log('触底了')
  }
  const handleComplete = () => {
    console.log('加载完成')
    if (!loading.current){      
      page.current += 1
      getNewsData()
    }
  }
 
  return (
    <View>
      <TaroVirtualList
        list={imageList}
        onRender={renderFunc}
        onBottom={handleBottom}
        onComplete={handleComplete}
        scrollViewProps={{
          style: {
            "height": '100vh',
          },
        }}
        onRenderBottom={()=><Skeleton loading={true} row={1} ></Skeleton>}
      />
    </View>
   
  );
};

export default Home;