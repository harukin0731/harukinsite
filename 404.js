import React from 'react';
import { Text, View, Button, Image, } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export function Page404({navigation}){
    return(
        <View style={{height:"100%"}}>
            <View style={{flex:1}}/>
            <View style={{flexDirection:'row',}}>
                <View style={{flex:1}}/>
                <View style={{alignItems:"center", width:wp("100%")}}>
                    <Text>申し訳ありません。お探しのページは見つかりませんでした。</Text>
                    <Text style={{fontSize: 50}}>404 Not Found</Text>
                    <Image style={{height: 80, width:300}} source={require("./assets/Harukin2bk.png")}/>
                    <Text>2020 harukin/Haruki Mukai</Text>
                </View>
                <View style={{flex:1}}/>
            </View>
            <View style={{flex:1}}/>
            <Button style={{flex:1}} onPress={() => navigation.navigate("トップページ")} title="トップに戻る"/>
        </View>
    )
}