import { 
  View,
  Text,
  Button,
  Image
 } from "@tarojs/components";
import {styled} from 'linaria/react'
import './index.scss'
import {useState,useEffect,useLayoutEffect,useRef} from 'react'
import axios from 'taro-axios'
import {Router} from 'tarojs-router-next'
import Taro from '@tarojs/taro'
import { FlexView,FlexRowView,FlexColumnView,FlexRowCenterView, FlexRowBetweenView } from "../../components/FlexView";
import { AtInput }  from 'taro-ui'
import { TaroVirtualList } from 'taro-virtual-list'
import Skeleton from 'taro-skeleton'

import PauseImage from '../../assets/imags/pause_icon.png'
import PlayImage from '../../assets/imags/play_icon.png'


const kitchen = () => {
  const [value,setValue] = useState('')
  const [word,setWord] = useState('')
  const [musicInfo,setMusicInfo] = useState()
  const [imageAnimation,setImageAnimation] = useState({})
  const [list,setList]=useState([])
  const isClear = useRef(false)
  const isLoading = useRef(false)

  const innerAudioContext = useRef(Taro.createInnerAudioContext())
  useLayoutEffect(()=>{
    Taro.hideHomeButton()
  })
  useEffect(()=>{
    
    axios
    .get('https://v2.alapi.cn/api/hitokoto?token=QAmJCzjq1B8v1eAh')
    .then(res => {
      if (res.data.code == 200){
        setWord(res.data.data.hitokoto)
      }
    }).catch(()=>{  
    })
    getMusic()
  },[])

  function getMusic(){
     // 热歌榜，新歌榜，飙升榜，抖音榜，电音榜
     axios
     .get('https://api.uomg.com/api/rand.music?sort=电音榜&format=json')
     .then(res => {
       console.log('res=',res);
      if (res.data.code == 1){
       setMusicInfo(res.data.data)

        innerAudioContext.current.autoplay = true
        innerAudioContext.current.loop = true
        innerAudioContext.current.src = res.data.data.url.replace('http:','https:')
        innerAudioContext.current.onPlay(() => {
          console.log('开始播放')
        })
        innerAudioContext.current.onError((res) => {
          console.log(res.errMsg)
          console.log(res.errCode)
        })
      }
     }).catch(()=>{  
     })
  }

  function showAnimation(){
    let animation = Taro.createAnimation({
      // 动画持续时间，单位ms，默认值 400
      duration: 2000, 
      timingFunction: 'linear',
      // 延迟多长时间开始
      delay: 0,
      // transformOrigin: "left center",
    })
    animation
    .rotateZ(360).step()
    .opacity(0).step()
    setImageAnimation(animation.export())
  }

  const handleChange = (value)=>{
    setValue(value)
    console.log('value',value);
    
  }

  function searchData(){
    isLoading.current = true
    axios
    .get(`https://way.jd.com/jisuapi/search?keyword=${value}&num=20&start=${isClear.current ? 0 : list.length}&appkey=7e9979a264855fff26bea74a253fee06`)
    .then(res => {
      console.log('res=',res);
      if(res.data.code == "10000"){
        if (isClear.current){
          isClear.current = false
          setList(res.data.result.result.list)
        }else {
          setList(list.concat(res.data.result.result.list))
        }
      }
      Taro.hideLoading()
      isLoading.current = false
    }).catch(()=>{  
      isLoading.current = false
      Taro.hideLoading()
    })
  }

  const renderFunc = (item, index, pageIndex) => {
    return (
      <FlexColumnView className="item" onClick={()=>{          
       Router.toKitchenDetail({
         data:item
       })
      }}>
        <Image className="itemImage" src={item.pic.replace('http:','https:')}/>
        <FlexRowBetweenView>
          <Text className="itemDes">{item.cookingtime}</Text>
          <Text className="itemTitle">{item.name}</Text>
          <Text className="itemDes">{item.peoplenum}</Text>
        </FlexRowBetweenView>
        <View className="spaceLine"></View>
      </FlexColumnView>
    )
  }
  const handleBottom = () => {
    console.log('触底了')
  }
  const handleComplete = () => {
    console.log('加载完成')
    if (!isLoading.current){
      searchData()
    }
  }

  return (
    <FlexView style={{position:'relative'}}>
      <FlexRowView>
        <AtInput
          className="input"
          name='value'
          type='text'
          placeholder='想要做的菜品~'
          value={value}
          onChange={handleChange}
        />
        <View onClick={()=>{
          isClear.current = true
          Taro.showLoading()
          searchData()
        }} className="button">搜索</View>
      </FlexRowView>
      <FlexRowView className="word">{word}</FlexRowView>
     {
       list.length > 0 && <TaroVirtualList
       list={list}
       onRender={renderFunc}
       onBottom={handleBottom}
       onComplete={handleComplete}
       onRenderBottom={()=><Skeleton loading={true} row={1} ></Skeleton>}
       autoScrollTop={false}
       scrollViewProps={{
        style: {
          "height": '700px',
        },
      }}
     />
     }
     {
      musicInfo && <PauseView innerAudioContext={innerAudioContext.current}/>
      }
      {
        musicInfo && <View className="music" onClick={getMusic}>
          <Image  className="picImage" src={musicInfo.picurl.replace('http:','https:')}/>
        </View>
      }

    </FlexView>
  );
};
function PauseView({innerAudioContext}:any){
  const [pause,setPause] = useState(false)
  return <View className="musicClose" onClick={()=>{
    if (pause){
      innerAudioContext.play()
    }else {
      innerAudioContext.pause()
    }
    setPause(!pause)
  }}>
    <Image className="pauseImage" src={pause ? PlayImage : PauseImage}/>
  </View>
}

export default kitchen;
