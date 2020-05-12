import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator,TransitionPresets } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { TopPage,  TopPageAbout } from './TopPage';
import { AboutMe } from './Page/Aboutme';
import { Page404 } from './404';
import { navigationRef } from './RootNavigation.js';
import JRShikoku from './Page/Apps/JRShikoku';
import Apps from './Page/Apps';
import Web from './Page/Web';
import fm from './Page/Apps/fm';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
export default function App() {
  return (
    <NavigationContainer linking={linking} ref={navigationRef}>
      <Stack.Navigator headerMode="screen">
        <Stack.Screen name='トップページ' component={TopPage}       options={{headerShown: false}}/>
        <Stack.Screen name='あばうと'     component={TopPageAbout}  options={{...TransitionPresets.ModalPresentationIOS ,headerTitleAlign:"center",headerShown: false, animationEnabled: true }}/>
        <Stack.Screen name='自分'         component={AboutMe}       options={{...TransitionPresets.SlideFromRightIOS ,headerTitleAlign:"center",headerShown: false, animationEnabled: true }}/>
        <Stack.Screen name='404'          component={Page404}       options={{...TransitionPresets.ModalSlideFromBottomIOS ,headerTitleAlign:"center",headerShown: false, animationEnabled: true }}/>
        <Stack.Screen name='Web'          component={Web}           options={{...TransitionPresets.SlideFromRightIOS ,headerTitleAlign:"center",headerShown: false, animationEnabled: true }}/>
        <Stack.Screen name='Apps'         component={Apps}          options={{...TransitionPresets.SlideFromRightIOS ,headerTitleAlign:"center",headerShown: false, animationEnabled: true }}/>
        <Stack.Screen name='JRShikoku'    component={JRShikoku}     options={{...TransitionPresets.SlideFromRightIOS ,headerTitleAlign:"center",headerShown: false, animationEnabled: true }}/>
        <Stack.Screen name='fm'           component={fm}            options={{...TransitionPresets.SlideFromRightIOS ,headerTitleAlign:"center",headerShown: false, animationEnabled: true }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const linking = {};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
