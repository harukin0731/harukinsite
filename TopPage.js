import React from 'react';
import { StyleSheet, Text, View, Button, Image, Linking, ScrollView, TouchableOpacity,} from 'react-native';
import CollapsibleToolbar from 'react-native-collapsible-toolbar';
import { Platform } from 'react-native';
import { Accordion,Card, CardItem, Thumbnail, Icon, Left, Body } from 'native-base';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Entypo } from '@expo/vector-icons';
import { Line } from 'rc-progress';
import Carousel from 'react-native-snap-carousel';
import * as RootNavigation from './RootNavigation.js';
const NotiData = [];
const Cards = [];
const 進捗data=[];
//上部配置
var TopItems=[
    {image:require("./assets/CardView/jrshikoku.png"),  URL:"JRShikoku"},
    {image:require("./assets/CardView/fm.png"),         URL:"fm"},
]
//メインのコンテンツカード(直下)作成
const ContentsCardData=[
    {image:"./assets/HK.png",       URL:() => RootNavigation.navigate("Web"),           name:"OSS鯖建て"},
    {image:"./assets/Appslogo.png", URL:() => RootNavigation.navigate("Apps"),          name:"アプリ製作"},
    {image:"./assets/bloglogo.png", URL:() => Linking.openURL("http://blog.haruk.in"),  name:"ブログ"},
]
//更新情報
var NotiDataItems=[
    {title:"JR四国アプリが更にパワーアップ！",  text: "予讃線内経由表示が可能となりました！！詳細はこちらから！",   image:require("./assets/news/JRShikoku.png"),   URL:"JRShikoku"},
    {title:"haruk.inサイトをフル更新しました！",text: "ヌルヌル動くリッチなサイトを目指しました！",                 image:require("./assets/HK.png"),               URL:"404"},
    {title:"Harukin+の稼働予定について",        text: "現在Harukin+は停止状態にあります。",                         image:require("./assets/HK.png"),               URL:"404"},
]
//進捗情報ベース
const 進捗dataAll =[
    {title: "ファミマ揚げ物アプリ", ps:100, additional:null},
    {title: "JR四国アプリ",         ps:40,  additional:"JR四国data"},
    {title: "Harukin+",             ps:20,  additional:"HarukinPlusData"},
    {title: "このサイト",           ps:25,  additional:"HarukinSiteData"},
]
//以下additionalデータ。無効表示になっているがevalで読むので問題無し
const JR四国data = [
    { title: "通知対応",                    content: "付近の運行状況に問題がある時通知を送信",  count:20 },
    { title: "各種オンオフスイッチ実装",    content: "各種機能を有効無効化させるスイッチ",      count:0 },
    { title: "車番実装",                    content: "各列車に列車の種別方向を表示",            count:70 },
    ];
const HarukinPlusData = [
    { title: "通知対応",                    content: "付近の運行状況に問題がある時通知を送信",  count:0 },
    { title: "ReactNativeテーマ実装",       content: "全く新しいReactNativeをテーマに採用",     count:0 },
    { title: "日本語化",                    content: "実用的な日本語翻訳",                      count:90 },
    { title: "PlusFutureテーマの製作",      content: "Google+をモチーフにしたテーマ製作",       count:60 },
    ];
const HarukinSiteData = [
    { title: "TopPage",                     content: "トップページの製作",                      count:95 },
    { title: "Apps",                        content: "Appsページの製作",                        count:60 },
    { title: "Service",                     content: "webサービスページの製作",                 count:0 },
    { title: "Aboutme",                     content: "連絡先ページの製作",                      count:30 },
    { title: "Xprocess",                    content: "Xprocessのページの製作",                  count:0 },
    ];

    //メインコンポーネント
    //****************** */
export function TopPage({navigation}) {
    Cards.length ? null : ContentsCardBase();
    return (
        <View style={styles.container}>
            <CollapsibleToolbar
                renderToolBar={()=>とっぷ画像()}
                renderNavBar={()=>とっぷなびばー(navigation)}
                renderContent={()=>なかみ()}
                collapsedNavBarBackgroundColor='#AAAA04'
                translucentStatusBar={Platform.Version >= 21}
                toolBarHeight={300}
            />
        </View>
    );
}
    //メインコンポーネント
    //****************** */

