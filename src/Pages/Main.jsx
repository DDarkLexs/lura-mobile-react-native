import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Appearance,
  ToastAndroid,
  ActivityIndicator,
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
} from 'react-native-paper';
import {useSelector, useStore, useDispatch} from 'react-redux';
import {CadastroSection} from './artigo/registro';
import {ArtigoListItem as ArtigoListPage} from './artigo/ListItem';
import {Painel} from './Painel/Painel';
import { Vigencia } from './Vigencia/index';
import {QualidadePage} from './Qualidade/todo';
import {BiometricsScreen} from '../components/biometrico';
import {actions as routeAction} from '../store/reducers/routes';
import {actions as userAction} from '../store/reducers/usuario';
import 'react-native-gesture-handler';
import {actions as artigoActions} from '../store/reducers/artigo';

export const Main = () => {
  const [index, setIndex] = useState(0);
  const [state, setState] = useState({open: false});
  const onStateChange = ({open}) => setState({open});
  
  const [routes] = React.useState([
    {
      key: 'artigo',
      title: 'Artigo',
      focusedIcon: 'archive',
      unfocusedIcon: 'archive-outline',
    },
    {
      key: 'qualidade',
      title: 'validade',
      focusedIcon: 'clipboard-text-clock',
      unfocusedIcon: 'clipboard-text-clock-outline',
    },
    {
      key: 'vigencia',
      title: 'Vigência',
      focusedIcon: 'clipboard-flow',
      unfocusedIcon: 'clipboard-flow-outline' 
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
    qualidade: QualidadePage,
    vigencia: Vigencia,
    Painel: Painel,
  });

  const page = useSelector(state => state.routes.page);
  const artigoAddDialog = useSelector(state => state.artigo.artigoAddDialog);

  const dispatch = useDispatch();

  return (
    <View style={{flex: 1}}>
      <Appbar.Header>
        {/* <Appbar.BackAction onPress={() => {}} /> */}
        <Appbar.Content title={'Lura'} mode="medium" color="white" />

        <Avatar.Icon size={40} style={{marginRight: 5}} icon="account" />
      </Appbar.Header>

      <View style={styles.mainConstainer}>
        <Portal>
          <FAB.Group
            style={{marginBottom: 80}}
            open={open}
            visible
            color={'white'}
            fabStyle={{backgroundColor: useTheme().colors.primary}}
            variant={'primary'}
            icon={open ? 'close' : 'plus'}
            actions={[
              {
                icon: 'archive-plus',
                label: 'Adicionar Artigo',
                color: 'white',
                style: {
                  backgroundColor: useTheme().colors.primary,
                },
                onPress: () => {
                  dispatch(artigoActions.setArtigoAddDialog(true));
                },
              },
              /*        {
              icon: 'star',
              label: 'Star',
              onPress: () => console.log('Pressed star'),

            },
 */
              {
                icon: 'logout',
                label: 'Terminar sessão',
                onPress: () => dispatch(userAction.setAccount(null)),
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
