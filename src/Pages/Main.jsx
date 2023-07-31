import React, {useState} from 'react';
import {
    View,
    StyleSheet,
    Appearance,
    ToastAndroid,
    ActivityIndicator,
    Vibration,
    Alert,
} from 'react-native';
import {
    Avatar,
    Text,
    Searchbar,
    Button,
    Appbar,
    IconButton,
    useTheme,
    BottomNavigation,
    Divider,
    FAB,
    Portal,
    Chip
} from 'react-native-paper';
import {useSelector, useStore, useDispatch} from 'react-redux';
import {CadastroSection} from './Artigo/registro';
import {ArtigoListItem as ArtigoListPage} from './Artigo/Index';
import {Painel} from './Painel/Painel';
import {Vigencia} from './Vigencia/index';
import {ValidadePage} from './ValidadePage';
import {ValidadeInfo} from '../components/ValidadeDialog/info';
import {actions as routeAction} from '../store/reducers/routes';
import {actions as userAction} from '../store/reducers/usuario';
import 'react-native-gesture-handler';
import {actions as artigoActions} from '../store/reducers/artigo';
import {EditPerfilDialog} from '../components/PerfilEditDialog/index';
import {useEffect} from 'react';
import {UserController} from '../controller/usuario';
import {SelectSetor} from '../components/Setor/SelectSetor';
import {AdicionarSetor} from '../components/Setor/AdicionarSetor';
import {actions as setorActions} from '../store/reducers/setor';
import {SetorController} from '../controller/setor';
import { updateAuthorization } from '../api/usuario';

export const Main = () => {
    const [index, setIndex] = useState(3);
    const [state, setState] = useState({open: false});
    const setor = useSelector((state) => state.setor.setor);
    const setorArray = useSelector((state) => state.setor.setorArray);
    const [setorLabel, setSetorLabel] = useState(null);
    const onStateChange = ({open}) => setState({open});
    const {localAccount} = new UserController();
    const setorCtrl = new SetorController();
    const [ loading, setLoading ] = useState(false) 
    const theme = useTheme()

    useEffect(() => {
        setLoading(true)
        setSetorLabel(null);
        const label = setorArray.find((item) => item.id_seccao === setor);
        if (label) {
            setSetorLabel(label.nome);
        }
        setLoading(false)
    }, [setor]);

    useEffect(() => {
        const proceed = async () => {
            try {
                setLoading(true)
                const $setor = await setorCtrl.getFisrtSector();
                dispatch(setorActions.setSetor($setor.id_seccao));
                const token = JSON.parse(await localAccount.getToken())
                if(token){
                    updateAuthorization(token)
                }

                
            } catch (error) {
                dispatch(setorActions.setSetor(null));
                ToastAndroid.show(JSON.stringify(error), ToastAndroid.LONG);
            } finally {
                setLoading(false)
            }
        };
        proceed();
    }, []);

    const [routes] = React.useState([
        {
            key: 'artigo',
            title: 'Artigo',
            focusedIcon: 'archive',
            unfocusedIcon: 'archive-outline',
        },
        {
            key: 'validade',
            title: 'validade',
            focusedIcon: 'clipboard-text-clock',
            unfocusedIcon: 'clipboard-text-clock-outline',
        },
        {
            key: 'vigencia',
            title: 'Vigência',
            focusedIcon: 'clipboard-flow',
            unfocusedIcon: 'clipboard-flow-outline',
        },
        {
            key: 'Painel',
            title: 'Painel',
            focusedIcon: 'view-dashboard',
            unfocusedIcon: 'view-dashboard-outline',
        },
    ]);

    const {open} = state;

    const renderScene = BottomNavigation.SceneMap({
        artigo: ArtigoListPage,
        validade: ValidadePage,
        vigencia: Vigencia,
        Painel: Painel,
    });

    const page = useSelector((state) => state.routes.page);
    const artigoAddDialog = useSelector(
        (state) => state.artigo.artigoAddDialog,
    );

    const dispatch = useDispatch();

    const terminarSessao = async () => {
        try {
            const response = await localAccount.removeAccount();
            if (response) {
                dispatch(userAction.setAccount(null));
            }
        } catch (error) {
            alert(error);
        }
    };

    return (
        <View style={{flex: 1}}>
            <Appbar.Header>
                <Appbar.Content title={'Lura'} mode='medium' color='white' />
                {!!setorLabel && !loading  ? (
                    <Chip
                        textStyle={{ color:'white' }}
                        style={{marginRight: 20, height:35, backgroundColor:theme.colors.inversePrimary }}
                    >
                        {setorLabel}
                    </Chip>
                ) : null}

                <Avatar.Image
                    source={require('../assets/images/user.png')}
                    size={40}
                    style={{marginRight: 5}}
                />
            </Appbar.Header>

            <SelectSetor />
            <ValidadeInfo />
            <EditPerfilDialog />
            <AdicionarSetor />

            <View style={styles.mainConstainer}>
                <Portal>
                    <FAB.Group
                        style={{marginBottom: 80}}
                        open={open}
                        visible
                        color={'white'}
                        onLongPress={() => {
                            // Vibration.cancel()//vibrate([1000,2000,10000],false)
                        }}
                        fabStyle={{backgroundColor: useTheme().colors.primary}}
                        variant={'primary'}
                        icon={open ? 'close' : 'menu'}
                        actions={[
                            {
                                icon: 'archive-plus',
                                label: 'Adicionar Artigo',
                                color: 'white',
                                style: {
                                    backgroundColor: useTheme().colors.primary,
                                },
                                onPress: () => {
                                    dispatch(
                                        artigoActions.setArtigoAddDialog(true),
                                    );
                                },
                            },
                            {
                                icon: 'store-plus',
                                label: 'adicionar setor',
                                color: 'white',
                                style: {
                                    backgroundColor: useTheme().colors.primary,
                                },
                                onPress: () =>
                                    dispatch(
                                        setorActions.setAddSetorDialog(true),
                                    ),
                            },
                            {
                                icon: 'store-check',
                                label: 'selecionar setor',
                                color: 'white',
                                style: {
                                    backgroundColor: useTheme().colors.primary,
                                },
                                onPress: () =>
                                    dispatch(
                                        setorActions.setSelectSetorDialog(true),
                                    ),
                            },
                            {
                                icon: 'logout',
                                label: 'Terminar sessão',
                                onPress: () => terminarSessao(),
                                color: 'white',
                                style: {
                                    backgroundColor: useTheme().colors.primary,
                                },
                            },
                        ]}
                        onStateChange={onStateChange}
                        onPress={() => {
                            if (open) {
                                // do something if the speed dial is open
                            }
                        }}
                    />
                </Portal>
                <BottomNavigation
                    navigationState={{index, routes}}
                    shifting={true}
                    sceneAnimationType='shifting'
                    compact={true}
                    // barStyle={ { backgroundColor:useTheme().colors.primary  } }
                    onIndexChange={setIndex}
                    renderScene={renderScene}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    mainConstainer: {
        flex: 1,
        height: '100%',
    },
});
