import React, { useState,useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Button, Image,  LayoutAnimation,ScrollView,TouchableOpacity,} from 'react-native';
import CollapsibleToolbar from 'react-native-collapsible-toolbar';
import { Platform } from 'react-native';
import { Accordion,Card, CardItem, Thumbnail, Icon, Left, Body } from 'native-base';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Entypo } from '@expo/vector-icons';
import { Line } from 'rc-progress';
import Carousel from 'react-native-snap-carousel';
import * as Linking from "expo-linking";
import AutoHeightImage from 'react-native-auto-height-image';
import LottieView from 'react-native-web-lottie';
const Cards = [];
const 進捗data=[];
let date = Linking.makeUrl("",{page:"TopPage"});
import xmlToJSON from 'xmltojson';
import { csvText_to_json } from './util/csvText_to_json';
import { RenderItem } from './util/carouselTools';
import * as appJson from './app.json';
import * as packageJson from './package.json';
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
    const [NotiCard,setNotiCard] = useState(null);
    const [NotiCard2,setNotiCard2] = useState(null);
    const [topCarousel,setCarousel] = useState(null);
    const [blogTab,setBlogTab] = useState("harukin");
    const LottieRef = useRef(null);
    const LottieRef2 = useRef(null);
    
    useEffect(()=>{
        ContentsCardBase();
        fetch("https://blog.haruk.in/index.rdf",{mode: "cors"})
        .then(response=>response.text())
        .then(text=>xmlToJSON.parseString(text))
        .then(results=>{
            console.log("取得完了");
            console.log(results)
            const NotiDataItems = results.RDF[0].item.map(D=>({title:D.title[0]._text,  text: D.description[0]._text,   image:require("./assets/HarukinLogo/HarukinPlus_s.png"),   URL:D.link[0]._text, time:D.date[0]._text}));
            setNotiCard(NotiDataItems.map(Noti=>
                <CardItem bordered button onClick={() => Linking.openURL(Noti.URL)}>
                    <Left>
                        <Thumbnail source={Noti.image} />
                        <Body style={{flexDirection:"column"}}>
                            <View style={{flexDirection:"row"}}>
                                <Text style={{fontWeight:"bold"}}>{Noti.title}</Text>  
                                <View style={{flex:1}} />
                            </View>
                            <Text style={{fontStyle:"italic"}}>{Noti.text.slice(0,40)}...</Text>
                        </Body>
                    </Left>
                </CardItem>   
            ));
        });
        fetch("https://diary.pcgf.io/rss/",{mode: "cors"})
        .then(response=>response.text())
        .then(text=>xmlToJSON.parseString(text))
        .then(results=>{
            console.log("取得完了");
            console.log(results)
            const NotiDataItems = results.rss[0].channel[0].item.map(D=>({title:D.title[0]._text,  text: D.description[0]._text,   image:"https://pcgf.io/wp-content/uploads/2020/12/PCGFロゴ.png",   URL:D.link[0]._text, time:D.pubDate[0]._text}));
            setNotiCard2(NotiDataItems.map(Noti=>
                <CardItem bordered button onClick={() => Linking.openURL(Noti.URL)}>
                    <Left>
                        <Thumbnail source={Noti.image} />
                        <Body style={{flexDirection:"column"}}>
                            <View style={{flexDirection:"row"}}>
                                <Text style={{fontWeight:"bold"}}>{Noti.title}</Text>  
                                <View style={{flex:1}} />
                            </View>
                            <Text style={{fontStyle:"italic"}}>{Noti.text.slice(0,40)}...</Text>
                        </Body>
                    </Left>
                </CardItem>   
            ));
        });
        fetch("https://nexcloud.haruk.in/s/F9GTFEwnamzkQ5s/download/list.csv",{mode: "cors"})
        .then(response=>response.text())
        .then(text=>csvText_to_json(text))
        .then(data=>setCarousel(data));
    },[])

    useEffect(()=>{
        try{
          LottieRef?.current.play();
          LottieRef2?.current.play();
        }catch(e){}
    })
    return (
        <View style={styles.container}>
            <View style={{height:wp("100%") > 800 ? hp("30%")+100 : ((wp("80%")/16) * 9)+100, minHeight:250 ,justifyContent: 'center',alignItems: 'center',backgroundColor:"#46385b"}}>
                <View style={{flexDirection:'row',height:70,width:wp("100%")-20}}>
                    <View style={{flexDirection:"column"}}>
                        <View style={{flex:1}}/>
                        <TouchableOpacity onPress={() => navigation.navigate('Status')}>
                            <Entypo name="bar-graph" color={"white"} size={25} style={{margin:10}}/>
                        </TouchableOpacity>
                        <View style={{flex:1}}/>
                    </View>
                    <View style={{flex:1, flexDirection:"column",alignContent:"center",alignItems:"center"}}>
                        <View style={{flex:1}}/>
                        <Image source={require("./assets/HarukinLogo/Harukin_w.svg")} style={{height: 50,width: 200}}/>
                        <View style={{flex:1}}/>
                    </View>
                    <View style={{flexDirection:"column"}}>
                        <View style={{flex:1}}/>
                        <TouchableOpacity onPress={() => navigation.navigate('About')}>
                            <Entypo name="info-with-circle" color={"white"} size={25} style={{margin:10}}/>
                        </TouchableOpacity>
                        <View style={{flex:1}}/>
                    </View>
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
                    <LottieView ref={LottieRef2} style={{ width: 150, height: 150, backgroundColor: 'white',}} source={require('./assets/51690-loading-diamonds.json')}/>
                    <View style={{flex:1}} />
                </View>
                }
                
            </View>
            <View>
                <View style={{height:10}}/>
                <View style={{alignItems:"center"}}>
                    <Text style={{fontSize:20}}>やってること</Text>
                    <View style={{flexDirection:"row"}}>
                        <div 
                        style={{width:(wp("99%")/3)-10,
                                margin:0,
                                padding:0,
                                borderStyle:"solid",
                                borderColor:"dark",
                                borderWidth:1,
                                alignItems:"center"}} 
                        onClick={() => Linking.openURL("?page=web")}>
                            <View style={{borderStyle:"solid",borderColor:"blue",borderWidth:0, alignItems:"center"}}>
                                <Entypo name="globe" color={"black"} size={25} style={{margin:10}}/>
                                <Text>オンラインアプリ</Text>
                            </View>
                        </div>
                        <div 
                        style={{width:(wp("99%")/3)-10,
                                margin:0,
                                padding:0,
                                borderStyle:"solid",
                                borderColor:"dark",
                                borderWidth:1,
                                alignItems:"center"}} 
                        onClick={() => Linking.openURL("?page=Apps")}>
                            <View style={{borderStyle:"solid",borderColor:"blue",borderWidth:0, alignItems:"center"}}>
                                <Entypo name="globe" color={"black"} size={25} style={{margin:10}}/>
                                <Text>ネイティブアプリ</Text>
                            </View>
                        </div>
                    <div 
                    style={{width:(wp("99%")/3)-10,
                            margin:0,
                            padding:0,
                            borderStyle:"solid",
                            borderColor:"dark",
                            borderWidth:1,
                            alignItems:"center"}} 
                    onClick={() => Linking.openURL("http://blog.haruk.in")}>
                        <View style={{borderStyle:"solid",borderColor:"blue",borderWidth:0, alignItems:"center"}}>
                            <Entypo name="globe" color={"black"} size={25} style={{margin:10}}/>
                            <Text>ブログ</Text>
                        </View>
                    </div>
                    </View>
                </View>
                <View style={{flexDirection:wp("100%") > 800 ? "row": "column",width:"100%"}}>
                    <View style={{alignItems:"center",flex:wp("100%") > 800 ? 2 : null,width:"100%",padding:wp("100%") > 800 ? 20:5,paddingRight:wp("100%") > 800 ? 10:null}}>
                        <Card style={{width:"100%"}} button onClick={() => Linking.openURL("https://pcgf.io")}>
                            <CardItem cardBody button bordered>
                                <AutoHeightImage style={{width:"100%",height:200}} source={require("./assets/PCGF.jpg")} resizeMode='contain'/>
                            </CardItem>
                            <CardItem cardBody button style={{margin:10, flexDirection:"column"}}>
                                <Text>PCGFは学生時代のお金無しが集まったガジェット集団です。現在はOSSを活用したソーシャルサービスの建築や広報活動、ガジェット情報の連絡、MNGなどをしております。</Text>
                                <View style={{margin:2}} />
                                <Text>主な活動場所はMattermostやMastodonで活発な情報共有、オフラインではオープンソースカンファレンスでブースを展開しております。</Text>
                            </CardItem>  
                        </Card>  
                        <View style={{alignItems:"center",flex:wp("100%") > 800 ? 1 : null,width:"100%"}}>
                            <Card style={{width:"100%"}}>
                                <View style={{flexDirection:"row",padding:5,paddingBottom:0,borderBottomColor:"dark",borderBottomWidth:1}}>
                                    {wp("100%") > 400 ? <Text style={{fontWeight: "bold",padding:10}}>ブログの更新...</Text> : <Entypo name="feather"  size={20} style={{margin:10}}/>}
                                    
                                    <View style={{flex:1}} />
                                    <Text style={{fontWeight: "bold",padding:10,borderBottomColor:"#46385b",borderBottomWidth:blogTab == "harukin" ? 3:0}} onClick={() => setBlogTab("harukin")}>はるきんぶろぐ</Text>
                                    <Text style={{fontWeight: "bold",padding:10,borderBottomColor:"#46385b",borderBottomWidth:blogTab == "PCGF" ? 3:0, color:NotiCard2 || "gray"}} onClick={() => NotiCard2 && setBlogTab("PCGF")}>PCGFダイアリー</Text>
                                </View>
                                {blogTab == "harukin" ? 
                                NotiCard ? NotiCard : 
                                <CardItem bordered button onClick={() => Linking.openURL(Noti.URL)}>
                                    <Body style={{alignItems:"center"}}>
                                        <LottieView ref={LottieRef} style={{ width: 150, height: 150, backgroundColor: 'white',}} source={require('./assets/51690-loading-diamonds.json')}/>
                                    </Body>
                                </CardItem>   
                                :
                                NotiCard2 ? NotiCard2 : 
                                <CardItem bordered button onClick={() => Linking.openURL(Noti.URL)}>
                                    <Body style={{alignItems:"center"}}>
                                        <LottieView ref={LottieRef} style={{ width: 150, height: 150, backgroundColor: 'white',}} source={require('./assets/51690-loading-diamonds.json')}/>
                                    </Body>
                                </CardItem>   
                                }
                            </Card>    
                            
                        </View>
                    </View>
                    <View style={{alignItems:"center",flex:wp("100%") > 800 ? 1 : null,width:"100%",padding:wp("100%") > 800 ? 20:5,paddingLeft:wp("100%") > 800 ? 10:null }}>
                        <Card style={{width:"100%"}}>
                            <CardItem header bordered>
                                <Text style={{fontWeight: "bold"}}>製作物進捗状況</Text>
                            </CardItem>
                            {進捗data}
                        </Card>
                    </View>
                </View>
            </View>
        </View>
    );
}
    //メインコンポーネント
    //****************** */