function ContentsCardBase(){
    ContentsCardData.forEach(function (D){
        Cards.push(
            <TouchableOpacity 
            style={{width:(wp("99%")/3)-10,
                    margin:0,
                    padding:0,
                    borderStyle:"solid",
                    borderColor:"blue",
                    borderWidth:1,
                    alignItems:"center"}} 
            onPress={D.URL}>
                <View style={{borderStyle:"solid",borderColor:"blue",borderWidth:1, alignItems:"center"}}>
                    <Entypo name="globe" color={"black"} size={25} style={{margin:10}}/>
                    <Text>{D.name}</Text>
                </View>
            </TouchableOpacity>
        )
    })
    NotiDataItems.forEach(function (Noti){
        NotiData.push(
            <TouchableOpacity onPress={() => RootNavigation.navigate(Noti.URL)}>
                <CardItem bordered>
                    <Left>
                        <Thumbnail source={Noti.image} />
                        <Body style={{flexDirection:"column"}}>
                            <Text>{Noti.title}</Text>
                            <Text>{Noti.text}</Text>
                        </Body>
                    </Left>
                </CardItem>   
            </TouchableOpacity>
        )
    })
    進捗dataAll.forEach(function(進捗){
        進捗data.push(
            <View>
                <CardItem>
                    <Text>{進捗.title}</Text>
                </CardItem>
                {進捗.additional == null ?
                    <CardItem bordered>
                        <View style={{height:30,width:"100%"}}>
                            <Line percent={進捗.ps} strokeWidth="1" strokeColor="#46385b" />
                            <Text>{進捗.ps}%</Text>
                        </View>
                    </CardItem>
                    :
                    <View>
                        <CardItem>
                            <View style={{height:30,width:"100%"}}>
                                <Line percent={進捗.ps} strokeWidth="1" strokeColor="#46385b" />
                                <Text>{進捗.ps}%</Text>
                            </View>
                        </CardItem>
                        <CardItem style={{padding:0,margin:0}} bordered>
                            <Accordion dataArray={eval(進捗.additional)} animation={true} expanded={true} renderHeader={_renderHeader} renderContent={makeContent} style={{padding:0,marginTop:-20}}/>
                        </CardItem>
                    </View>
                }
            </View>
        )
    })
}
//最新情報を表示する場所。一番上に位置する。
function とっぷ画像(){
    return(
        <View>
            <View style={{
            height:wp("100%") > 800 ? hp("30%")+100 : ((wp("80%")/16) * 9)+100, 
            minHeight:250 ,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor:"#46385b"}}>
                <View style={{height:70}}/>
                <Carousel
                    layout={"default"}
                    data={TopItems}
                    sliderWidth={wp("100%")}
                    itemWidth={wp("100%") > 800 ? (hp("30%")/9)*16 : wp("80%") }
                    layoutCardOffset={`18`}
                    renderItem={renderItem}
                    autoplay={'true'}
                    loop={true} />
            </View>
        </View>
    )
}
//最新情報カードの清々
function renderItem({item}){
    return (
        <TouchableOpacity onPress={() => RootNavigation.navigate(item.URL)}>
            <Image source={item.image} style={{height:wp("100%") > 800 ? hp("30%") : (wp("80%")/16) * 9,
                                               width: wp("100%") < 800 ? wp("80%") : (hp("30%")/9) * 16,
                                               top:0,
                                               position:"absolute"}}/>
        </TouchableOpacity>
    )
}

