import React,{ useEffect, useState } from 'react';
import {Text, View, StatusBar,Appearance,StyleSheet, useColorScheme,ToastAndroid,PushNotification } from 'react-native';
import { Button,Appbar,IconButton,useTheme } from 'react-native-paper'
import { Main } from './src/Pages/Main'
import BottomNav from './src/components/bottomNavigation'
import Login from './src/Pages/Authentication/Entrada'
import './src/utils/database'

const App = () => {
  return (
    <View style={ { flex:1 } }>
      <StatusBar 
        barStyle={'default'} 
        translucent={true}
        backgroundColor={useTheme().colors.primary} >
      </StatusBar>
      <Main></Main>
      {/* <Login></Login> */}
    </View>
  );
  
};

export default App;