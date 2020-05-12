import React from 'react';
import { Dimensions, StyleSheet, Text, View, Button, Image, Linking, ScrollView, TouchableOpacity,} from 'react-native';
import CollapsibleToolbar from 'react-native-collapsible-toolbar';
import { Platform } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Icon, Left, Body, Right } from 'native-base';
import { AntDesign, Ionicons,Entypo } from '@expo/vector-icons';
const Cards = [];
export function AboutMe({navigation}) {
    Cards.length ? null : ContentsCardBase(navigation);
    return (
        <View style={styles.container}>
            <CollapsibleToolbar
                renderContent={()=>なかみ()}
                renderNavBar={()=>とっぷなびばー(navigation)}
                renderToolBar={()=>とっぷ画像()}
                collapsedNavBarBackgroundColor='#AAAA04'
                translucentStatusBar={Platform.Version >= 21}
                toolBarHeight={300}
            />
        </View>
    );
}
function とっぷ画像(){
    return(
        <View>
            <View style={{height:300,justifyContent: 'center',alignItems: 'center'}}>
                <Text>あばうとみー！！！</Text>
            </View>
        </View>
    )
}
function とっぷなびばー(navigation){
    return(
        <View style={{flexDirection:'row',height:"100%",width:"100%"}}>
            <View style={{flex:1, flexDirection:"row"}}>
                <View style={{flexDirection:"column"}}>
                    <View style={{flex:1}}/>
                    <TouchableOpacity onPress={() => navigation.navigate("トップページ")}>
                        <Entypo name="chevron-thin-left"  size={25} style={{margin:10}}/>
                    </TouchableOpacity>
                    <View style={{flex:1}}/>
                </View>
            </View>
            <View>
                <View style={{flex:1}}/>
                <Text>haruk.inトップページ</Text>
                <View style={{flex:1}}/>
            </View>
            <View style={{flex:1, flexDirection:"row-reverse"}}>
                <View style={{flexDirection:"column"}}>
                    <View style={{flex:1}}/>
                    {/* <TouchableOpacity onPress={() => navigation.navigate('あばうと')}>
                        <Entypo name="info-with-circle"  size={25} style={{margin:10}}/>
                    </TouchableOpacity> */}
                    <View style={{flex:1}}/>
                </View>
            </View>
        </View>
    )
}
function なかみ(){
    return(
        <View>
            {Cards}
            <Text>Open up App.js to start working on your app!</Text>
            <Text>Open up App.js to start working on your app!</Text>
            <Text>Open up App.js to start working on your app!</Text>
            <Text>Open up App.js to start working on your app!</Text>
            <Text>Open up App.js to start working on your app!</Text>
            <Text>Open up App.js to start working on your app!</Text>
            <Text>Open up App.js to start working on your app!</Text>
            <Text>Open up App.js to start working on your app!</Text>
            <Text>Open up App.js to start working on your app!</Text>
            <Text>Open up App.js to start working on your app!</Text>
            <Text>Open up App.js to start working on your app!</Text>
            <Text>Open up App.js to start working on your app!</Text>
            <Text>Open up App.js to start working on your app!</Text>
            <Text>Open up App.js to start working on your app!</Text>
            <Text>Open up App.js to start working on your app!</Text>
            <Text>Open up App.js to start working on your app!</Text>
            <Text>Open up App.js to start working on your app!</Text>
            <Text>Open up App.js to start working on your app!</Text>
            <Text>Open up App.js to start working on your app!</Text>
            <Text>Open up App.js to start working on your app!</Text>
            <Text>Open up App.js to start working on your app!</Text>
            <Text>Open up App.js to start working on your app!</Text>
            <Text>Open up App.js to start working on your app!</Text>
            <Text>Open up App.js to start working on your app!</Text>
            <Text>Open up App.js to start working on your app!</Text>
            <Text>Open up App.js to start working on your app!</Text>
            <Text>Open up App.js to start working on your app!</Text>
            <Text>Open up App.js to start working on your app!</Text>
            <Text>Open up App.js to start working on your app!</Text>
            <Text>Open up App.js to start working on your app!</Text>
            <Text>Open up App.js to start working on your app!</Text>
            <Text>Open up App.js to start working on your app!</Text>
            <Text>Open up App.js to start working on your app!</Text>
            <Text>Open up App.js to start working on your app!</Text>
            <Text>Open up App.js to start working on your app!</Text>
            <Text>Open up App.js to start working on your app!</Text>
            <Text>Open up App.js to start working on your app!</Text>
            <Text>Open up App.js to start working on your app!</Text>
            <Text>Open up App.js to start working on your app!</Text>
            <Text>Open up App.js to start working on your app!</Text>
            <Text>Open up App.js to start working on your app!</Text>
            <Text>Open up App.js to start working on your app!</Text>
            <Text>Open up App.js to start working on your app!</Text>
            <Text>Open up App.js to start working on your app!</Text>
            <Text>Open up App.js to start working on your app!</Text>
            <Text>Open up App.js to start working on your app!</Text>
            <Text>Open up App.js to start working on your app!</Text>
            <Text>Open up App.js to start working on your app!</Text>
            <Text>Open up App.js to start working on your app!</Text>
            <Text>Open up App.js to start working on your app!</Text>
            <Text>Open up App.js to start working on your app!</Text>
            <Text>Open up App.js to start working on your app!</Text>
            <Text>Open up App.js to start working on your app!</Text>
            <Text>Open up App.js to start working on your app!</Text>
            <Text>Open up App.js to start working on your app!</Text>
            <Text>Open up App.js to start working on your app!</Text>
            <Text>Open up App.js to start working on your app!</Text>
            <Text>Open up App.js to start working on your app!</Text>
            <Text>Open up App.js to start working on your app!</Text>
            <Text>Open up App.js to start working on your app!</Text>
            <Text>Open up App.js to start working on your app!</Text>
            <Text>Open up App.js to start working on your app!</Text>
            <Text>Open up App.js to start working on your app!</Text>
            <Text>Open up App.js to start working on your app!</Text>
            <Text>Open up App.js to start working on your app!</Text>
            <Text>Open up App.js to start working on your app!</Text>
            <Text>Open up App.js to start working on your app!</Text>
            <Text>Open up App.js to start working on your app!</Text>
            <Text>Open up App.js to start working on your app!</Text>
            <Text>Open up App.js to start working on your app!</Text>
            <Text>Open up App.js to start working on your app!</Text>
            <Text>Open up App.js to start working on your app!</Text>
            <Text>Open up App.js to start working on your app!</Text>
            <Text>Open up App.js to start working on your app!</Text>
            <Text>Open up App.js to start working on your app!</Text>
            <Text>Open up App.js to start working on your app!</Text>
            <Text>Open up App.js to start working on your app!</Text>
            <Text>Open up App.js to start working on your app!</Text>
            <Text>Open up App.js to start working on your app!</Text>
            <Text>Open up App.js to start working on your app!</Text>
            <Text>Open up App.js to start working on your app!</Text>
            <Text>Open up App.js to start working on your app!</Text>
            <Text>Open up App.js to start working on your app!</Text>
            <Text>Open up App.js to start working on your app!</Text>
            <Text>Open up App.js to start working on your app!</Text>
            <Text>Open up App.js to start working on your app!</Text>
            <Text>Open up App.js to start working on your app!</Text>
            <Text>Open up App.js to start working on your app!</Text>
            <Text>Open up App.js to start working on your app!</Text>
            <Text>Open up App.js to start working on your app!</Text>
            <Text>Open up App.js to start working on your app!</Text>
            <Text>Open up App.js to start working on your app!</Text>
            <Text>Open up App.js to start working on your app!</Text>
            <Text>Open up App.js to start working on your app!</Text>
            <Text>Open up App.js to start working on your app!</Text>
            <Text>Open up App.js to start working on your app!</Text>
            <Text>Open up App.js to start working on your app!</Text>
            <Text>Open up App.js to start working on your app!</Text>
            <Text>Open up App.js to start working on your app!</Text>
            <Text>Open up App.js to start working on your app!</Text>
            <Text>Open up App.js to start working on your app!</Text>
        </View>
    )
}


