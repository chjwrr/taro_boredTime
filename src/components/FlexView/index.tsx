import { 
  View,
 } from "@tarojs/components";
import Taro from '@tarojs/taro'
import {styled} from 'linaria/react'

export const FlexView = styled(View)`
 flex:1;
 width:100%;
 height:100%;
`
export const FlexRowView = styled(View)`
 width:100%;
 display:flex;
 flex-direction:row;
 align-items:center
`
export const FlexRowBetweenView = styled(FlexRowView)`
 justify-content:space-between
`
export const FlexRowWrapView = styled(FlexRowView)`
  flex-wrap: wrap;
`
export const FlexRowCenterView = styled(FlexRowView)`
 justify-content:center
`
export const FlexRowFitView = styled(FlexRowView)`
  width:fit-content
`
export const FlexColumnView = styled(FlexRowView)`
 width:100%;
 display:flex;
 flex-direction:column;
 align-items:flex-start
`