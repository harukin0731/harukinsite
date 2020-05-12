import React from 'react';
import { StyleSheet, Text, View, Image, Linking, ScrollView, TouchableOpacity,} from 'react-native';
import { Card, CardItem, Thumbnail, Icon, Left, Body } from 'native-base';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Entypo } from '@expo/vector-icons';
import Carousel from 'react-native-snap-carousel';
import * as RootNavigation from '../RootNavigation.js';

const CardsMain = [];
const CardsSub = [];
var carouselItems=[
    {title:"Harukin+の稼働予定について",text: "現在Harukin+は停止状態にあります。",image:require("../assets/HK.png"),URL:"404"},
];

export default function Web({navigation}) {
    CardsMain.length ? null :ContentsCardBase(navigation);
    return (
        <View style={styles.container}>
            <View style={{backgroundColor:"#C17D11",height:hp("40%"),width:"100%",top:0}}>
                <View style={{flexDirection:'row',position:"relative"}}>
                    <View style={{flexDirection:"column",flex:1,height:"100%"}}>
                        <View style={{flex:1,}}/>
                        <View>
                            <TouchableOpacity onPress={() => navigation.navigate('トップページ')} style={{flexDirection:"row",alignItems:"center"}}>
                                <Entypo name="chevron-thin-left" color={"white"} size={25}/>
                                {wp("100%")< 580 ? <Entypo name="home" color={"white"} size={25}/> : <Text style={{fontSize:20,color:"white"}}>ホームに戻る</Text>}
                            </TouchableOpacity>  
                            <View style={{flex:1}}></View>  
                        </View>
                        <View style={{flex:1,}}/>
                    </View>
                    <View style={{alignItems:"center"}}>
                        <View style={{flex:1}}/>
                        <View style={{flexDirection:'row',alignItems:"center"}}>
                            <Image source={require("../assets/HarukinLogo/Harukin_w.svg")} style={{height: 40,width: 180}}/>
                            <Text style={{fontSize: 29, color:"white"}} > Site</Text>
                        </View>
                        <View style={{flex:1}}/>
                    </View>
                    <View style={{flex:1, flexDirection:"row-reverse"}}/>
                </View>
                <Carousel
                    layout={"default"}
                    data={carouselItems}
                    sliderWidth={wp("100%")}
                    itemWidth={wp("100%") > 800 ? wp("30%") : wp("80%")}
                    layoutCardOffset={`18`}
                    renderItem={renderItem}
                    autoplay={'true'}
                    loop={true} />
            </View>
            <View style={{height:10}}/>
            <Text>真面目に製作中</Text>
            <ScrollView horizontal={wp("100%")>800?true:false}>
            {CardsMain}
            </ScrollView>
        </View>
    );
}

function ContentsCardBase(navigation){
    CreateCard(require("../assets/Apps/HKblankApp.png"), () => Linking.openURL("https://plus.haruk.in"), "Harukin+","OSSのHubzillaを独自にカスタマイズしたGoogle+風Fediverse_SNSです。",2)
    CreateCard(require("../assets/Apps/HKblankApp.png"), () => Linking.openURL("https://gitlab.haruk.in"), "Gitlab","GithubのようなOSS Gitサーバー、Gitlabです。",1)
    CreateCard(require("../assets/web/nextcloud.svg"), () => Linking.openURL("https://nexcloud.haruk.in"), "Nexcloud","DropBoxのようなOSSソフトウェア、Nextcloudです。",1)
    CreateCard(require("../assets/web/mattermost.png"), () => Linking.openURL("https://mattermost.haruk.in"), "Mattermost","SlackのようなOSSソフトウェア、Mattermostです。",1)
}

function CreateCard(image, url, name,description, Status){
    CardsMain.push(
        <TouchableOpacity style={{width:wp("100%")>800?wp("99%")/4:wp("100%"),minWidth:200}} onPress={url}>
            {wp("100%")>800?
            <Card>
                <CardItem cardBody>
                    <Image source={image} style={{height: 200, width: null, flex: 1}}/>
                </CardItem>
                <CardItem footer>
                    <Text>{name}</Text>
                </CardItem>
                <CardItem footer>
                    <Text>{description}</Text>
                </CardItem>
                <CardItem footer bordered>
                    {DetectOSStatus(Status)}
                </CardItem>
            </Card>
            :
            <Card>
                <CardItem>
                    <Left>
                        <Thumbnail source={image} />
                        <Body>
                            <Text>{name}</Text>
                            <Text>{description}</Text>
                            {DetectOSStatus(Status)}
                        </Body>
                    </Left>
                </CardItem>   
            </Card>
            }
        </TouchableOpacity>
    )
}

function DetectOSStatus(AS){
    var AT;
    switch(AS){
        case 0: AT="未公開";break;
        case 1: AT="一般公開中";break;
        case 2: AT="一時閉鎖中";break;
    }

    return(
        <View style={{flexDirection: "row",alignItems:"center"}}>
            <Icon type="Entypo" name="cloud" />
            <Text>{AT}</Text>
        </View>
    )
}

function renderItem({item}){
    return (
        <TouchableOpacity onPress={() => RootNavigation.navigate(item.URL)}>
            <Card style={{backgroundColor:'floralwhite',borderRadius: 5, Height:hp("30%"),justifyContent: "flex-start",flexDirection:"column-reverse"}}>
                <CardItem cardBody style={{height: hp("30%"),width: "100%",top:0,position:"absolute"}}>
                    <Image source={item.image} style={{height: hp("30%"),width: "100%",top:0,position:"absolute"}}/>
                </CardItem>
                <CardItem footer bordered style={{marginTop:"auto"}}>
                    <Text>{item.text}</Text>
                </CardItem>
                <CardItem cardBody style={{marginTop:"auto"}}>
                    <Text style={{fontSize: 20,margin:8}}>{item.title}</Text>
                </CardItem>
            </Card>
        </TouchableOpacity>
        
    )
}










//他のページ







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
