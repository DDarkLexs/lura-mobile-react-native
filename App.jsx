import React,{ useEffect, useState } from 'react';
import { View, StatusBar,Appearance,StyleSheet, useColorScheme,ToastAndroid,PushNotification,ActivityIndicator,Vibration } from 'react-native';
import {Text, Button , Appbar, IconButton ,useTheme } from 'react-native-paper'
import { Main } from './src/Pages/Main'
import BottomNav from './src/components/bottomNavigation'
import AuthScreen from './src/Pages/Authentication/index'
import { Schema } from './src/database/schema'
import {  userRepository } from './src/database/repository/usuario'
import { useDispatch, useSelector } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage';
const App = () => {
  const [ loading, setLoading ] = useState(true)
  const account = useSelector(state => state.usuario.account)
  const esquema = new Schema()
  const user = new userRepository()

  
  const firstStep = async () => {
    try {
      setLoading(true)
      
      // await db.createTables()

      await esquema.createAll()
      // console.log(await user.InsertNewUser(null,null,'937781157'))
      //  await user.getUserId()
  
    
      // await db.dropAllTable()
      
    } catch (error) {
      
    } finally {

      setLoading(false)

    }

    
  }

  useEffect(()=>{
    firstStep()

  },[])
  
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent:'center',
      textAlign:'center',
      alignItems:'center',
      backgroundColor:useTheme().dark?'white':useTheme().colors.background,
      
    },
    loadingText:{
      margin: 10,
      fontSize:17
  
    }
  })

  const RenderMain = () => {
    const storeData = async (value) => {
      try {
      //  const item = await AsyncStorage.getItem('user')
      //  console.log(item)
        // await AsyncStorage.setItem('user',JSON.stringify({
        //   nome:'antonio lugogo'
        // }))
      } catch (error) {
        
      }
    }
    storeData()
    return (
      <View style={ { flex:1 } }>

      {
        !!account ? <Main /> : <AuthScreen />
      }

      </View>
    )

  }

  const LoadingScreen = ()=> {
    return (
      <View style={ styles.container }>
        
        <ActivityIndicator color={useTheme().colors.primary} size={40}/>
        <Text style={styles.loadingText}>
         Processando...
        </Text>
      </View>
    )
  }
  return (
    <View style={ { flex:1 } }>
      <StatusBar 
        barStyle={'default'} 
        translucent={true}
        backgroundColor={useTheme().colors.primary} >
      </StatusBar>
      {
        false?
        <LoadingScreen></LoadingScreen>
        :
        <RenderMain />
        // <Main></Main>
      }
    </View>
  );
  
};


export default App;