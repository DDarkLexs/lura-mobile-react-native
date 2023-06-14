import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Appearance /* ,Button */, Alert} from 'react-native';
import swal from 'react-native-sweet-alert';
import { formatCurrency } from '../../utils/currency'
import {
  Text,
  Button,
  Appbar,
  IconButton,
  useTheme,
  TextInput,
  Menu,
  ActivityIndicator,
  HelperText
} from 'react-native-paper';
import {useSelector, useStore, useDispatch } from 'react-redux';
import { insertArtigo,getArtigos } from '../../utils/database'
import { ToastAndroid } from 'react-native';
import {  actions as artigoActions } from '../../store/reducers/artigo'


export const CadastroSection = () => {
  const theme = useTheme();
  const [nome, setNome] = useState('');
  const [categoria, setCategoria] = useState('');
  const [preco, setPreco] = useState(0);
  const [descricao, setDescricao] = useState('');
  
  // const store = useStore().getState();
  const dispatch = useDispatch();

  const propiedade = {nome, categoria, preco, descricao};
  const  loading  = useSelector(state => state.artigo.loading)

  /* ==================================================== */
  const [visible, setVisible] = useState(false);
  
  const handleMenuItemPress = item => {
    setSelectedItem(item);
    closeMenu();
  };
  
  const registrar = async () => {
    try {
      dispatch(artigoActions.setLoading(true));
      const result = await insertArtigo(propiedade)

      dispatch(artigoActions.setLoading(false));

      swal.showAlertWithOptions({
        title: 'sucesso',
        subTitle: `${propiedade.nome} foi guardado!`,
        confirmButtonTitle: 'OK',
        confirmButtonColor: '#000',
        otherButtonTitle: 'Cancel',
        otherButtonColor: '#dedede',
        style: 'success',
        cancellable: true,
        onConfirm: () => console.log('Confirmed'),
        onCancel: () => console.log('Cancelled'),
      });
      
    } catch (error) {
      dispatch(artigoActions.setLoading(false));
      
      ToastAndroid.show(`Houve um erro: ${error}`,ToastAndroid.LONG)
    }
  };

  return (
    <View>
   <TextInput
          label={'Nome'}
          keyboardType="default"
          mode="outlined"
          disabled={loading}
          onChangeText={text => {
            setNome(text);
          }}
          // right={<TextInput.Icon icon="box" />}
        />
        <TextInput
          label="categoria"
          disabled={loading}
          onChangeText={text => setCategoria(text)}
          mode="outlined"
          keyboardType="default"
        />
         
        <TextInput
          label="Preço"
          defaultValue="0"
          disabled={loading}
          onChangeText={text => setPreco(text)}
          mode="outlined"
          keyboardType="decimal-pad"
        />
        <HelperText type="info" visible={true}>
        { formatCurrency(preco) }
        </HelperText>
        <TextInput
          label="Descrição"
          numberOfLines={4}
          multiline={true}
          disabled={loading}
          mode="outlined"
          keyboardType="default"
        />
        <Button
          onPress={registrar}
          mode="contained"
          disabled={loading}
          loading={loading}
          style={{width: 'auto', marginTop:12 }}
          textColor="white"
          buttonColor={theme.colors.primary}>
          Registrar
        </Button>
        {/* <ActivityIndicator color='white' /> */}

    </View>
  );
};
const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 30,
  },
  container: {
    flex: 1,
    padding: 16,
    // justifyContent: 'center',
  },
  inputContainer: {
    margin: 10,
  },
  ButtonContainer: {},
});