import React,{ useEffect, useState } from 'react';
import { View, StatusBar,Appearance,StyleSheet, useColorScheme,ToastAndroid,PushNotification } from 'react-native';
import { Text,Button,Appbar,IconButton,useTheme } from 'react-native-paper'


export const QualidadePage = (prop) => {
    // console.log(prop)
    return (
      <View style={ { flex:1 } }>

        <Button textColor='white'
        buttonColor={useTheme().colors.primary}> 
          Voltar
        </Button>
       
        <Text>
            Qualidades para aqui
        </Text>
      </View>
    );
    
};