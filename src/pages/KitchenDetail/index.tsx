import { 
  View,
  Text,
  Button,
  Image,
  RichText
 } from "@tarojs/components";
import {styled} from 'linaria/react'
import './index.scss'
import {useState,useEffect,useLayoutEffect,useRef} from 'react'
import axios from 'taro-axios'
import {Router} from 'tarojs-router-next'
import Taro from '@tarojs/taro'
import { FlexView,FlexRowView,FlexColumnView,FlexRowFitView, FlexRowBetweenView,FlexRowWrapView, FlexRowCenterView } from "../../components/FlexView";
import { AtInput }  from 'taro-ui'
import { TaroVirtualList } from 'taro-virtual-list'
import Skeleton from 'taro-skeleton'
import MusicPng from '../../assets/imags/menu_music.png'
const KitchenDetail = () => {
  let info = Router.getData()
  Taro.setNavigationBarTitle({
    title:info.name
  })
  console.log('info===',info);
  let tags = info.tag.split(',')
  return (
    <FlexView>
      <Image className="itemImage" src={info.pic.replace('http:','https:')}/>
      <FlexRowWrapView>
        {
          tags.map((item,index)=>{
            return <FlexRowFitView className="tag" key={index}>
              <Text className="itemDes">{item}</Text>
            </FlexRowFitView>
          })
        }
      </FlexRowWrapView>
     <FlexColumnView className="downView">
      <RichText className="itemContent" nodes={info.content}></RichText>
      <Text className="itemTitle">食材清单</Text>
      {
        info.material.map((item,index)=>{
          return <FlexRowBetweenView key={index}>
            <Text className="itemLeft">{item.mname}</Text>
            <Text className="itemRight">{item.amount}</Text>
          </FlexRowBetweenView>
        })
      }
      <Text className="itemTitle">烹饪步骤</Text>
      {
        info.process.map((item,index)=>{
          return <FlexColumnView key={index}>
            <FlexRowCenterView>
              <Image mode="heightFix" className="downImage" src={item.pic.replace('http:','https:')}/>
            </FlexRowCenterView>
            <Text className="itemShow">{item.pcontent.replaceAll('<br />','')}</Text>
          </FlexColumnView>
        })
      }
     </FlexColumnView>
    </FlexView>
  );
};

export default KitchenDetail;
