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

const CardsMain = [];
const CardsSub = [];
var carouselItems=[
    {title:"JR四国アプリが更にパワーアップ！",text: "予讃線内経由表示が可能となりました！！詳細はこちらから！",image:require("../assets/news/JRShikoku.png"),URL:"?page=Apps&app_id=JRShikoku"},
    ];

function  Environment(){
    if(window.navigator.userAgent.indexOf('iPhone') != -1)return true
    
    else if(window.navigator.userAgent.indexOf('iPad')!= -1)return true
    
    else return false
    
}
var CreateCardData=[
    {url: () => Linking.openURL("?page=Apps&app_id=JRShikoku"),image:require("../assets/Apps/JRS.png"),title:"JR四国列車運行情報表示アプリ",description:"JR四国の列車運行状況ビューワーです。JR四国公式サイトで公開されているページを表示するだけのアプリになっております。",A:1,i:2},
    {url: () => Environment() ? Linking.openURL("https://apps.apple.com/us/app/ファミマ店員用揚げ物製作支援アプリ/id1488118221"):Linking.openURL("https://play.google.com/store/apps/details?id=familymart_toolkit.xprocess.hrkn"),image:require("../assets/Apps/fm.png"),title:"ファミマ揚げ物支援アプリ",description:"ファミマでバイトしている人のためのホットスナック製作支援ツールです。ホットスナックを作るタスク管理、時間を簡単に扱うことができます。",A:1,i:1},
    {url: () => Environment() ? RootNavigation.navigate("404"): Linking.openURL("https://play.google.com/store/apps/details?id=plusclient.xprocess.hrkn"),image:require("../assets/Apps/HKblankApp.png"),title:"Harukin+クライアント",description:"",A:2,i:0},
]
var CreateCardData2=[
    {url: () => Environment() ? RootNavigation.navigate("404") : Linking.openURL("https://play.google.com/store/apps/details?id=qsqt.xproject.hrkn"),image:require("../assets/Apps/qsqt.png"),title:"QSQT",description:"",A:1,i:0},
    {url: () => Environment() ? RootNavigation.navigate("404") : Linking.openURL("https://play.google.com/store/apps/details?id=atumori.xprocess.hrkn"),image:require("../assets/Apps/atsumori.png"),title:"熱盛",description:"",A:1,i:0},
    {url: () => Environment() ? RootNavigation.navigate("404") : Linking.openURL("https://play.google.com/store/apps/details?id=toeicandaken.xprocess.hrkn"),image:require("../assets/Apps/HKblankApp.png"),title:"ABCDメモ帳",description:"",A:1,i:0},
    {url: () => Environment() ? RootNavigation.navigate("404") : Linking.openURL("https://play.google.com/store/apps/details?id=sqm.xprocess.hrkn"),image:require("../assets/Apps/HKblankApp.png"),title:"コピってなんでもQあ〜る",description:"",A:1,i:0},
    {url: () => Environment() ? RootNavigation.navigate("404") : Linking.openURL("https://play.google.com/store/apps/details?id=mstdn.yzu.org.xprocess.hrkn"),image:require("../assets/Apps/HKblankApp.png"),title:"Yづクライアント",description:"",A:1,i:0},
    {url: () => Environment() ? RootNavigation.navigate("404") : Linking.openURL("https://play.google.com/store/apps/details?id=tanddpay.xprocess.hrkn"),image:require("../assets/Apps/HKblankApp.png"),title:"ファミマ特攻T&D",description:"",A:1,i:0},
]
    

