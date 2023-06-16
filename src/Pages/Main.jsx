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
  
} from 'react-native-paper';
import {useSelector, useStore, useDispatch} from 'react-redux';
import { CadastroSection } from './artigo/registro';
import { ArtigoListItem as artigoPage  } from './artigo/ListItem';
import { ProfileScreen } from './ProfileScreen';
import {  BiometricsScreen } from '../components/biometrico';
import {actions as routeAction} from '../store/reducers/routes';
import {actions as userAction} from '../store/reducers/usuario';
import 'react-native-gesture-handler';

const MusicRoute = artigoPage;

const AlbumsRoute = () => <Text>Albums</Text>;

const RecentsRoute = () => 
  <View>
  <BiometricsScreen/>
 
  </View>;

export const Main = () => {
  const [index, setIndex] = useState(0);
  const [routes] = React.useState([
    {
      key: 'artigo',
      title: 'Artigo',
      focusedIcon: 'archive',
      unfocusedIcon: 'archive-outline',
    },
    {key: 'add', title: 'Adicionar', focusedIcon: 'archive-plus' ,unfocusedIcon: 'archive-plus-outline', },
    {key: 'recents', title: 'Recents', focusedIcon: 'history'},
    {
      key: 'usuario',
      title: 'usuário',
      focusedIcon: 'account',
      
      unfocusedIcon: 'account-outline',
    },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    artigo: artigoPage,
    add: CadastroSection,
    recents: RecentsRoute,
    usuario: ProfileScreen,
  });
  //   const theme = useTheme()
  //   const store = useStore().getState()
  const page = useSelector(state => state.routes.page);

  const dispatch = useDispatch();


  return (
    <View style={{flex: 1}}>
      <Appbar.Header>
        {/* <Appbar.BackAction onPress={() => {}} /> */}
        <Appbar.Content title={'Lura'} />

         <Avatar.Icon size={35} icon="account" />
        <IconButton
        containerColor={useTheme().colors.primary}
        onPress={()=> { dispatch(userAction.setAccount( null )) }}
          icon="logout"
         
          size={20}
        />
      </Appbar.Header>

      <View style={styles.mainConstainer}>
        <BottomNavigation
          navigationState={{index, routes}}
          // barStyle={ { backgroundColor:useTheme().colors.primary  } }
          onIndexChange={setIndex}
          renderScene={renderScene} />
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
