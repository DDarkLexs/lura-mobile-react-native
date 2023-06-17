import React, {useEffect, useState} from 'react';
import {
  View,
  StatusBar,
  Appearance,
  StyleSheet,
  useColorScheme,
  ToastAndroid,
  PushNotification,
  ScrollView,
} from 'react-native';
import {
  Text,
  Button,
  Appbar,
  IconButton,
  useTheme,
  DataTable,
  Searchbar,
  Portal,
  Dialog,
  Badge,
  TextInput,
  HelperText,
} from 'react-native-paper';
import {containerStyle} from '../../utils/style';
import {useSelector, useDispatch} from 'react-redux';
import {actions} from '../../store/reducers/artigo';
import {
  formatarData,
  dataFormatada,
  formatarDataSimples,
  DataExpirou,
} from '../../utils/formata-data';
import {
  insertQualidade,
  getQualidadebyIdProduto,
  deleteQualidadeById,
} from '../../controller/qualidade';
import {NotFoundPage} from '../../components/NotFoundQualidade';
import swal from 'react-native-sweet-alert';
export const QualidadePage = navigation => {
  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState([]);

  const [dialogVisible, setDialogVisible] = useState(false);
  const [inicio, setInicio] = useState('');
  const [expira, setExpira] = useState('');
  const loading = useSelector(state => state.artigo.loading);
  const artigos = useSelector(state => state.artigo.items);
  const id_produto = useSelector(state => state.artigo.id_produto);
  const dispatch = useDispatch();

  const artigo = artigos.filter(item => item.id_produto === id_produto)[0];

  const handleSearch = query => {
    setSearchQuery(query);

    // Filter data based on search query
    const filteredData = data.filter(item =>
      item.name.toLowerCase().includes(query.toLowerCase()),
    );

    // Update the data to display filtered results
    setData(filteredData);
  };

  const openDialog = () => {
    setDialogVisible(true);
  };

  const closeDialog = () => {
    setDialogVisible(false);
  };

  const handleSave = async () => {
    try {
      dispatch(actions.setLoading(true));

      // Perform save operation with the values of "inicio" and "expira"
      // You can add your logic here to save the values
      await insertQualidade({inicio, expira, id_produto});
      // After saving, close the dialog and reset the values
      dispatch(actions.setLoading(false));
      swal.showAlertWithOptions({
        title: 'sucesso',
        subTitle: `foi guardado com sucesso!`,
        confirmButtonTitle: 'OK',
        confirmButtonColor: '#000',
        otherButtonTitle: 'Cancelar',
        otherButtonColor: '#dedede',
        style: 'success',
        cancellable: true,
      });
      setDialogVisible(false);
      setInicio('');
      setExpira('');
    } catch (error) {
      swal.showAlertWithOptions({
        title: 'Houve um erro',
        subTitle: `${error}!`,
        confirmButtonTitle: 'OK',
        confirmButtonColor: '#000',
        otherButtonTitle: 'Cancel',
        otherButtonColor: '#dedede',
        style: 'error',
        cancellable: true,
        // onConfirm: () => console.log('Confirmed'),
        // onCancel: () => console.log('Cancelled'),
      });
    } finally {
      dispatch(actions.setLoading(false));
    }
  };

  const deleteItem = async id_qualidade => {
    try {
      dispatch(actions.setLoading(true));

      const query = await deleteQualidadeById(id_qualidade);
      await get();

      swal.showAlertWithOptions({
        title: 'Foi eliminado com sucesso!',
        //  subTitle: `${error}`,
        confirmButtonTitle: 'OK',
        confirmButtonColor: '#000',
        otherButtonColor: '#dedede',
        style: 'success',
        cancellable: true,
        // onConfirm: () => console.log('Confirmed'),
        // onCancel: () => console.log('Cancelled'),
      });
    } catch (error) {
    } finally {
      dispatch(actions.setLoading(false));
    }
  };
  const get = async id_produto => {
    try {
      dispatch(actions.setLoading(true));

      const query = await getQualidadebyIdProduto(id_produto);

      setData(query);
    } catch (error) {
      swal.showAlertWithOptions({
        title: 'Houve um erro',
        subTitle: `${error}`,
        confirmButtonTitle: 'OK',
        confirmButtonColor: '#000',
        otherButtonTitle: 'Cancel',
        otherButtonColor: '#dedede',
        style: 'error',
        cancellable: true,
        // onConfirm: () => console.log('Confirmed'),
        // onCancel: () => console.log('Cancelled'),
      });
    } finally {
      dispatch(actions.setLoading(false));
    }
  };

  // get(id_produto)
  useEffect(() => {
    get(id_produto);
  }, []);

  return (
    <View style={styles.container}>
      {!id_produto ? (
        <NotFoundPage />
      ) : (
        <ScrollView style={styles.container}>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Button
              textColor="white"
              style={{marginRight: 10}}
              disabled={loading}
              loading={loading}
              buttonColor={useTheme().colors.primary}
              onPress={openDialog}>
              adicionar
            </Button>
            <Button
              textColor="white"
              disabled={loading}
              loading={loading}
              buttonColor={useTheme().colors.primary}
              onPress={() => {
                get(id_produto);
              }}>
              Atualizar
            </Button>
          </View>

          <View style={styles.containerSearch}>
            <Searchbar
              placeholder={artigo.nome}
              onChangeText={handleSearch}
              value={searchQuery}
            />
          </View>

          <DataTable>
            <DataTable.Header>
              <DataTable.Title> frabricado </DataTable.Title>
              <DataTable.Title> expiração </DataTable.Title>
              <DataTable.Title> estado </DataTable.Title>
              <DataTable.Title> </DataTable.Title>
            </DataTable.Header>

            {data.map((item, i) => (
              <DataTable.Row key={item.id_qualidade}>
                <DataTable.Cell>
                  {formatarDataSimples(item.inicio)}
                </DataTable.Cell>
                <DataTable.Cell>
                  {formatarDataSimples(item.expira)}
                </DataTable.Cell>
                <DataTable.Cell>

                  {!DataExpirou(item.expira) ? (
                    <Badge
                      size={25}
                      style={{color: 'white', backgroundColor: 'green'}}
                      theme={{mode: 'exact'}}>
                      {'válido'}
                    </Badge>
                  ) : (
                    <Badge
                      size={25}
                      style={{color: 'white', backgroundColor: 'red'}}
                      theme={{mode: 'adaptive'}}>
                      {'expirou'}
                    </Badge>
                  )}
                </DataTable.Cell>
                <DataTable.Cell>
                  <IconButton
                    onPress={() => {
                      deleteItem(item.id_qualidade);
                    }}
                    icon="delete"
                    size={20}
                  />

                  <IconButton onPress={() => {}} icon="pencil" size={20} />
                </DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>

          <Portal>
            <Dialog visible={dialogVisible} onDismiss={closeDialog}>
              <Dialog.Title>Registrar</Dialog.Title>
              <Dialog.Content>
                <TextInput
                  label="Inicio"
                  placeholder="DD-MM-AAAA"
                  mode="outlined"
                  disabled={loading}
                  value={inicio}
                  keyboardType="numeric"
                  onChangeText={setInicio}
                />
                <HelperText>{formatarData(inicio)}</HelperText>
                <TextInput
                  label="Expira"
                  disabled={loading}
                  placeholder="DD-MM-AAAA"
                  keyboardType="numeric"
                  mode="outlined"
                  value={expira}
                  onChangeText={setExpira}
                />
                <HelperText>{formatarData(expira)}</HelperText>
              </Dialog.Content>
              <Dialog.Actions>
                <Button
                  disabled={loading}
                  loading={loading}
                  textColor="white"
                  buttonColor={useTheme().colors.primary}
                  onPress={closeDialog}>
                  Cancelar
                </Button>
                <Button
                  textColor="white"
                  disabled={loading}
                  loading={loading}
                  buttonColor={useTheme().colors.primary}
                  onPress={handleSave}>
                  Salvar
                </Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerDataTable: {
    flex: 1,
  },
  containerStyle: {},
  containerSearch: {padding: 20},
});
