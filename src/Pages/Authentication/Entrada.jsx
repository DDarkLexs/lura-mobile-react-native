import React, {useState} from 'react';
import {View, StyleSheet, ImageBackground, Alert,Image} from 'react-native';
import {
    TextInput,
    Button,
    Card,
    Avatar,
    Text,
    HelperText,
    Checkbox,
} from 'react-native-paper';
import {useEffect} from 'react';
import {generateBioauth} from '../../config/biometric';
import { actions } from '../../store/reducers/routes';
import { actions as UserActions } from '../../store/reducers/usuario';
import {useSelector, useDispatch} from 'react-redux';


import {UserController} from '../../controller/usuario';

export default function LoginScreen() {
    const [telefone, setTelefone] = useState('');
    const [senha, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(false);
    const userCrl = new UserController();

    const dispatch = useDispatch();

    useEffect(() => {
        const fisrt = async () => {
            setLoading(true);
            try {
                  const response = await generateBioauth()
                  if (response.success) {
                     
                    const user = await userCrl.getUserByIdUsuario(response.touchID)

                    await autoLogin(user.telefone,user.senha)

                  }
            } catch (error) {


            } finally {
                setLoading(false);
            }
        };

        
        fisrt();
        // generateAccessToken({ nome:'antonio lugogo' })
    }, []);
    
    const autoLogin = (tel,sen) => {
        return new Promise(async (resolve,reject)=> {
            try {
                setLoading(true);
                // const senha = password
                // console.log(user)
    
                if (status) {
                  
                    const userOnline = await userCrl.logInOnline(tel, sen);
                    const user = await userCrl.loginUser(userOnline);
                    dispatch(UserActions.setAccount(user))
                    /* 
                    buscar usuario online, adicionar no sqlite3
                    depois fazer o login
                    */
                } else {
                   const user = await userCrl.loginOffline(tel, sen);
                    dispatch(UserActions.setAccount(user))
                    /* 
                      buscar usuario no sqlite3
                      depois fazer o login
                    */
                }
                
                resolve()
            } catch (error) {
                reject(error);
    
                Alert.alert('Houve um erro', error, [{text: 'OK'}], {
                    cancelable: false,
                });
            } finally {
                setLoading(false);
            }

        })

    }
    const handleLogin = async () => {
        // Aqui você pode implementar a lógica de autenticação
        try {
            setLoading(true);
            // const senha = password
            // console.log(user)

            if (status) {
              
                const userOnline = await userCrl.logInOnline(telefone, senha);
                const user = await userCrl.loginUser(userOnline);
                dispatch(UserActions.setAccount(user))
                /* 
                buscar usuario online, adicionar no sqlite3
                depois fazer o login
                */
            } else {
               const user = await userCrl.loginOffline(telefone, senha);
                dispatch(UserActions.setAccount(user))
                /* 
                  buscar usuario no sqlite3
                  depois fazer o login
                */
            }

        } catch (error) {
            console.log(error);

            Alert.alert('Houve um erro', error, [{text: 'OK'}], {
                cancelable: false,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Card disabled={loading}>
                <Card.Content>
                    <View
                        style={{
                            alignItems: 'center',
                            margin: 'auto',
                            justifyContent: 'center',
                        }}
                    >
                        <Image
                            source={require('../../assets/images/user.png')}
                            style={{ width:150,height:150 }}
                        />
                        <Text style={{fontSize: 30, marginBottom: 16}}>
                            Entrada
                        </Text>
                    </View>
                    <TextInput
                        label='Telefone'
                        value={telefone}
                        onChangeText={setTelefone}
                        mode='outlined'
                        keyboardType='phone-pad'
                        autoCapitalize='none'
                        disabled={loading}
                        right={
                            <TextInput.Icon icon={'phone'} name='telefone' />
                        }
                        style={{marginBottom: 16}}
                    />

                    <TextInput
                        label='Palavra-passe'
                        value={senha}
                        onChangeText={setPassword}
                        disabled={loading}
                        mode='outlined'
                        secureTextEntry
                        right={<TextInput.Icon icon={'lock'} name='lock' />}
                        style={{marginBottom: 16}}
                    />
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            margin: 10,
                        }}
                    >
                        <Checkbox
                            status={status ? 'checked' : 'unchecked'}
                            onPress={() => {
                                setStatus(!status);
                            }}
                        />
                        <HelperText>{status ? 'online' : 'offline'}</HelperText>
                    </View>
                    <View
                        style={{flexDirection: 'row', justifyContent: 'center'}}
                    >
                        <Button
                            disabled={loading}
                            loading={loading}
                            style={{marginRight: 5}}
                            mode='contained'
                            textColor={'white'}
                            onPress={handleLogin}
                        >
                            Entrar
                        </Button>
                        <Button
                            disabled={loading}
                            loading={loading}
                            style={{marginLeft: 5}}
                            onPress={() => {
                                dispatch(actions.setAuthPage(1));
                            }}
                            mode='contained'
                            textColor={'white'}
                        >
                            criar conta
                        </Button>
                    </View>
                </Card.Content>
            </Card>
        </View>
    );
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
    },
});
