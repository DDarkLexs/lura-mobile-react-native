import React, {useEffect, useState} from 'react';
import {
  View,
  StatusBar,
  Appearance,
  StyleSheet,
  useColorScheme,
  ToastAndroid,
  PushNotification,
  ScrollView,
} from 'react-native';
import {
  Text,
  Button,
  Appbar,
  IconButton,
  useTheme,
  DataTable,
  Searchbar,
  Portal,
  Dialog,
  TextInput,
  HelperText,
} from 'react-native-paper';

export const NotFoundPage = () => {

  useEffect(()=>{


  },[])
  
  return (
    <View style={styles.container}>
        <Text style={styles.ItemText}>
            Selecione um artigo para poder visualizar
        </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center',
    alignContent:'center',
    alignItems:'center',
  },
  ItemText: {
    // fontSize:1

  }
});