function ContentsCardBase(){
    
    
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
            {expanded ? <Icon style={{ fontSize: 18 }} name="remove-circle" /> : <Icon style={{ fontSize: 18 }} name="add-circle" />}
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
    const LottieRef = useRef(null);
    const LottieRef2 = useRef(null);
    const [twitterData, setTwitterData] = useState();
    const [fediverseData, setFediverseData] = useState();
    useEffect(()=>{
        fetch("https://nexcloud.haruk.in/s/sbeq5XFSonJnCJB/download/TwitterAccount.csv",{mode: "cors"})
        .then(response=>response.text())
        .then(text=>csvText_to_json(text))
        .then(data=>setTwitterData(data));

        fetch("https://nexcloud.haruk.in/s/pJeC8scnmNzsQaN/download/FediverseAccount.csv",{mode: "cors"})
        .then(response=>response.text())
        .then(text=>csvText_to_json(text))
        .then(data=>setFediverseData(data));
    },[])
    useEffect(()=>{
        try{
          LottieRef?.current.play();
          LottieRef2?.current.play();
        }catch(e){}
    })
    console.log(packageJson.default);
    return(
        <View style={{alignItems:"center",position:"relative",height:"auto"}}>
            <Image source={require("./assets/HarukinLogo/Harukin.svg")} style={{height: 50,width: 200}}/>
            <Text>これはReactNativeとExpo、それにReactnavigationを利用して作成されています。</Text>
            <View style={{padding:10}}>
                <Text style={{fontSize:20}}>SiteVersion:{appJson.default.expo.version} ExpoVersion:{packageJson.default.dependencies.expo}</Text>
            </View>
            <View style={{flexDirection:wp("100%") > 800 ? "row" :"column"}} >
                <Card style={{width:wp("100%") > 800 ? wp("40%") : wp("90%"),maxWidth:600,}}>
                    <CardItem bordered>
                        <Body style={{flexDirection:"column"}}>
                            <View style={{flexDirection:"row",}} >
                                <Entypo name="twitter" color={"#1DA1F2"} style={{margin:5,fontSize:30}}/>
                                <Text style={{fontWeight:"bold",margin:5,fontSize:30}}>Normal Network</Text>  
                            </View>
                            <Text style={{fontStyle:"italic",fontSize:20}}>一般サービスアカウント</Text>
                        </Body>
                    </CardItem>  
                    
                    {twitterData ? 
                    [<CardItem bordered>
                        <View style={{flexDirection:"row",}} >
                            <Entypo name="twitter" color={"#1DA1F2"} style={{margin:5,fontSize:20}}/>
                            <Text style={{fontWeight:"bold",margin:5,fontSize:20}}>Twitter</Text>  
                        </View>
                    </CardItem>,
                    twitterData.filter(d=>d.type=="Twitter").map(d=>
                        <CardItem bordered button onClick={() => Linking.openURL(d.url)}>
                            <Left>
                                <Thumbnail source={d.image} />
                                <Body style={{flexDirection:"column"}}>
                                    <View style={{flexDirection:"row"}}>
                                        <Text style={{fontWeight:"bold"}}>{d.name}</Text>  
                                        <View style={{flex:1}} />
                                    </View>
                                    <Text style={{fontStyle:"italic"}}>{d.description}</Text>
                                </Body>
                            </Left>
                        </CardItem>
                    ),
                    <CardItem bordered>
                        <View style={{flexDirection:"row",}} >
                            <Entypo name="github" color={"#1DA1F2"} style={{margin:5,fontSize:20}}/>
                            <Text style={{fontWeight:"bold",margin:5,fontSize:20}}>GitHub / GitLab</Text>  
                        </View>
                    </CardItem>,
                    twitterData.filter(d=>d.type=="Git").map(d=>
                        <CardItem bordered button onClick={() => Linking.openURL(d.url)}>
                            <Left>
                                <Thumbnail source={d.image} />
                                <Body style={{flexDirection:"column"}}>
                                    <View style={{flexDirection:"row"}}>
                                        <Text style={{fontWeight:"bold"}}>{d.name}</Text>  
                                        <View style={{flex:1}} />
                                    </View>
                                    <Text style={{fontStyle:"italic"}}>{d.description}</Text>
                                </Body>
                            </Left>
                        </CardItem>
                    ),
                    <CardItem bordered>
                        <View style={{flexDirection:"row",}} >
                            <Entypo name="instagram" color={"#1DA1F2"} style={{margin:5,fontSize:20}}/>
                            <Text style={{fontWeight:"bold",margin:5,fontSize:20}}>Instagram</Text>  
                        </View>
                    </CardItem>,
                    twitterData.filter(d=>d.type=="Instagram").map(d=>
                        <CardItem bordered button onClick={() => Linking.openURL(d.url)}>
                            <Left>
                                <Thumbnail source={d.image} />
                                <Body style={{flexDirection:"column"}}>
                                    <View style={{flexDirection:"row"}}>
                                        <Text style={{fontWeight:"bold"}}>{d.name}</Text>  
                                        <View style={{flex:1}} />
                                    </View>
                                    <Text style={{fontStyle:"italic"}}>{d.description}</Text>
                                </Body>
                            </Left>
                        </CardItem>
                    )]
                    : 
                    <CardItem>
                        <Body style={{flexDirection:"column",alignItems:"center"}}>
                        <LottieView ref={LottieRef} style={{ width: 150, height: 150, backgroundColor: 'white',}} source={require('./assets/51690-loading-diamonds.json')}/>
                        </Body>
                    </CardItem>
                    }
                </Card>
                <Card style={{width:wp("100%") > 800 ? wp("40%") : wp("90%"),maxWidth:600}}> 
                    <CardItem bordered>
                        <Body style={{flexDirection:"column"}}>
                            <View style={{flexDirection:"row",}} >
                                <Entypo name="network" color={"#1DA1F2"} style={{margin:5,fontSize:30}}/>
                                <Text style={{fontWeight:"bold",margin:5,fontSize:30}}>Fediverse Network</Text>  
                            </View>
                            <Text style={{fontStyle:"italic",fontSize:20}}>分散型ネットワークアカウント</Text>
                        </Body>
                    </CardItem>  
                      
                    {fediverseData ? [
                        <CardItem bordered>
                            <View style={{flexDirection:"row",}} >
                                <Entypo name="network" color={"#1DA1F2"} style={{margin:5,fontSize:20}}/>
                                <Text style={{fontWeight:"bold",margin:5,fontSize:20}}>Mastodon</Text>  
                            </View>
                        </CardItem>,
                        fediverseData.filter(d=>d.type=="Mastodon").map(d=>
                            <CardItem bordered button onClick={() => Linking.openURL(d.url)}>
                                <Left>
                                    <Thumbnail source={d.image} />
                                    <Body style={{flexDirection:"column"}}>
                                        <View style={{flexDirection:"row"}}>
                                            <Text style={{fontWeight:"bold"}}>{d.name}</Text>  
                                            <View style={{flex:1}} />
                                        </View>
                                        <Text style={{fontStyle:"italic"}}>{d.description}</Text>
                                    </Body>
                                </Left>
                            </CardItem>
                        ),
                        <CardItem bordered>
                            <View style={{flexDirection:"row",}} >
                                <Entypo name="network" color={"#1DA1F2"} style={{margin:5,fontSize:20}}/>
                                <Text style={{fontWeight:"bold",margin:5,fontSize:20}}>Pixelfed</Text>  
                            </View>
                        </CardItem>,
                        fediverseData.filter(d=>d.type=="Pixelfed").map(d=>
                            <CardItem bordered button onClick={() => Linking.openURL(d.url)}>
                                <Left>
                                    <Thumbnail source={d.image} />
                                    <Body style={{flexDirection:"column"}}>
                                        <View style={{flexDirection:"row"}}>
                                            <Text style={{fontWeight:"bold"}}>{d.name}</Text>  
                                            <View style={{flex:1}} />
                                        </View>
                                        <Text style={{fontStyle:"italic"}}>{d.description}</Text>
                                    </Body>
                                </Left>
                            </CardItem>
                        ),
                    ]
                    : 
                    <CardItem bordered>
                        <Body style={{flexDirection:"column",alignItems:"center"}}>
                        <LottieView ref={LottieRef2} style={{ width: 150, height: 150, backgroundColor: 'white',}} source={require('./assets/51690-loading-diamonds.json')}/>
                        </Body>
                    </CardItem>
                    }
                </Card>    
            </View>
            
        </View>
    )
}

