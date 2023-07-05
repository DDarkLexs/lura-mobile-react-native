import React, {useState, useEffect} from 'react';
import {ScrollView, Text, StyleSheet, Switch, View,Alert} from 'react-native';
import {DataTable,Badge, useTheme,Button} from 'react-native-paper';
import {getAllartigoByValidade} from '../../controller/artigo';
import {actions as artigoActions} from '../../store/reducers/artigo';
import {formatCurrency} from '../../utils/currency';
import {useDispatch, useSelector} from 'react-redux';
import { DataExpirou,formatarDataMid } from '../../utils/formata-data';


export const Vigencia = () => {
  const data = useSelector(state => state.artigo.artigosValidade);
  const [filteredData, setFilteredData] = useState(data);
  const [showExpired, setShowExpired] = useState(true);
  const {id_usuario} = useSelector(state => state.usuario.account);
  const showDialog = useSelector(state => state.artigo.qualidadeDialog);
  const loading = useSelector(state => state.artigo.loading);

  const theme = useTheme();
  const dispatch = useDispatch();
  const handleFilter = filterQuery => {
    const lowerCaseQuery = filterQuery.toLowerCase();
    const filteredItems = data.filter(item =>
      item.nome.toLowerCase().includes(lowerCaseQuery),
    );
    setFilteredData(filteredItems);
  };

  const getArtigos = async () => {
    try {
    dispatch(artigoActions.setLoading(true));
    const response = await getAllartigoByValidade(id_usuario)
    const artigos = response.map(item => {
        Object.assign(item, {expirado: DataExpirou(item.expira)})        
        return item
    })

    dispatch(artigoActions.setArtigosValidade(artigos));
    } catch (error) {
      Alert.alert(
        'Houve um erro',
        error,
        [{ text: 'OK' }],
        { cancelable: false });
    } finally {
      dispatch(artigoActions.setLoading(false));
    };
    }

  const handleToggleSwitch = () => {
    setShowExpired(!showExpired);
  };

  useEffect(() => {
    getArtigos();
}, []);

useEffect(() => {
    const work = (async ()=> {
        // getArtigos()
        const filteredItems = showExpired
          ? data.filter(item => item.expirado)
          : data.filter(item => !item.expirado);
        setFilteredData(filteredItems);

    })
    work()
  }, [data,showExpired]);


  /* test */
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(true);

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPicker(false);
    setDate(currentDate);
    // Do something with the selected date
  };

  const showDateTimePicker = () => {
    setShowPicker(true);
  };

  return (
    <ScrollView style={styles.container}>
       <View style={{flexDirection: 'row', justifyContent: 'center'}}>
      <View style={styles.switch}>
        <Switch 
        disabled={loading}
        value={showExpired}
        onValueChange={handleToggleSwitch} />
      </View>
            
            <Button
              textColor="white"
              disabled={loading}
              loading={loading}
              buttonColor={theme.colors.primary}
              onPress={() => {
               getArtigos();
              }}>
              Atualizar
            </Button>
          </View>
    

      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Nome</DataTable.Title>
          <DataTable.Title>Data de Validade</DataTable.Title>
          <DataTable.Title>Validade</DataTable.Title>
        </DataTable.Header>

        {filteredData.map(item => (
          <DataTable.Row 
          onLongPress={()=>{
            dispatch(artigoActions.setInfoArtigoValidade({ ...item }))
            dispatch(artigoActions.setqualidadeDialog(!showDialog))
          }
          }
          key={item.id_qualidade}>
            <DataTable.Cell>{item.nome}</DataTable.Cell>
            <DataTable.Cell>{formatarDataMid(item.expira)}</DataTable.Cell>
            <DataTable.Cell>
            <Badge 
            style={{ 
            borderRadius: 10,
            marginRight: 5,
            color:'white',
            backgroundColor:item.expirado ? 'red' : '#34a853'
             }} size={25}>
                {item.expirado ? 'Expirado' : 'Válido'}
            </Badge>
            </DataTable.Cell>
          </DataTable.Row>
        ))}

        <DataTable.Pagination
         /*  totalItems={filteredData.length}
          itemsPerPage={10}
          onChangePage={page => console.log(page)}
          label="1-10 de 20" */
        />
      </DataTable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  switch: {
    alignSelf: 'flex-start',
    marginRight: 20,
    marginTop: 10,
  },
});
