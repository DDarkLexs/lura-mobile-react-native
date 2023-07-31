import React, {useState, useEffect} from 'react';
import {ScrollView, Text, StyleSheet, Switch, View,Alert} from 'react-native';
import {DataTable,Badge, useTheme,Button, Chip} from 'react-native-paper';
import { ValidadeController } from '../../controller/validade';
import {  actions  } from '../../store/reducers/validade';
import {formatCurrency} from '../../utils/currency';
import {useDispatch, useSelector} from 'react-redux';
import { DataExpirou,formatarDataMid } from '../../utils/formata-data';


export const Vigencia = () => {
  const data = useSelector(state => state.validade.artigosValidade);
  const [filteredData, setFilteredData] = useState(data);
  const [showExpired, setShowExpired] = useState(true);
  const id_seccao = useSelector(state => state.setor.setor);   
  const showDialog = useSelector(state => state.validade.validadeDialog);
  const loading = useSelector(state => state.validade.loading);
  const valCtrl = new ValidadeController()

  const theme = useTheme();
  const dispatch = useDispatch();
  const handleFilter = filterQuery => {
    const lowerCaseQuery = filterQuery.toLowerCase();
    const filteredItems = data.filter(item =>
      item.nome.toLowerCase().includes(lowerCaseQuery),
    );
    setFilteredData(filteredItems);
  };

  const getValidades = async () => {
    try {
      dispatch(actions.setArtigosValidade([]));
    dispatch(actions.setLoading(true));
    const response = await valCtrl.getAllArValByIdSeccao(id_seccao)
    const artigos = response.map(item => {
        Object.assign(item, {expirado: DataExpirou(item.expira)})        
        return item
    })

    dispatch(actions.setArtigosValidade(artigos));
    } catch (error) {
      console.error(error)
      Alert.alert(
        'Houve um erro',
        JSON.stringify(error),
        [{ text: 'OK' }],
        { cancelable: false });
    } finally {
      dispatch(actions.setLoading(false));
    };
    }

  const handleToggleSwitch = () => {
    setShowExpired(!showExpired);
  };

  useEffect(() => {
    getValidades();
}, []);


  useEffect(() => {
    getValidades();
}, [id_seccao]);


useEffect(() => {
    const work = (async ()=> {
        
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
                getValidades();
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
          onPress={()=>{
            dispatch(actions.setArtigo({ ...item }))
            dispatch(actions.setValidadeDialog(!showDialog))
          }
          }
          key={item.id_validade}>
            <DataTable.Cell>{item.nome}</DataTable.Cell>
            <DataTable.Cell>{formatarDataMid(item.expira)}</DataTable.Cell>
            <DataTable.Cell>
            <Chip
            textStyle={{ color:'white', }}
            style={{ 
            borderRadius: 10,
            marginRight: 5,
            color:'white',
            backgroundColor:item.expirado ? theme.colors.errorContainer : '#34a853'
             }}>
                {item.expirado ? 'Expirado' : 'Válido'}
            </Chip>
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