//ナビバーの中身。画像やinfoなど
function とっぷなびばー(navigation){
    return(
        <View style={{flexDirection:'row',height:60,width:"100%"}}>
            <View style={{flex:1}}/>
            <View>
                <View style={{flex:1}}/>
                <Image source={require("./assets/HarukinLogo/Harukin_w.svg")} style={{height: 50,width: 200}}/>
                <View style={{flex:1}}/>
            </View>
            <View style={{flex:1, flexDirection:"row-reverse"}}>
                <View style={{flexDirection:"column"}}>
                    <View style={{flex:1}}/>
                    <TouchableOpacity onPress={() => navigation.navigate('あばうと')}>
                        <Entypo name="info-with-circle" color={"white"} size={25} style={{margin:10}}/>
                    </TouchableOpacity>
                    <View style={{flex:1}}/>
                </View>
            </View>
        </View>
    )
}

//肝心の中身
function なかみ(){
    return(
        <View>
            <View style={{height:10}}/>
            <View style={{alignItems:"center"}}>
                <Text style={{fontSize:20}}>やってること</Text>
                <ScrollView horizontal={true}>
                    {Cards}
                </ScrollView>
            </View>
            <View style={{flexDirection:wp("100%") > 800 ? "row": "column",width:"100%"}}>
                <View style={{alignItems:"center",flex:wp("100%") > 800 ? 2 : null,width:"100%",padding:5}}>
                    <Card style={{width:"100%"}}>
                        <CardItem header bordered>
                            <Text style={{fontWeight: "bold"}}>お知らせ</Text>
                        </CardItem>
                        {NotiData}
                    </Card>
                </View>
                <View style={{alignItems:"center",flex:wp("100%") > 800 ? 1 : null,width:"100%",padding:5}}>
                    <Card style={{width:"100%"}}>
                        <CardItem header>
                            <Text style={{fontWeight: "bold"}}>サーバー稼働状況</Text>
                        </CardItem>
                        <CardItem cardBody>
                            <Text>運用準備中です。</Text>
                        </CardItem>
                    </Card>
                    <Card style={{width:"100%"}}>
                        <CardItem header bordered>
                            <Text style={{fontWeight: "bold"}}>製作物進捗状況</Text>
                        </CardItem>
                        {進捗data}
                    </Card>
                </View>
            </View>
        </View>
    )
}
//アコーディオンの中身を生成する
function _renderHeader(item, expanded) {
    return (
      <View style={{
        flexDirection: "row",
        paddingTop: 10,
        paddingBottom: 10,
        justifyContent: "space-between",
        alignItems: "center" ,
        backgroundColor: "#FFF" }}>
        <Text>{" "}{item.title}</Text>
            {expanded
                ? <Icon style={{ fontSize: 18 }} name="remove-circle" />
                : <Icon style={{ fontSize: 18 }} name="add-circle" />
            }
      </View>
    );
}
//アイテムとその％を構築
function makeContent(item) {
    return (
        <View>
            <Text style={{backgroundColor: "#e3f1f1",padding: 10,}}>
                {item.content}
            </Text>
            <View style={{height:30,width:"100%"}}>
                <Line percent={item.count} strokeWidth="1" strokeColor="#46385b" />
                <Text>{item.count}%</Text>
            </View>
        </View>
    );
  }






//他のページ
export function TopPageAbout({navigation}){
    return(
        <View style={{height:"100%"}}>
            <View style={{flex:1}}/>
            <View style={{flexDirection:'row',}}>
                <View style={{flex:1}}/>
                <View style={{alignItems:"center", width:wp("100%")}}>
                <Image source={require("./assets/HarukinLogo/Harukin.svg")} style={{height: 50,width: 200}}/>
                    <Text>これはReactNativeとExpo、それにReactnavigationを利用して作成されています。</Text>
                    <Image style={{height: 80, width:300}} source={require("./assets/React.png")}/>
                    <Image style={{height:200, width:300}} source={require("./assets/ReactNative.png")}/>
                    <Image style={{height: 80, width:300}} source={require("./assets/ReactNavigation.png")}/>
                    <Text>react-native-collapsible-toolbar</Text>
                    <Text>native-base</Text>
                    <Text>react-native-responsive-screen</Text>
                    <Text>react-native-snap-carousel</Text>
                </View>
                <View style={{flex:1}}/>
            </View>
            <View style={{flex:1}}/>
            <Button style={{flex:1}} onPress={() => navigation.goBack()} title="戻る"/>
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

