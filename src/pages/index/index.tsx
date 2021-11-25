import { 
  ScrollView,
  View,
  Text,
  Image
 } from "@tarojs/components";
import Taro from '@tarojs/taro'
import {styled} from 'linaria/react'
import './index.scss'
import {useState,useEffect,useLayoutEffect} from 'react'
import axios from 'taro-axios'
import {Router,NavigateType} from 'tarojs-router-next'
import NavBar from '../../components/NavBar'

const Splash = () => {
  const [content,setContent] = useState('')
  const [chContent,setCnContent] = useState('')
  const [time,setTime] = useState(5)

  useLayoutEffect(()=>{
    // Taro.setNavigationBarColor({
    //   frontColor: '#ffffff',
    //   backgroundColor: '#ff0000',
    //   animation: {
    //       duration: 400,
    //       timingFunc: 'easeIn'
    //   }  
    // })
    
  })

  useEffect(()=>{
    const hour = new Date().getHours()
    if (hour >= 5 && hour <= 9){
      axios
      .get('https://api.tianapi.com/zaoan/index?key=bee76a2202b7c21dd90c5163cb8b4506')
      .then(res => {
        console.log('resdfasdfasds=',res);
        if (res.data.code == 200 && res.data.newslist.length > 0){
          setContent(res.data.newslist[0].content)
        }
        jumpHome()
      }).catch(()=>{  
        jumpHome()
      })
    }else if (hour >= 18 && hour <= 24){
      axios
      .get('https://api.tianapi.com/wanan/index?key=bee76a2202b7c21dd90c5163cb8b4506')
      .then(res => {
        console.log('resdfasdfa1111111sds=',res);
        if (res.data.code == 200 && res.data.newslist.length > 0){
          setContent(res.data.newslist[0].content)
        }
        jumpHome()
      }).catch(()=>{  
        jumpHome()
      })
    }else {
      axios
      .get('https://api.tianapi.com/txapi/ensentence/index?key=bee76a2202b7c21dd90c5163cb8b4506')
      .then(res => {
        console.log('resdfasdfa111333331111sds=',res);
        if (res.data.code == 200 && res.data.newslist.length > 0){
          setContent(res.data.newslist[0].en)
          setCnContent(res.data.newslist[0].zh)
        }     
        jumpHome()
      }).catch(()=>{  
        jumpHome()
      })
    }
  },[])

  function jumpHome(){
    let temp = time
    let interval = setInterval(()=>{
      if (temp <= 1){
        interval && clearInterval(interval)
        Router.toKitchen({
        type:NavigateType.reLaunch
        })
      }
      temp --
    setTime((pre)=>pre - 1)
    },1000)
  }

  return (
    <View className="contain">
      {/* <NavBar title={'标题'}/> */}
      <Text className="content">{content}</Text>
      <Text className="content">{chContent}</Text>
      <View className="countdown">{time}s</View>
    </View>
   
  );
};

export default Splash;
