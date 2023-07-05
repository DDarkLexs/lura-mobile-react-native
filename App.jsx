import React,{ useEffect, useState } from 'react';
import { View, StatusBar,Appearance,StyleSheet, useColorScheme,ToastAndroid,PushNotification,ActivityIndicator,Vibration } from 'react-native';
import {Text, Button , Appbar, IconButton ,useTheme } from 'react-native-paper'
import { Main } from './src/Pages/Main'
import BottomNav from './src/components/bottomNavigation'
import Login from './src/Pages/Authentication/Entrada'
import db from './src/utils/database'
import { useDispatch, useSelector } from 'react-redux'
const App = () => {

  const [ loading, setLoading ] = useState(false)
  const account = useSelector(state => state.usuario.account)
  
  
   const firstStep = async () => {
    try {
      setLoading(true)
      
      await db.createTables()
      
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
    return (
      <View style={ { flex:1 } }>

      {
        !!account ? <Main /> : <Login />
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
        loading?
        <LoadingScreen></LoadingScreen>
        :
        <RenderMain />
        // <Main></Main>
      }
    </View>
  );
  
};


export default App;