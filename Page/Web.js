import React from 'react';
import { StyleSheet, Text, View, Image, Linking, ScrollView, TouchableOpacity,} from 'react-native';
import { Card, CardItem, Thumbnail, Icon, Left, Body } from 'native-base';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Entypo } from '@expo/vector-icons';
import Carousel from 'react-native-snap-carousel';

const CardsMain = [];
const CardsSub = [];
var carouselItems=[
    {image:require("../assets/CardView/jrshikokuDelayEX.png"),  URL:"https://twitter.com/JRSTraInfoEX"},
]
export default function Web({navigation}) {
    CardsMain.length ? null :ContentsCardBase(navigation);
    return (
        <View style={styles.container}>
            <View style={{backgroundColor:"#C17D11",height:hp("40%"),width:"100%",top:0}}>
                <View style={{flexDirection:'row',position:"relative"}}>
                    <View style={{flexDirection:"column",flex:1,height:"100%"}}>
                        <View style={{flex:1,}}/>
                        <View>
                            <div onClick={() => Linking.openURL(".")} style={{flexDirection:"row",alignItems:"center"}}>
                                <Entypo name="chevron-thin-left" color={"white"} size={25}/>
                                {wp("100%")< 580 ? <Entypo name="home" color={"white"} size={25}/> : <Text style={{fontSize:20,color:"white"}}>ホームに戻る</Text>}
                            </div>  
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
    CreateCard(require("../assets/Apps/HKblankApp.png"), () => Linking.openURL("https://plus.haruk.in"), "Harukin+","OSSのHubzillaを独自にカスタマイズしたGoogle+風Fediverse_SNSです。",1)
    CreateCard(require("../assets/Apps/HKblankApp.png"), () => Linking.openURL("https://gitlab.haruk.in"), "Gitlab","GithubのようなOSS Gitサーバー、Gitlabです。",1)
    CreateCard(require("../assets/web/nextcloud.svg"), () => Linking.openURL("https://nexcloud.haruk.in"), "Nexcloud","DropBoxのようなOSSソフトウェア、Nextcloudです。",1)
    CreateCard(require("../assets/web/mattermost.png"), () => Linking.openURL("https://mattermost.haruk.in"), "Mattermost","SlackのようなOSSソフトウェア、Mattermostです。",1)
    CreateCard(require("../assets/web/JRSD.jpg"), () => Linking.openURL("https://twitter.com/JRSTraInfoEX"), "JR四国非公式列車遅延情報EX","JR四国の列車遅延を超高速にお伝えするTwitterBOTです。",1)
}

function CreateCard(image, url, name,description, Status){
    CardsMain.push(
        <div style={{width:wp("100%")>800?wp("99%")/4:wp("100%"),minWidth:200}} onClick={url}>
            {wp("100%")>800?
            <Card>
                <CardItem button cardBody>
                    <Image source={image} style={{height: 200, width: null, flex: 1}}/>
                </CardItem>
                <CardItem button footer>
                    <Text>{name}</Text>
                </CardItem>
                <CardItem button footer>
                    <Text>{description}</Text>
                </CardItem>
                <CardItem button footer bordered>
                    {DetectOSStatus(Status)}
                </CardItem>
            </Card>
            :
            <Card>
                <CardItem button>
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
        </div>
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
        <TouchableOpacity onPress={() => Linking.openURL(item.URL)}>
            <Image source={item.image} style={{height:wp("100%") > 800 ? hp("30%") : (wp("80%")/16) * 9,
                                               width: wp("100%") < 800 ? wp("80%") : (hp("30%")/9) * 16,
                                               top:0,
                                               position:"absolute"}}/>
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
