import { 
  ScrollView,
  View
 } from "@tarojs/components";
import {  } from "taro-hooks";
import Taro from '@tarojs/taro'
import {styled} from 'linaria/react'
import './index.scss'

const Title = styled(View)<{
  active:boolean
}>`
 color:${({active})=>active?'red':'blue'}
`

const Index = () => {

  return (
    <ScrollView
        className='scrollview'
        scrollY
        scrollWithAnimation
        scrollTop={0}
      >
        <Title active={true}>1234</Title> 
        <Title active={false}>1234</Title> 
      </ScrollView>
   
  );
};

export default Index;
