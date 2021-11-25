import { 
  ScrollView,
  View,
  Text
 } from "@tarojs/components";
import Taro from '@tarojs/taro'
import {styled} from 'linaria/react'
import './index.scss'
import {useState,useEffect,useLayoutEffect} from 'react'
import axios from 'taro-axios'
import {Router,NavigateType} from 'tarojs-router-next'

const NavBar = ({title}:any) => {
  return (
    <View className="navbar" style={{
      marginTop:Taro.$navBarMarginTop
    }}>
      <Text className="title">{title}</Text>
    </View>
   
  );
};

export default NavBar;