export default function Apps() {
    const [topCarousel,setCarousel] = useState(null);
    const LottieRef3 = useRef(null);
    useEffect(()=>{
        ContentsCardBase();
        fetch("https://nexcloud.haruk.in/s/F9GTFEwnamzkQ5s/download/list.csv",{mode: "cors"})
        .then(response=>response.text())
        .then(text=>csvText_to_json(text))
        .then(json=>json.filter(d=>d.type == 'apps'))
        .then(data=>setCarousel(data));
    },[])
    useEffect(()=>{
        try{
          LottieRef3?.current.play();
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
            <Text>真面目に製作中</Text>
            <ScrollView horizontal={wp("100%")>800?true:false}>
                {CardsMain}
            </ScrollView>
            <Text>Tasker製の黒歴史(更新しない)</Text>
            <ScrollView horizontal={wp("100%")>800?true:false}>
                {CardsSub}
            </ScrollView>
        </View>
    );
}

function ContentsCardBase(){
    CreateCardData.forEach(function(D){
        CardsMain.push(
            <div style={{width:wp("100%")>800?wp("85%")/4:wp("100%"),minWidth:200}} onClick={D.url}>
                {wp("100%")>800?
                <Card>
                    <CardItem cardBody button >
                        <Image source={D.image} style={{height: 200, width: null, flex: 1}}/>
                    </CardItem>
                    <CardItem button  footer>
                        <Text>{D.title}</Text>
                    </CardItem>
                    <CardItem button  footer>
                        <Text>{D.description}</Text>
                    </CardItem>
                    <CardItem button  footer bordered>
                        {DetectOSStatus(D.A,D.i)}
                    </CardItem>
                </Card>
                :
                <Card>
                    <CardItem button >
                        <Left>
                            <Thumbnail source={D.image} />
                            <Body>
                                <Text>{D.title}</Text>
                                <Text>{D.description}</Text>
                                {DetectOSStatus(D.A,D.i)}
                            </Body>
                        </Left>
                    </CardItem>   
                </Card>
                }
            </div>
        )
    })
    CreateCardData2.forEach(function(D){
        CardsSub.push(
            <div style={{width:wp("100%")>800?wp("85%")/4:wp("100%"),minWidth:200}} onClick={D.url}>
                {wp("100%")>800?
                <Card>
                    <CardItem button cardBody>
                        <Image source={D.image} style={{height: 200, width: null, flex: 1}}/>
                    </CardItem>
                    <CardItem  button footer>
                        <Text>{D.title}</Text>
                    </CardItem>
                    <CardItem  button footer>
                        <Text>{D.description}</Text>
                    </CardItem>
                    <CardItem  button footer bordered>
                        {DetectOSStatus(D.A,D.i)}
                    </CardItem>
                </Card>
                :
                <Card>
                    <CardItem button>
                        <Left>
                            <Thumbnail source={D.image} />
                            <Body>
                                <Text>{D.title}</Text>
                                <Text>{D.description}</Text>
                                {DetectOSStatus(D.A,D.i)}
                            </Body>
                        </Left>
                    </CardItem>   
                </Card>
                }
            </div>
        )
    })
}


function DetectOSStatus(AS,iS){
    var AndroidText;
    var iOSText;
    switch(AS){
        case 0: AndroidText="未開発";break;
        case 1: AndroidText="一般公開中";break;
        case 2: AndroidText="βテスト中";break;
    }
    switch(iS){
        case 0: iOSText="未開発";break;
        case 1: iOSText="一般公開中";break;
        case 2: iOSText="βテスト中";break;
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

function renderItem({item}){
    return (
        <Card style={{backgroundColor:'floralwhite',borderRadius: 5, Height:hp("30%"),justifyContent: "flex-start",flexDirection:"column-reverse"}} onClick={() => Linking.openURL(item.URL)}>
            <CardItem button cardBody style={{height: hp("30%"),width: "100%",top:0,position:"absolute"}}>
                <Image source={item.image} style={{height: hp("30%"),width: "100%",top:0,position:"absolute"}}/>
            </CardItem>
            <CardItem button footer bordered style={{marginTop:"auto"}}>
                <Text>{item.text}</Text>
            </CardItem>
            <CardItem button cardBody style={{marginTop:"auto"}}>
                <Text style={{fontSize: 20,margin:8}}>{item.title}</Text>
            </CardItem>
        </Card>
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
