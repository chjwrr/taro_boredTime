import { 
  ScrollView,
  View,
  Text
 } from "@tarojs/components";
import {  } from "taro-hooks";
import Taro from '@tarojs/taro'
import {styled} from 'linaria/react'
import './index.scss'
import {useState,useEffect} from 'react'
import axios from 'taro-axios'
import {Router,NavigateType} from 'tarojs-router-next'

const Splash = () => {
  const [content,setContent] = useState('')
  const [contentEn,setContentEn] = useState('')

  useEffect(()=>{

    axios
    .get('https://way.jd.com/jisuapi/get?channel=头条&num=10&start=0&appkey=7e9979a264855fff26bea74a253fee06')
    .then(res => {
      console.log('res.data',res.data)
      if (res.data.code == 200){
        setContentEn(res.data.newslist[0].en)
        setContent(res.data.newslist[0].zh)

        setTimeout(() => {
         Router.toHome({
          params: {
            params1:'1'
          },
          data: {
            title:'index',
            typeId:1
          },
          type:NavigateType.reLaunch
         })
        }, 3000);
      }
    })

  },[])

  return (
    <View>
      <Text>{contentEn}</Text>
      <Text>{content}</Text>
    </View>
   
  );
};

export default Splash;