export function TopPageStatus({navigation}){
    const [tab,setTab] = useState("harukin");
    return(
        <View style={{alignItems:"center",position:"relative",height:"100%"}}>
            <View style={{flexDirection:"row",padding:5,paddingBottom:0,borderBottomColor:"dark",borderBottomWidth:1,width:"100%"}}>
                <Text style={{flex:1,fontWeight: "bold",textAlign:"center",padding:10,borderBottomColor:"#46385b",borderBottomWidth:tab == "harukin" ? 3:0}} onClick={() => setTab("harukin")}>haruk.in</Text>
                <Text style={{flex:1,fontWeight: "bold",textAlign:"center",padding:10,borderBottomColor:"#46385b",borderBottomWidth:tab == "PCGF" ? 3:0}} onClick={() => setTab("PCGF")}>PCGF.io</Text>
                <Text style={{flex:1,fontWeight: "bold",textAlign:"center",padding:10,borderBottomColor:"#46385b",borderBottomWidth:tab == "rintan" ? 3:0}} onClick={() => setTab("rintan")}>rintan.net</Text>
            </View>
            <iframe src="https://status.haruk.in/"title="iframe Example 1" width="100%" height="100%" style={{display:tab != "harukin" && "none"}}></iframe>
            <iframe src="https://status.pcgf.io/"title="iframe Example 1" width="100%" height="100%" style={{display:tab != "PCGF" && "none"}}></iframe>
            <iframe src="https://status.rintan.net/"title="iframe Example 1" width="100%" height="100%" style={{display:tab != "rintan" && "none"}}></iframe>
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

