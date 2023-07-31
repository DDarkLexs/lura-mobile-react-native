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
  Alert
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
  Chip,
} from 'react-native-paper';
import {containerStyle} from '../../utils/style';
import {useSelector, useDispatch} from 'react-redux';
import {actions} from '../../store/reducers/validade';
import {
  formatarData,
  dataFormatada, 
  formatarDataSimples, 
  formatarDataMid,
  DataExpirou,
  formatarDefault,
  formatarDataLongo
} from '../../utils/formata-data';
import {
  deleteQualidadeById,
  ValidadeController,
} from '../../controller/validade';
import {NotFoundPage} from '../../components/NotFoundQualidade';
import DateTimePicker from '@react-native-community/datetimepicker';


export const ValidadePage = (navigation) => {
  const theme = useTheme()
  const valCtrl = new ValidadeController()
  const [searchQuery, setSearchQuery] = useState('');
  const [dialogVisible, setDialogVisible] = useState(false);
  const [inicio, setInicio] = useState(new Date());
  const [expira, setExpira] = useState(new Date());
  const [item, setItem] = useState({});
  const [showInicioPicker, setShowInicioPicker] = useState(false);
  const [showExpiraPicker, setShowExpiraPicker] = useState(false);
  const data = useSelector(state => state.validade.items);
  const loading = useSelector(state => state.validade.loading);
  const artigos = useSelector(state => state.artigo.items);
  const id_artigo = useSelector(state => state.validade.id_artigo);
  const showDialog = useSelector(state => state.validade.validadeDialog);
  const id_seccao = useSelector(state => state.setor.setor);
  const dispatch = useDispatch();

  const artigo = artigos.filter(item => item.id_artigo === id_artigo)[0]||{ nome:'adicione um artigo' };

  const handleSearch = query => {
    setSearchQuery(query);
    
    // // Filter data based on search query
    // const filteredData = data.filter(item =>
    //   item.name.toLowerCase().includes(query.toLowerCase()),
    // );
    // // Update the data to display filtered result
    // dispatch(filteredData.setQualidades(query));
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
      await valCtrl.insertValidade({
        inicio:formatarDefault(inicio), 
        expira:formatarDefault(expira),
        id_artigo});
      // After saving, close the dialog and reset the values
    
      setDialogVisible(false);
      setInicio(new Date());
      setExpira(new Date());
      ToastAndroid.show(
        "foi guardado com sucesso!",
        ToastAndroid.LONG);
      get(id_artigo)
    } catch (error) {
      Alert.alert(
        'Houve um erro',
        JSON.stringify(error),
        [{ text: 'OK' }],
        { cancelable: false });
    } finally {
      dispatch(actions.setLoading(false));
    }
  };

  const deleteItem = async id_validade => {
    try {
      dispatch(actions.setLoading(true));

      const query = await valCtrl.deleteValidadeById(id_validade);
      await get(id_artigo);
      Alert.alert(
        'sucesso',
        "Foi eliminado com sucesso!",
        [{ text: 'OK' }],
        { cancelable: false });


    } catch (error) {
    } finally {
      dispatch(actions.setLoading(false));
    }
  };


  const get = async id_artigo => {
    try {
      dispatch(actions.setLoading(true));
      
      const query = await valCtrl.getValidadebyIdArtigo(id_artigo);
      dispatch(actions.setOneArtigoValidades(query));
      
    } catch (error) {
     
      Alert.alert(
        'Houve um erro',
        JSON.stringify(error),
        [{ text: 'OK' }],
        { cancelable: false }
      );
    } finally {
      dispatch(actions.setLoading(false));
    }
  };

  const handleInicioChange = (event, selectedDate) => {
    const currentDate = new Date(selectedDate) || inicio;
    setShowInicioPicker(false);
    setInicio(currentDate);
  };
  
  const handleExpiraChange = (event, selectedDate) => {
  
    const currentDate = new Date(selectedDate) || expira;
    setShowExpiraPicker(false);
    setExpira(currentDate);
  
  };

  useEffect(() => {

    navigation.jumpTo('artigo')
    dispatch(actions.setOneArtigoValidades([]));
    
  }, [id_seccao]);

  useEffect(() => {

    get(id_artigo);
    
  }, [id_artigo]);


  return (
    <View style={styles.container}>
      {!id_artigo ? (
        <NotFoundPage />
      ) : (
        <ScrollView style={styles.container}>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Button
              textColor="white"
              style={{marginRight: 10}}
              disabled={loading}
              loading={loading}
              buttonColor={theme.colors.primary}
              onPress={openDialog}>
              adicionar
            </Button>
            <Button
              textColor="white"
              disabled={loading}
              loading={loading}
              buttonColor={theme.colors.primary}
              onPress={() => {
                get(id_artigo);
              }}>
              Atualizar
            </Button>
          </View>
          <View style={styles.containerSearch}>
            <Searchbar
              placeholder={ artigo.nome }
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
              <DataTable.Row  
              onPress={() => {
                setItem(item)
                dispatch(actions.setArtigo({ ...item, ...artigo }))
                dispatch(actions.setValidadeDialog(!showDialog))
              } } 
              key={item.id_validade}>
                <DataTable.Cell>
                  {formatarDataMid(item.inicio)}
                </DataTable.Cell>
                <DataTable.Cell>
                  {formatarDataMid(item.expira)}
                </DataTable.Cell>
                <DataTable.Cell>

                  {!DataExpirou(item.expira) ? (
                    <Chip
                    elevation={3}
                    textStyle={{ color:'white' }}
                    style={{color: 'white',backgroundColor: 'green' }}>
                      {'válido'}
                    </Chip>
                  ) : (
                    <Chip elevation={3}
                    textStyle={{ color:'white' }}
                      style={{color: 'white',backgroundColor: theme.colors.errorContainer }} >
                      {'expirou'}
                    </Chip>
                  )}
                </DataTable.Cell>
                <DataTable.Cell>
                  <IconButton
                    onPress={() => {
                      deleteItem(item.id_validade);
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

              {showInicioPicker && (
              <DateTimePicker
                value={inicio}
                mode="date"
                is24Hour={false}
                display="calendar"
                onChange={handleInicioChange}
              />
            )}
                <TextInput
                  label="Inicio"
                  value={formatarDataLongo(inicio)}
                  placeholder="DD-MM-AAAA"
                  mode="outlined"
                  disabled={loading}
                  keyboardType="default"
                  right={ <TextInput.Icon onPress={()=>setShowInicioPicker(true)}
                    icon={'calendar'} name="calendario0" />}
                />
                <HelperText>{formatarDefault(inicio)}</HelperText>

{/* ====================================================================================== */}
       
            {showExpiraPicker && (
              <DateTimePicker
                value={expira}
                mode="date"
                is24Hour={false}
                display="calendar"
                onChange={handleExpiraChange}
              />
            )}
                
                <TextInput
                  label="Expira"
                  disabled={loading}
                  placeholder="DD-MM-AAAA"
                  keyboardType="default"
                  mode="outlined"
                  value={formatarDataLongo(expira)}
                  right={ <TextInput.Icon onPress={() => setShowExpiraPicker(true)} icon={'calendar'} name="calendario1" />}
                />
                <HelperText>{formatarDefault(expira)}</HelperText>

              </Dialog.Content>
              <Dialog.Actions>
                <Button
                  disabled={loading}
                  loading={loading}
                  textColor="white"
                  buttonColor={theme.colors.primary}
                  onPress={closeDialog}>
                  Cancelar
                </Button>
                <Button
                  textColor="white"
                  disabled={loading}
                  loading={loading}
                  buttonColor={theme.colors.primary}
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
