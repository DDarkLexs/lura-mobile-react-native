import React, {useEffect, useState} from 'react';
import { View, StyleSheet, Appearance /* ,Button */, Alert } from 'react-native';
import {formatCurrency} from '../../utils/currency';
import {
  Text,
  Button,
  Appbar,
  IconButton,
  useTheme,
  TextInput,
  Menu,
  ActivityIndicator,
  HelperText,
  Portal,
  Dialog,
} from 'react-native-paper';
import {useSelector, useStore, useDispatch} from 'react-redux';
import {insertNew} from '../../controller/artigo';
import { ToastAndroid,Vibration } from 'react-native';
import {actions as artigoActions} from '../../store/reducers/artigo';


export const CadastroSection = () => {
  const theme = useTheme();
  const [nome, setNome] = useState('');
  const [categoria, setCategoria] = useState('');
  const [preco, setPreco] = useState(0);
  const [descricao, setDescricao] = useState('');
  const dispatch = useDispatch();

  const showDialog = () => setVisible(true);

  const hideDialog = () => dispatch(artigoActions.setArtigoAddDialog(false));

  // const store = useStore().getState();

  const propiedade = {nome, categoria, preco, descricao};
  const loading = useSelector(state => state.artigo.loading);
  const show = useSelector(state => state.artigo.artigoAddDialog);
  const { id_usuario } = useSelector(state => state.usuario.account);

  /* ==================================================== */
  const [visible, setVisible] = useState(true);


  const handleMenuItemPress = item => {
    setSelectedItem(item);
    closeMenu();
  };

  const registrar = async () => {
    try {
      dispatch(artigoActions.setLoading(true));
      
      
      const response = (await insertNew(propiedade, id_usuario));
      
      dispatch(artigoActions.setLoading(false));
      Alert.alert(
        'sucesso',
        `${propiedade.nome} foi guardado!`,
        [{ text: 'OK' }],
        { cancelable: false }
      );

    } catch (error) {
      
      Alert.alert(
        'Houve um erro',
        error,
        [{ text: 'OK' }],
        { cancelable: false }
      );

      // ToastAndroid.show(`Houve um erro: ${error}`, ToastAndroid.LONG);
    } finally {
      dispatch(artigoActions.setLoading(false));

    }
  };

  return (
      <Portal>
      <Dialog visible={show} onDismiss={hideDialog}>
        <Dialog.Title> Cadastro de artigo </Dialog.Title>
        <Dialog.Content>
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
        keyboardType="numeric"
      />
      <HelperText type="info" visible={true}>
        {formatCurrency(preco)}
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
        style={{width: 'auto', marginTop: 12}}
        textColor="white"
        buttonColor={theme.colors.primary}>
        Registrar
      </Button>
              </Dialog.Content>
            </Dialog>
          </Portal>

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
