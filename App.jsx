import React, {useEffect, useState} from 'react';
import {
    View,
    StatusBar,
    Appearance,
    StyleSheet,
    useColorScheme,
    ToastAndroid,
    PushNotification,
    ActivityIndicator,
    Vibration,
} from 'react-native';
import {Text, Button, Appbar, IconButton, useTheme} from 'react-native-paper';
import {Main} from './src/Pages/Main';
import BottomNav from './src/components/bottomNavigation';
import AuthScreen from './src/Pages/Authentication/index';
import {Schema} from './src/database/schema';
import {UserRepository} from './src/database/repository/usuario';
import {useDispatch, useSelector} from 'react-redux';
import {UserController} from './src/controller/usuario';
import {actions as userAction} from './src/store/reducers/usuario';
import {Alert, Image} from 'react-native';

const App = () => {

    // Alert.alert('Alert Title', 'My Alert Msg', [
    //     {
    //       text: 'Cancel',
    //       onPress: () => console.log('Cancel Pressed'),
    //       style: 'cancel',
    //     },
    //     {text: 'OK', onPress: () => console.log('OK Pressed')},
    //   ]);
  
    


    const userCtrl = new UserController();
    const [loading, setLoading] = useState(true);
    let account = useSelector((state) => state.usuario.account);
    const esquema = new Schema();
    const dispatch = useDispatch();

    const firstStep2 = async () => {
        return new Promise(async (resolve, reject) => {
            try {
                let data = await userCtrl.localAccount.getAccount();
                if (data) {
                    dispatch(userAction.setAccount(data));
                }

                resolve(data);
            } catch (error) {
                reject(error);
            }
        });
    };

    const firstStep = async () => {
        return new Promise(async (resolve, reject) => {
            try {
                // await esquema.dropTable()
                await esquema.createAll();

                resolve();
            } catch (error) {
                reject(error);
            }
        });
    };

    useEffect(() => {
        const proceed = async () => {
            try {
                setLoading(true);
                await firstStep();
                await firstStep2();
            } catch (error) {
                Alert.alert('Houve um erro', error, [{text: 'OK'}], {
                    cancelable: false,
                });
            } finally {
                setLoading(false);
            }
        };
        proceed();
    }, []);

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            textAlign: 'center',
            alignItems: 'center',
            backgroundColor: useTheme().dark
                ? 'white'
                : useTheme().colors.background,
        },
        loadingText: {
            margin: 10,
            fontSize: 17,
        },
    });

    const RenderMain = () => {
        return (
            <View style={{flex: 1}}>
                {!account ? <AuthScreen /> : <Main />}
            </View>
        );
    };

    const LoadingScreen = () => {
        return (
            <View style={styles.container}>
                {/*  */}
                <Image
                    style={{width: 150, height: 150}}
                    source={require('./src/assets/images/logo.png')}
                ></Image>
                <ActivityIndicator
                    color={useTheme().colors.primary}
                    size={40}
                />
                <Text style={styles.loadingText}>Processando...</Text>
            </View>
        );
    };
    return (
        <View style={{flex: 1}}>
            <StatusBar
                barStyle={'default'}
                translucent={true}
                backgroundColor={useTheme().colors.primary}
            ></StatusBar>
            {
                loading ? <LoadingScreen></LoadingScreen> : <RenderMain />
                // <Main></Main>
            }
        </View>
    );
};

export default App;
