import {useState, useEffect} from 'react';
import {View, ToastAndroid, AlertButton, StyleSheet, ScrollView} from 'react-native';
import {
  Text,
  useTheme,
  IconButton,
  Portal,
  Menu,
  Divider,
  Searchbar,
  Avatar,Dialog,
  TextInput
} from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux';
import {DataTable, Button} from 'react-native-paper';
import {getArtigos, deleteArtigo} from '../../utils/database';
import { deleteArigoById } from '../../controller/artigo';
import {actions as artigoActions} from '../../store/reducers/artigo';
import {CadastroSection} from '../artigo/registro';
import {QualidadePage} from '../Qualidade/todo';
import { formatCurrency } from '../../utils/currency';
import swal from 'react-native-sweet-alert';





export const ArtigoListItem = navigation => {
  const [visible, setVisible] = useState(false);
  const [pesquisa, setPesquisa] = useState('');

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);
  // console.log(navigation)
  
  const [data, setData] = useState([]);
  const [prop, setprop] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const onChangeSearch = query => setSearchQuery(query);

  
  const openMenu = () => setVisible(true);
  
  const closeMenu = () => setVisible(false);
  
  const items = useSelector(state => state.artigo.items);
  const loading = useSelector(state => state.artigo.loading);
  const dispatch = useDispatch();

  const nextPage = () => {
    setprop(null);
  };
  const deleteItem = async (item) => {
    try {
      dispatch(artigoActions.setLoading(true));

      const response = await deleteArigoById(item.id_produto) 
      // console.log(response)
      swal.showAlertWithOptions({
        title: 'removido com sucesso',
        subTitle: `${item.nome} foi removido com sucesso!`,
        confirmButtonTitle: 'OK',
        confirmButtonColor: '#000',
        otherButtonTitle: 'Cancel',
        otherButtonColor: '#dedede',
        style: 'success',
        cancellable: true,
        onConfirm: () => console.log('Confirmed'),
        onCancel: () => console.log('Cancelled'),
      });
      get();

      dispatch(artigoActions.setLoading(false));
    } catch (error) {
      dispatch(artigoActions.setLoading(false));

      ToastAndroid.show(`${error}`, ToastAndroid.LONG);
    }
  };

  const get = async () => {
    try {
      dispatch(artigoActions.setLoading(true));
      const artigos = await getArtigos();
      dispatch(artigoActions.setArtigos(artigos));
      setData(artigos);
      dispatch(artigoActions.setLoading(false));
    } catch (error) {
      dispatch(artigoActions.setLoading(false));
      ToastAndroid.show(error, ToastAndroid.LONG);
    }
  };

  useEffect(() => {
    get();

    return () => {
      // Code to run on unmount (component will be unmounted when it is removed from the screen)
      console.log('Component unmounted');
    };
  }, []);


  const DataRow = ({item}) => {
    return (
      <DataTable.Row>
        
        <DataTable.Cell
          onPress={() => {
            /* setprop(item.id_produto) */
          }}>
        
          {item.nome}
        </DataTable.Cell>
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
    );
  };

  const Prinpipal = () => {
    return (
      <ScrollView style={ styles.containerStyle }>
        <View>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <Button
          textColor="white"
          loading={loading}
          disabled={loading}
          onPress={showDialog}
          style={ { marginRight:10 } }
          // loading={true}
          buttonColor={useTheme().colors.primary}>
          { !loading ? 'adicionar' : '' }
        </Button>
        <Button
          textColor="white"
          loading={loading}
          disabled={loading}
          onPress={() => get()}
          // loading={true}
          buttonColor={useTheme().colors.primary}>
          { !loading ? 'atualizar' : 'atualizando' }
        </Button>
        </View>
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title> Cadastro de artigo </Dialog.Title>
            <Dialog.Content>
              <CadastroSection />
            </Dialog.Content>
          </Dialog>
        </Portal>
      </View>
      <View style={ styles.containerSearch }>
      <Searchbar onChangeText={(text)=>{ setPesquisa(text) }} placeholder="Pesquisar" />
      </View>
      

        
        <DataTable>
          <DataTable.Header>
            <DataTable.Title> nome dos artigo  </DataTable.Title>
            <DataTable.Title> cat. </DataTable.Title>
           
        <DataTable.Title> preço </DataTable.Title>
            <DataTable.Title> </DataTable.Title>
          </DataTable.Header>

          {items.map(item => {
            return <DataRow item={item} key={item.id_produto} />;
          })}

          {/* Add more DataTable.Rows as needed */}

          <DataTable.Pagination
            page={1}
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
    <View style={ { flex: 1 } }>
        <Prinpipal />
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {  },
  containerSearch: { padding: 20 },
});
