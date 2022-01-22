import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, Image, Linking, ScrollView, TouchableOpacity,} from 'react-native';
import { Card, CardItem, Thumbnail, Icon, Left, Body} from 'native-base';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Entypo } from '@expo/vector-icons';
import Carousel from 'react-native-snap-carousel';
import LottieView from 'react-native-web-lottie';
import { csvText_to_json } from '../util/csvText_to_json';
import { RenderItem } from '../util/carouselTools';

export default function Web() {
    const [topCarousel,setCarousel] = useState(null);
    const [cardList,setCardList] = useState(undefined);
    const LottieRef3 = useRef(null);
    const LottieRef4 = useRef(null);
    useEffect(()=>{
        fetch("https://nexcloud.haruk.in/s/F9GTFEwnamzkQ5s/download/list.csv",{mode: "cors"})
        .then(response=>response.text())
        .then(text=>csvText_to_json(text))
        .then(json=>json.filter(d=>d.type == 'web'))
        .then(data=>setCarousel(data));
    },[])
    useEffect(()=>{
        fetch("https://nexcloud.haruk.in/s/GQAqKoEmeno3tmP/download/appsList.csv",{mode: "cors"})
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
            <View style={{height:wp("100%") > 800 ? hp("30%")+100 : ((wp("80%")/16) * 9)+100, minHeight:250 ,justifyContent: 'center',alignItems: 'center',backgroundColor:"#C17D11"}}>
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
                            <Text style={{fontSize: 30, color:"white"}} > Site</Text>
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
            <View style={{ display: "grid", gridTemplateColumns: wp("100%") > 1200 ? "1fr 1fr 1fr 1fr 1fr" : wp("100%") > 1000 ? "1fr 1fr 1fr 1fr" :wp("100%") > 800 ? "1fr 1fr 1fr" : wp("100%") > 600 ? "1fr 1fr":"1fr",margin:15 }}>
                {cardList ? 
                    cardList.map(v=>{
                        return (
                            <div style={{width:"100%",minWidth:200}} onClick={()=>Linking.openURL(v.url)}>
                                {wp("100%")>600?
                                <Card>
                                    <CardItem button cardBody>
                                        <Image source={v.image} style={{height: 200, width: null, flex: 1}}/>
                                    </CardItem>
                                    <CardItem button footer>
                                        <Text>{v.name}</Text>
                                    </CardItem>
                                    <CardItem button footer>
                                        <Text>{v.description}</Text>
                                    </CardItem>
                                    <CardItem button footer bordered>
                                        {DetectOSStatus(v.type)}
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
                                                {DetectOSStatus(v.type)}
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

function DetectOSStatus(AS){
    var AT;
    switch(AS){
        case '0': AT="未公開";break;
        case '1': AT="一般公開中";break;
        case '2': AT="一時閉鎖中";break;
    }

    return(
        <View style={{flexDirection: "row",alignItems:"center"}}>
            <Icon type="Entypo" name="cloud" />
            <Text>{AT}</Text>
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