export function TopPageAbout({navigation}){
    return(
        <View style={{height:"100%"}}>
            <View style={{flex:1}}/>
            <View style={{flexDirection:'row',}}>
                <View style={{flex:1}}/>
                <View style={{alignItems:"center"}}>
                    <Text>これはReactNativeとExpo、それにReactnavigationを利用して作成されています。</Text>
                    <Image style={{height: 80, width:300}} source={require("../assets/React.png")}/>
                    <Image style={{height:200, width:300}} source={require("../assets/ReactNative.png")}/>
                    <Image style={{height: 80, width:300}} source={require("../assets/ReactNavigation.png")}/>
                </View>
                <View style={{flex:1}}/>
            </View>
            <View style={{flex:1}}/>
            <Button style={{flex:1}} onPress={() => navigation.goBack()} title="戻る"/>
        </View>
    )
}


function ContentsCardBase(navigation){
    CreateCard(require("../assets/ReactNative.png"), () => Linking.openURL("http://twitter.com/mhkai00731"), "Twitter",navigation)
    CreateCard(require("../assets/ReactNative.png"), () => Linking.openURL("http://mstdn.y-zu.org/@_"), "Mastodon(Yづ丼)",navigation)
    CreateCard(require("../assets/ReactNative.png"), () => Linking.openURL("http://plus.haruk.in/channel/harukin"), "Harukin+",navigation)
}

function CreateCard(image, url, name, navigation){
    Cards.push(
        <TouchableOpacity style={{width:"100%"}} onPress={url}>
            <Card>
                <CardItem cardBody>
                    <Image source={image} style={{height: 200, width: null, flex: 1}}/>
                </CardItem>
                <CardItem footer bordered>
                    <Text>{name}</Text>
                </CardItem>
            </Card>
        </TouchableOpacity>
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

/* const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
}); */
