import React, {useState} from 'react';
import {View, StyleSheet, ImageBackground, Alert, Image} from 'react-native';
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
import {UserController} from '../../controller/usuario';
import {actions as routeAct} from '../../store/reducers/routes';
import {useSelector, useDispatch} from 'react-redux';

const LoginScreen = () => {
    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [senha, setPassword] = useState('');
    const [_password, _setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(true);
    const account = useSelector((state) => state.usuario.account);
    const userApi = new UserController();

    const dispatch = useDispatch();

    useEffect(() => {}, []);

    const handleSignIn = async () => {
        // Aqui você pode implementar a lógica de autenticação
        try {
            setLoading(true);

            if (senha === _password) {
                if (status) {
                    const account = await userApi.signInOnline({
                        nome,
                        senha,
                        telefone,
                    });
                } else {
                    const account = await userApi.signInOffline({
                        nome,
                        senha,
                        telefone,
                    });
                }

                Alert.alert(
                    'Sucesso',
                    `usuário foi registrado!`,
                    [{text: 'OK'}],
                    {cancelable: false},
                );
            } else {
                throw 'senhas diferente';
            }
            //   const account = await loginUser({ nome, senha, telefone })
            //   dispatch(actions.setAccount( account ))
        } catch (error) {
            console.log(error);

            Alert.alert(
                'Houve um erro',
                JSON.stringify(error),
                [{text: 'OK'}],
                {
                    cancelable: false,
                },
            );
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
                            source={require('../../assets/images/signIn.png')}
                            style={{ width:150,height:150 }}
                        />

                        <Text style={{fontSize: 30, marginBottom: 16}}>
                            Entrada
                        </Text>
                    </View>
                    <TextInput
                        label='Nome'
                        value={nome}
                        onChangeText={setNome}
                        mode='outlined'
                        keyboardType='default'
                        autoCapitalize='none'
                        disabled={loading}
                        right={
                            <TextInput.Icon icon={'account'} name='account' />
                        }
                        style={{marginBottom: 16}}
                    />

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
                    <TextInput
                        label='Palavra-passe Novamente'
                        value={_password}
                        onChangeText={_setPassword}
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
                            onPress={handleSignIn}
                        >
                            registrar
                        </Button>
                        <Button
                            disabled={loading}
                            loading={loading}
                            onPress={() => {
                                dispatch(routeAct.setAuthPage(0));
                            }}
                            style={{marginLeft: 5}}
                            mode='contained'
                            textColor={'white'}
                        >
                            Entrada
                        </Button>
                    </View>
                </Card.Content>
            </Card>
        </View>
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
    },
});

export default LoginScreen;
