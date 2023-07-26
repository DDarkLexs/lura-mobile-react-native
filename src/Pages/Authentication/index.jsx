import React, { useState } from 'react';
import { View,StyleSheet,ImageBackground,Alert } from 'react-native';
import { TextInput,  Button, Card,Avatar,Text ,HelperText } from 'react-native-paper';
import { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Entrada from './Entrada'
import Registro from './Registro'

const AuthScreen = () => {
  const route = 0
  return (
    <ImageBackground
    source={require('../../assets/images/background-login.jpg')}
    style={styles.backgroundImage}>
    <View style={styles.container}>
      <Text style={{ color:'black' }}>
        { route }
      </Text>
    { 
    route === 0 ?
    <Entrada route={route} />
    :
    <Registro route={route} />
    }
   
    </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
      },
    container: {
        padding: 16,
        flex:1,
        justifyContent:'center'
    }
    

})

export default AuthScreen;