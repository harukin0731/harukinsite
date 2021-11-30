import React, { useEffect, useState } from 'react';
import { AppLoading} from 'expo';
import { useFonts } from '@use-expo/font';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator,TransitionPresets } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { TopPage,  TopPageAbout, TopPageStatus } from './TopPage';
import { Page404 } from './404';
import { navigationRef } from './RootNavigation.js';
import { data as page2020102101 } from './Page/Info/2020_10_21_01';
import * as Linking from "expo-linking";
import * as RootNavigation from './RootNavigation.js';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
export default function App() {
  let [fontsLoaded] = useFonts({
    'Inter-Black': require('./assets/font_1_ant-maru.ttf'),
  });

  const [jrshikokuPage,setJrShikokuPage] = useState();
  import('./Page/Apps/JRShikoku').then(d=>setJrShikokuPage(d));

  const [appsPage,setAppsPage] = useState();
  const [webPage,setWebPage] = useState();
  const [fmPage,setFmPage] = useState();
  useEffect(()=>{
    Promise.allSettled([import('./Page/Apps').then(d=>setAppsPage(d)),import('./Page/Web').then(d=>setWebPage(d)),import('./Page/Apps/fm').then(d=>setFmPage(d))]).then((value)=>{
      console.log(value)
      
    })  
  },[])
  
  appsPage && webPage && fmPage && test()

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator headerMode="screen">
        <Stack.Screen name='トップページ' component={TopPage}       options={{headerShown: false}} path="Top"/>
        <Stack.Screen name='About'     component={TopPageAbout}  options={{...TransitionPresets.ModalSlideFromBottomIOS ,headerTitleAlign:"center",headerShown: true, animationEnabled: true }}/>
        <Stack.Screen name='Status'     component={TopPageStatus}  options={{...TransitionPresets.ModalSlideFromBottomIOS ,headerTitleAlign:"center",headerShown: true, animationEnabled: true }}/>
        <Stack.Screen name='404'          component={Page404}       options={{...TransitionPresets.ModalSlideFromBottomIOS ,headerTitleAlign:"center",headerShown: false, animationEnabled: true }}/>
        {webPage        && <Stack.Screen name='Web'          component={webPage.default}           options={{...TransitionPresets.SlideFromRightIOS ,headerTitleAlign:"center",headerShown: false, animationEnabled: false }}/>}
        {appsPage       && <Stack.Screen name='Apps'         component={appsPage.default}          options={{...TransitionPresets.SlideFromRightIOS ,headerTitleAlign:"center",headerShown: false, animationEnabled: false }}/>}
        {jrshikokuPage  && <Stack.Screen name='JRShikoku'    component={jrshikokuPage.default}     options={{...TransitionPresets.SlideFromRightIOS ,headerTitleAlign:"center",headerShown: false, animationEnabled: false }} path="JRShikoku"/>}
        {fmPage         && <Stack.Screen name='fm'           component={fmPage.default}            options={{...TransitionPresets.SlideFromRightIOS ,headerTitleAlign:"center",headerShown: false, animationEnabled: false }}/>}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

let date;
async function test(){
  date = await Linking.parseInitialURLAsync();
  console.log(date);
  console.log(date.queryParams);
  if(date.path){
    RootNavigation.navigate("404");
  }
  if(date.queryParams.page){
    switch(date.queryParams.page){
      case "web":
        RootNavigation.navigate("Web");
        break;
      case "Apps":
        switch(date.queryParams.app_id){
          case "fm":
            RootNavigation.navigate("fm");
            break;
          case "JRShikoku":
            RootNavigation.navigate("JRShikoku");
            break;
          default:
            RootNavigation.navigate("Apps");
            break;
  
  
        }
        break;
      default:
        RootNavigation.navigate("404");
        break;
  
    }
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
