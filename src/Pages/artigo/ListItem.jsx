import {useState, useEffect} from 'react';
import {
  View,
  ToastAndroid,
  AlertButton,
  StyleSheet,
  ScrollView,
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
import {CadastroSection} from '../artigo/registro';
import {QualidadePage} from '../Qualidade/todo';
import {deleteArigoById, getAllartigoByUserId} from '../../controller/artigo';
import {actions, actions as artigoActions} from '../../store/reducers/artigo';
import {formatCurrency} from '../../utils/currency';
import swal from 'react-native-sweet-alert';

export const ArtigoListItem = navigation => {
  const [visible, setVisible] = useState(false);
  const [pesquisa, setPesquisa] = useState('');
  const [data, setData] = useState([]);
  const [prop, setprop] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const items = useSelector(state => state.artigo.items);
  const loading = useSelector(state => state.artigo.loading);
  const {id_usuario} = useSelector(state => state.usuario.account);
  const theme = useTheme();
  const dispatch = useDispatch();

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  const handleSearch = e => {
    setPesquisa(e.nativeEvent.text);
    
    // Filter data based on search query
    const filteredData = data.filter(artigo =>
      artigo.nome.toLowerCase().includes(pesquisa.toLowerCase()),
    );

    // Update the data to display filtered results
    setData(filteredData);
  };

  const onChangeSearch = query => setSearchQuery(query);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const nextPage = () => {
    setprop(null);
  };
  const deleteItem = async item => {
    try {
      dispatch(artigoActions.setLoading(true));

      const response = await deleteArigoById(item.id_produto);
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
      const artigos = await getAllartigoByUserId(id_usuario);
      dispatch(artigoActions.setArtigos(artigos));
      setData(artigos);
      dispatch(artigoActions.setLoading(false));
    } catch (error) {
      dispatch(artigoActions.setLoading(false));
      ToastAndroid.show(error, ToastAndroid.LONG);
    }
  };
  
  const handleNavigation = (artigo) => {
    try {

      dispatch(artigoActions.setIdProduto(artigo.id_produto));
      navigation.jumpTo('qualidade')
      
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
  }, []);



 
  
  const Prinpipal = () => {
    // console.log(navigation)
    
    return (
      <ScrollView style={styles.containerStyle}>
        <View>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Button
              textColor="white"
              loading={loading}
              disabled={loading}
              // onPress={ () =>{ dispatch(actions.setArtigoAddDialog(true)) } }
              style={{marginRight: 10}}
              // loading={true}
              buttonColor={theme.colors.primary}>
              {'adicionar'}
            </Button>
            <Button
              textColor="white"
              loading={loading}
              disabled={loading}
              onPress={() => get()}
              // loading={true}
              buttonColor={theme.colors.primary}>
              {!loading ? 'atualizar' : 'atualizando'}
            </Button>
          </View>
                <CadastroSection />
          
        </View>
        <View style={styles.containerSearch}>
         {/*  <Searchbar
            placeholder="procurar"
            onChange={handleSearch} 
            value={pesquisa} /> */}
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
            key={item.id_produto}>
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
