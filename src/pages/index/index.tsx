import { 
  ScrollView
 } from "@tarojs/components";
import {  } from "taro-hooks";
import Taro from '@tarojs/taro'
import './index.scss'

const Index = () => {

  return (
    <ScrollView
        className='scrollview'
        scrollY
        scrollWithAnimation
        scrollTop={0}
      >
      </ScrollView>
   
  );
};

export default Index;
