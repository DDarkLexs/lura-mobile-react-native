import React,{ useEffect, useState } from 'react';
import {Alert, StyleSheet} from 'react-native';
import {
  Dialog,
  Paragraph,
  Portal,
  Text,
  Button,
  useTheme,
  TextInput,
  HelperText
} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {actions as action} from '../../store/reducers/usuario';
import {
  formatarData,
  dataFormatada,
  formatarDataSimples,
  DataExpirou,
  formatarDataLongo,
  contando,
} from '../../utils/formata-data';
import { UserController/* getUsuario,updateUsuario */ } from '../../controller/usuario';


export const EditPerfilDialog = (/* { artigo , artigo } */) => {
  const [ nome, setNome ] = useState("") 
  const [ senha, setSenha ] = useState("") 
  const [ senha2, setSenha2 ] = useState("") 
  const [ telefone, setTelefone ] = useState("") 
  const [loading,setLoading ] = useState(false);
  const { updateUsuario, getUsuario } = new UserController()
  const showDialog = useSelector(state => state.usuario.editDialog);
  const account = useSelector(state => state.usuario.account);
  const dispatch = useDispatch();
  const theme = useTheme();



  const updateProfile = async (user) => {
    try {
      setLoading(true)
      if (senha !== senha2) throw "2º senha é diferente da 1º Senha" 

      await updateUsuario(user, account.id_usuario);
      const newUser = await getUsuario(account.id_usuario);

      dispatch(action.setAccount( newUser ));
      Alert.alert("Atualizado com sucesso!",
      "Os dados pessoais foram guardado com sucesso!");

    } catch (error) {
    Alert.alert("Houve um erro!",JSON.stringify(error))
    } finally {
      setLoading(false)

    }
  }
  const get = async () => {
    try {
      const reponse = await getUsuario();
      const { nome,senha,telefone } = reponse;
      setNome(nome);
      setSenha(senha);
      setSenha2(senha);
      setTelefone(telefone);
    } catch (error) {

      console.log(error)
      
    }
  }
  //   const artigo = useSelector(state => state.artigo.infoArtigoValidade);
    useEffect(() => {
      
      get()
      
    },[])

    
  return (
    <Portal>
      <Dialog
        dismissable={false}
        visible={showDialog}
        // onDismiss={() => console.log('Dialog dismissed.')}
        >
            <Dialog.Title>{"Editar a conta"}</Dialog.Title>
        <Dialog.Content>
        <TextInput
          disabled={loading}
          mode='outlined'
          value={nome}
          keyboardType='default'
          onChangeText={(value) => { setNome(value) }}
          label={'nome'}
          />
          <TextInput
          disabled={loading}
          onChangeText={(value) => { setTelefone(value) }}
          mode='outlined'
          value={telefone}
          keyboardType='default'
          label={'telefone'}
        />
          {/* <HelperText>
          {JSON.stringify(account)}
          </HelperText> */}
        <TextInput
          disabled={loading}
          mode='outlined'
          value={senha}
          keyboardType='default'
          label={'senha'}
          secureTextEntry
          onChangeText={(value) => { setSenha(value) }}
          />

        <TextInput
          disabled={loading}
          mode='outlined'
          keyboardType='default'
          label={'introduza novamente senha'}
          secureTextEntry
          onChangeText={(value) => { setSenha2(value) }}
          />

      

        </Dialog.Content> 
        <Dialog.Actions>
          <Button
            disabled={loading}
            loading={loading}
            buttonColor={theme.colors.primary}
            textColor='white'
            onPress={()=> {updateProfile({nome,senha,telefone})}}>
            salvar
          </Button>

          <Button
            disabled={loading}
            loading={loading}
            buttonColor={theme.colors.primary}
            textColor='white'
            onPress={() => dispatch(action.setEditDialog(!showDialog))}>
            fechar
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  artigo: {
    flex: 1,
  },
  label: {
    fontWeight: 'bold',
    alignContent: 'flex-start',
    marginRight: 20,
  },
  value: {},
});
