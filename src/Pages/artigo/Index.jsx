import {useState, useEffect} from 'react';
import {
  View,
  ToastAndroid,
  AlertButton,
  StyleSheet,
  ScrollView,
  Alert
} from 'react-native';
import {
  Text,
  useTheme,
  IconButton,
  Portal,
  Menu,
  Divider,
  Searchbar,
  Avatar,
  Dialog,
  TextInput,
} from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux';
import {DataTable, Button} from 'react-native-paper';
import {deleteArtigo} from '../../utils/database';
import {CadastroSection} from './registro';
import {QualidadePage} from '../ValidadePage';
import {actions, actions as artigoActions} from '../../store/reducers/artigo';
import {formatCurrency} from '../../utils/currency';
import { actions as setorActions } from '../../store/reducers/setor';
import { actions as validadeActions } from '../../store/reducers/validade';
import { ArtigoController } from '../../controller/artigo';

export const ArtigoListItem = navigation => {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState([]);
  const [prop, setprop] = useState(null);
  const items = useSelector(state => state.artigo.items);
  const loading = useSelector(state => state.artigo.loading);
  const { id_usuario } = useSelector(state => state.usuario.account);
  const theme = useTheme();
  const dispatch = useDispatch();
  const id_seccao = useSelector(state => state.setor.setor);    
  const arigoCtrl = new ArtigoController()
  
  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);




 
 

  const nextPage = () => {
    setprop(null);
  };
  const deleteItem = async item => {
    try {
      dispatch(artigoActions.setLoading(true));

      const response = await arigoCtrl.deleteArigoById(item.id_artigo);
      Alert.alert('removido com sucesso',
        `${item.nome} foi removido com sucesso!`,
        [{ text: 'OK' }],
        { cancelable: false } );
     
      get();

    } catch (error) {
      
      ToastAndroid.show(`${error}`, ToastAndroid.LONG);
    }finally {
      dispatch(artigoActions.setLoading(false));

    }
  };

  const get = async () => {
    try {
      if (!id_seccao) throw 'informe a setor!'
      dispatch(artigoActions.setLoading(true));

      const artigos = await arigoCtrl.getArtigos(id_seccao);

      dispatch(artigoActions.setArtigos(artigos));
      setData(artigos);
    } catch (error) {
      console.log(error)
      ToastAndroid.show(JSON.stringify(error), ToastAndroid.LONG);
    } finally {
      
      dispatch(artigoActions.setLoading(false));


    }
  };
  
  const handleNavigation = (artigo) => {
    try {

      dispatch(validadeActions.setIdArtigo(artigo.id_artigo));
      navigation.jumpTo('validade')
      
    } catch (error) {
      
      ToastAndroid.show(error, ToastAndroid.LONG);
    }

  }


  useEffect(() => {
    get();
  
    return () => {
      // Code to run on unmount (component will be unmounted when it is removed from the screen)
      // console.log('Component unmounted');
    };
  }, [id_seccao]);



 
  
  const Prinpipal = () => {
    // console.log(navigation)
    const [pesquisa, setPesquisa] = useState('');
    const handlePesquisa = text => {
      setPesquisa(text)
    }
    const handleSearch = text => {
      setPesquisa(text)
      const response = items.filter(
      artigo => artigo.nome.includes(text) 
      || artigo.categoria.includes(text))
      setData(response)
    };
  
  

    
    return (
      <ScrollView style={styles.containerStyle}>
        <View>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Button
              textColor="white"
              loading={loading}
              disabled={loading}
              onPress={ () =>{ dispatch(actions.setArtigoAddDialog(true)) } }
              style={{marginRight: 10}}
              // loading={true}
              buttonColor={theme.colors.primary}>
              {'adicionar'}
            </Button>
            <Button
              loading={loading}
              disabled={loading}
              onPress={() => get()}
              // loading={true}
              textColor="white"
              buttonColor={theme.colors.primary}
              >
              {!loading ? 'atualizar' : 'atualizando'}
            </Button>
          </View>
                <CadastroSection />
          
        </View>
        <View style={styles.containerSearch}>
          <Searchbar
            value={pesquisa}
            onSubmitEditing={(e)=>handleSearch(e.nativeEvent.text)}
            onChangeText={handlePesquisa}
            loading={loading}          
            editable={!loading}
            placeholder="procurar"
             />
        </View>

        <DataTable>
          <DataTable.Header>
            <DataTable.Title> artigo </DataTable.Title>
            <DataTable.Title> categoria </DataTable.Title>

            <DataTable.Title> preço </DataTable.Title>
            <DataTable.Title> </DataTable.Title>
          </DataTable.Header>

          {data.map(item => (
            <DataTable.Row 
            onPress={e =>  handleNavigation( item ) }
            key={item.id_artigo}>
              <DataTable.Cell>{item.nome}</DataTable.Cell>
              <DataTable.Cell>{item.categoria}</DataTable.Cell>
              <DataTable.Cell>{formatCurrency(item.preco)}</DataTable.Cell>
              <DataTable.Cell>
                <IconButton
                  onPress={() => deleteItem(item)}
                  icon="delete"
                  size={20}
                />
              </DataTable.Cell>
            </DataTable.Row>
          ))}

          {/* Add more DataTable.Rows as needed */}

          <DataTable.Pagination
            page={2}
            numberOfPages={3}
            onPageChange={page => {
              // console.log(page);
            }}

            // label="1-2 para 6"
          />
        </DataTable>
      </ScrollView>
    );
  };

  return (
    <View style={{flex: 1}}>
      <Prinpipal />
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {},
  containerSearch: {padding: 20},
});
