import React, {useState} from 'react';
import {View, StyleSheet, ImageBackground, Alert} from 'react-native';
import {
    TextInput,
    Button,
    Card,
    Avatar,
    Text,
    HelperText,
} from 'react-native-paper';
import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Entrada from './Entrada';
import Registro from './Registro';
import {actions} from '../../store/reducers/routes';

const AuthScreen = () => {
    const route = useSelector((state) => state.routes.authPage);

    return (
        <ImageBackground
            source={require('../../assets/images/background-login.jpg')}
            style={styles.backgroundImage}
        >
            <View style={styles.container}>
                {/* <Text style={{color: 'black'}}>{route}</Text> */}
                {route === 0 ? <Entrada /> : <Registro />}
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
        flex: 1,
        justifyContent: 'center',
    },
});

export default AuthScreen;
