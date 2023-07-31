import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ScrollView, Alert} from 'react-native';
import {
    Avatar,
    Button,
    Card,
    Title,
    Paragraph,
    useTheme,
    IconButton,
    Menu,
} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {PainelController} from '../../controller/painel';
import {actions} from '../../store/reducers/usuario';
import {UserController} from '../../controller/usuario';
import {LocalAccount} from '../../controller/storage';
import {ToastAndroid} from 'react-native';
import ReactNativeBiometrics, {
    Biometrics,
    FaceID,
} from 'react-native-biometrics';

export const Painel = () => {
    const localStore = new LocalAccount();
    const theme = useTheme();
    const [data, setData] = useState([
        {label: 'Total Artigo', value: 0, icon: 'format-list-numbered'},
        {label: 'Validade Total', value: 0, icon: 'calendar-sync'},
        {label: 'Total Expirado', value: 0, icon: 'calendar-alert'},
        {label: 'Total Válido', value: 0, icon: 'calendar-check'},
    ]);
    const [touchID, settTouchID] = useState(false);
    const account = useSelector((state) => state.usuario.account);
    const showDialog = useSelector((state) => state.usuario.editDialog);
    const dispatch = useDispatch();
    const painelCtrl = new PainelController();
    const userCtrl = new UserController();
    const id_seccao = useSelector((state) => state.setor.setor);
    const [visible, setVisible] = useState(false);
    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);
    [loading, setLoading] = useState(false);

    const get = async () => {
        try {
            setLoading(true);
            const {artigoTotal, validadesTotal, totalExpirado, totalValido} =
                await painelCtrl.getDashboardData(id_seccao);
            setData([
                {
                    label: 'Total Artigo',
                    value: artigoTotal,
                    icon: 'format-list-numbered',
                },
                {
                    label: 'Validade Total',
                    value: validadesTotal,
                    icon: 'calendar-sync',
                },
                {
                    label: 'Total Expirado',
                    value: totalExpirado,
                    icon: 'calendar-alert',
                },
                {
                    label: 'Total Válido',
                    value: totalValido,
                    icon: 'calendar-check',
                },
            ]);
            data.map((card, i) => {
                card.value = data[i].value;
                return card;
            });
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

    const edit = () => {
        try {
            dispatch(actions.setEditDialog(!showDialog));
        } catch (error) {
            console.error(error);
        }
    };

    const aplicarFingerPrint = async (e) => {
        try {
            setLoading(true);

            if (!account.id_usuario) {
                throw 'id inválido';
            }

            const biometrics = new ReactNativeBiometrics({
                allowDeviceCredentials: true,
            });
            const sensor = await biometrics.isSensorAvailable();

            console.log(sensor);
            if (sensor.available && sensor.biometryType == 'Biometrics') {
                let response = await biometrics.simplePrompt({
                    promptMessage: 'confirmar com Touch ID',
                    cancelButtonText: 'fechar',
                });

                if (response.success === false) {
                    throw 'impressão digital inválido';
                }

                await localStore.storeFingerPrint(account.id_usuario);
            } else {
                throw 'Biomêtrico não é suportado no neste dispositivo!';
            }

            ToastAndroid.show(
                `impressão digital foi confirmado com esta conta!`,
                ToastAndroid.LONG,
            );

            closeMenu();
        } catch (error) {
            console.log(error);

            ToastAndroid.show(JSON.stringify(error), ToastAndroid.LONG);
        } finally {
            setLoading(false);
        }
    };

    const removerFingerPrint = async (e) => {
        try {
            setLoading(true);

            if (!touchID) {
                throw 'não há touchID';
            }
            if (!account.id_usuario) {
                throw 'id inválido';
            }

            const id_usuario = await localStore.getFingerPrint();
            const isEqual = Number(account.id_usuario) === Number(id_usuario);

            if (!isEqual) {
                throw 'uma conta local está a usar o touchID!';
            }

            const biometrics = new ReactNativeBiometrics({
                allowDeviceCredentials: true,
            });
            const sensor = await biometrics.isSensorAvailable();

            console.log(sensor);
            if (sensor.available && sensor.biometryType == 'Biometrics') {
                let response = await biometrics.simplePrompt({
                    promptMessage: 'confirmar com Touch ID',
                    cancelButtonText: 'fechar',
                });

                if (response.success === false) {
                    throw 'impressão digital inválido';
                }

                await localStore.removeFingerPrint(null);
            } else {
                throw 'Biomêtrico não é suportado no neste dispositivo!';
            }

            ToastAndroid.show(
                `impressão digital foi removido!`,
                ToastAndroid.LONG,
            );
            settTouchID(false);

            closeMenu();
        } catch (error) {
            console.log(error);
            ToastAndroid.show(JSON.stringify(error), ToastAndroid.LONG);
        } finally {
            setLoading(false);
        }
    };

    const confirmTouchID = async (e) => {
        try {
            setLoading(true);
            const id_usuario = await localStore.getFingerPrint();
            settTouchID(!!id_usuario);
            closeMenu();
        } catch (error) {
        } finally {
            setLoading(false);
        }
    };

    const getOnlineToken = async () => {
        try {
            setLoading(true);

            await userCtrl.logInOnline(account.telefone, account.senha);

            ToastAndroid.show(
                'conta connectado com servidor',
                ToastAndroid.LONG,
            );
        } catch (error) {
            ToastAndroid.show(JSON.stringify(error), ToastAndroid.LONG);
        } finally {
            setLoading(false);
            closeMenu();
        }
    };

    const terminarSessao = async () => {
        try {
            const response = await localStore.removeAccount();
            if (response) {
                dispatch(actions.setAccount(null));
            }
        } catch (error) {
            alert(error);
        }
    };

    const createBackup = async () => {
        try {
            setLoading(true);

            // console.log('ok')
            // const res = await userCtrl.proceedBackup();
            // if(res === 'terminando a sessão!'){
                
            //     return await terminarSessao()
            // }
            ToastAndroid.show(JSON.stringify('sucesso'), ToastAndroid.LONG);
        } catch (error) {
            ToastAndroid.show(JSON.stringify(error), ToastAndroid.LONG);
            console.error(error);
        } finally {
            setLoading(false);
            closeMenu();
        }
    };

    useEffect(() => {
        get();
        confirmTouchID();
    }, [id_seccao]);

    return (
        <ScrollView style={styles.container}>
            <Card disabled={loading}>
                <Card.Content>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Avatar.Icon size={65} icon='account' />
                    </View>
                    <Title> {account.nome} </Title>
                    <Paragraph> {account.telefone} </Paragraph>
                </Card.Content>
                <Card.Actions></Card.Actions>
            </Card>

            <Card style={styles.cardStyle}>
                <Card.Content>
                    <View
                        style={{flexDirection: 'row', justifyContent: 'center'}}
                    >
                        <IconButton
                            disabled={loading}
                            icon='account-edit'
                            iconColor={'white'}
                            size={25}
                            containerColor={theme.colors.primary}
                            onPress={() => edit()}
                        />
                        <IconButton
                            disabled={loading}
                            icon='sync'
                            iconColor={'white'}
                            size={25}
                            containerColor={theme.colors.primary}
                            onPress={() => get()}
                        />
                        <IconButton
                            disabled={loading}
                            icon='cloud-sync'
                            iconColor={'white'}
                            size={25}
                            onPressIn={() => getOnlineToken()}
                            containerColor={theme.colors.primary}
                            onPress={() => 1}
                        />
                        <Menu
                            visible={visible}
                            onDismiss={closeMenu}
                            anchor={
                                <IconButton
                                    disabled={loading}
                                    icon='dots-vertical'
                                    iconColor={'white'}
                                    size={25}
                                    containerColor={theme.colors.primary}
                                    onPressIn={openMenu}
                                />
                            }
                        >
                            {
                                <Menu.Item
                                    leadingIcon={'cloud-upload'}
                                    title={'fazer Backup'}
                                    onPress={() => createBackup()}
                                />
                            }
                            {
                                <Menu.Item
                                    leadingIcon={'cloud-download'}
                                    title={'recuperar'}
                                    onPress={() => {
                                        console.log('ok');
                                    }}
                                />
                            }
                            {
                                <Menu.Item
                                    leadingIcon={
                                        touchID
                                            ? 'fingerprint-off'
                                            : 'fingerprint'
                                    }
                                    title={
                                        touchID
                                            ? 'remover impressão digital'
                                            : 'aplicar impressão digital'
                                    }
                                    onPress={(e) =>
                                        touchID
                                            ? removerFingerPrint(e)
                                            : aplicarFingerPrint(e)
                                    }
                                />
                            }
                        </Menu>
                    </View>
                </Card.Content>

                <Card.Actions></Card.Actions>
            </Card>

            {data.map((item, index) => (
                <Card key={index} style={{margin: 10}} disabled={loading}>
                    <Card.Content>
                        <Avatar.Icon size={50} icon={item.icon} />
                        <View
                            style={{
                                alignContent: 'flex-end',
                                alignItems: 'flex-end',
                            }}
                        >
                            <Title>{item.label}</Title>
                            <Paragraph>{item.value}</Paragraph>
                        </View>
                    </Card.Content>
                </Card>
            ))}

            <View style={{marginBottom: 100}}></View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    buttonP: {
        margin: 5,
    },
    cardStyle: {
        margin: 10,
    },
    container: {
        flex: 1,
        padding: 16,
        // justifyContent: 'center',
    },
});
