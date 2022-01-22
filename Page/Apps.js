import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, Image, Linking, ScrollView, TouchableOpacity,} from 'react-native';
import { Card, CardItem, Thumbnail, Icon, Left, Body } from 'native-base';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Entypo } from '@expo/vector-icons';
import Carousel from 'react-native-snap-carousel';
import LottieView from 'react-native-web-lottie';
import * as RootNavigation from '../RootNavigation.js';
import { csvText_to_json } from '../util/csvText_to_json.js';
import { RenderItem } from '../util/carouselTools.js';

function  EnvironmentNew(){
    if(window.navigator.userAgent.indexOf('iPhone') != -1)return "ios"
    else if(window.navigator.userAgent.indexOf('iPad')!= -1)return "ios"
    else return "android"
    
}

export default function Apps() {
    const [topCarousel,setCarousel] = useState(null);
    const [cardList,setCardList] = useState(undefined);
    const LottieRef3 = useRef(null);
    const LottieRef4 = useRef(null);
    useEffect(()=>{
        fetch("https://nexcloud.haruk.in/s/F9GTFEwnamzkQ5s/download/list.csv",{mode: "cors"})
        .then(response=>response.text())
        .then(text=>csvText_to_json(text))
        .then(json=>json.filter(d=>d.type == 'apps'))
        .then(data=>setCarousel(data));
    },[])
    useEffect(()=>{
        fetch("https://nexcloud.haruk.in/s/HPSENtDF7fkB378/download/appsList.csv",{mode: "cors"})
        .then(response=>response.text())
        .then(text=>csvText_to_json(text))
        .then(data=>setCardList(data));
    },[])
    useEffect(()=>{
        try{
          LottieRef3?.current.play();
          LottieRef4?.current.play();
          LottieRef3?.current.loop();
          LottieRef4?.current.loop();
        }catch(e){}
    })
    return (
        <View style={styles.container}>
            <View style={{height:wp("100%") > 800 ? hp("30%")+100 : ((wp("80%")/16) * 9)+100, minHeight:250 ,justifyContent: 'center',alignItems: 'center',backgroundColor:"#89C4D8"}}>
                <View style={{flexDirection:'row',height:70,width:wp("100%")-20}}>
                    <View style={{flex:1,flexDirection:"column"}}>
                        <View style={{flex:1}}/>
                        <TouchableOpacity onPress={() => Linking.openURL(".")} style={{flexDirection:"row",alignItems:"center"}}>
                            <Entypo name="chevron-thin-left" color={"white"} size={20} style={{margin:10,marginRight:5}}/>
                            {wp("100%")< 580 ? <Entypo name="home" color={"white"} size={20}/> : <Text style={{fontSize:20,color:"white"}}>ホームに戻る</Text>}
                        </TouchableOpacity>
                        <View style={{flex:1}}/>
                    </View>
                    <View style={{ flexDirection:"column",alignContent:"center",alignItems:"center"}}>
                        <View style={{flex:1}}/>
                        <View style={{flexDirection:'row',alignItems:"center"}}>
                            <Image source={require("../assets/HarukinLogo/Harukin_w.svg")} style={{height: 40,width: 180}}/>
                            <Text style={{fontSize: 30, color:"white"}} > Apps</Text>
                        </View>
                        <View style={{flex:1}}/>
                    </View>
                    <View style={{flex:1,flexDirection:"column",alignItems:"flex-end"}}/>
                </View>
                {topCarousel ? 
                <Carousel
                    layout={"default"}
                    data={topCarousel}
                    sliderWidth={wp("100%")}
                    itemWidth={wp("100%") > 800 ? (hp("30%")/9)*16 : wp("80%") }
                    layoutCardOffset={`18`}
                    renderItem={RenderItem}
                    autoplay={'true'}
                    loop={true} />
                :
                <View style={{backgroundColor:"white",height:wp("100%") > 800 ? hp("30%") : (wp("80%")/16) * 9,width: wp("100%") < 800 ? wp("80%") : (hp("30%")/9) * 16,marginBottom:25,alignItems:"center",alignContent:"center",alignSelf:"center"}}>
                    <View style={{flex:1}} />
                    <LottieView ref={LottieRef3} style={{ width: 150, height: 150, backgroundColor: 'white',}} source={require('../assets/51690-loading-diamonds.json')}/>
                    <View style={{flex:1}} />
                </View>
                }
                
            </View>
            <View style={{height:10}}/>
            <View style={{ display: "grid", gridTemplateColumns: wp("100%") > 1200 ? "1fr 1fr 1fr 1fr 1fr" : wp("100%") > 1000 ? "1fr 1fr 1fr 1fr" :wp("100%") > 800 ? "1fr 1fr 1fr" : wp("100%") > 600 ? "1fr 1fr":"1fr",margin:15 }}>
                {cardList ? 
                    cardList.map(v=>{
                        return (
                            <div style={{width:"100%",minWidth:200}} onClick={()=>Linking.openURL(EnvironmentNew() == "ios" ? v.iosUrl : v.androidUrl)}>
                                {wp("100%")>600?
                                <Card>
                                    <CardItem button cardBody>
                                        <Image source={v.image ? v.image : "https://nexcloud.haruk.in/s/8H8FfZNHsKFoWDn/preview"} style={{height: 200, width: null, flex: 1}}/>
                                    </CardItem>
                                    <CardItem button footer>
                                        <Text>{v.name}</Text>
                                    </CardItem>
                                    <CardItem button footer>
                                        <Text>{v.description}</Text>
                                    </CardItem>
                                    <CardItem button footer bordered>
                                        {DetectOSStatus(v.typeAndroid,v.typeIOS)}
                                    </CardItem>
                                </Card>
                                :
                                <Card>
                                    <CardItem button>
                                        <Left>
                                            <Thumbnail source={v.image} />
                                            <Body style={{marginLeft:10}}>
                                                <Text>{v.name}</Text>
                                                <Text>{v.description}</Text>
                                                {DetectOSStatus(v.typeAndroid,v.typeIOS)}
                                            </Body>
                                        </Left>
                                    </CardItem>   
                                </Card>
                                }
                            </div>
                        )
                    })
                    :
                    <div style={{width:'100%',minWidth:200}} >
                        {wp("100%")>600?
                        <Card>
                            <CardItem button cardBody>
                                <View style={{backgroundColor:"white",flex:1,alignItems:"center",alignContent:"center",alignSelf:"center"}}>
                                    <View style={{flex:1}} />
                                    <LottieView ref={LottieRef4} style={{ width: 200, height: 200, backgroundColor: 'white',}} source={require('../assets/51690-loading-diamonds.json')}/>
                                    <View style={{flex:1}} />
                                </View>
                            </CardItem>
                            <CardItem button footer>
                                <Text></Text>
                            </CardItem>
                            <CardItem button footer>
                                <Text></Text>
                            </CardItem>
                            <CardItem button footer bordered>
                                <Text>読み込み中....</Text>
                            </CardItem>
                        </Card>
                        :
                        <Card>
                            <CardItem button style={{flexDirection:"row"}}>
                                    <View style={{flex:1}} />
                                    <View style={{flexDirection:"column"}}>
                                        <View style={{flex:1}} />
                                        <LottieView ref={LottieRef4} style={{ width: 100, height: 100, backgroundColor: 'white',}} source={require('../assets/51690-loading-diamonds.json')}/>
                                        <View style={{flex:1}} />
                                    </View>
                                    <View style={{flex:1}} />
                            </CardItem>
                        </Card>
                        }
                    </div>
                }
            </View>
        </View>
    );
}



function DetectOSStatus(AS,iS){
    var AndroidText;
    var iOSText;
    switch(parseInt(AS)){
        case 0: AndroidText="未開発";break;
        case 1: AndroidText="一般公開中";break;
        case 2: AndroidText="βテスト中";break;
        case 3: AndroidText="開発終了";break;
    }
    switch(parseInt(iS)){
        case 0: iOSText="未開発";break;
        case 1: iOSText="一般公開中";break;
        case 2: iOSText="βテスト中";break;
        case 3: iOSText="開発終了";break;
    }
    return(
        <View style={{flexDirection: "row",alignItems:"center"}}>
            <Icon type="Entypo" name="google-play" />
            <Text>{AndroidText}</Text>
            <Icon type="Entypo" name="app-store" />
            <Text>{iOSText}</Text>
        </View>
    )
}

var styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
      backgroundColor: '#fff',
      justifyContent: 'center',
      alignItems: 'center',
    },
    content: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    loremIpsum: {
      fontSize: 24,
    },
  })
