import React, { useState } from 'react';
import { View,StyleSheet,ImageBackground,Alert } from 'react-native';
import { TextInput,  Button, Card,Avatar,Text ,HelperText } from 'react-native-paper';
// import { generateAccessToken } from '../../config/jwt'
import { useEffect } from 'react';
import {  generateBioauth } from '../../config/biometric';
import {  loginUser,loginUserAuto } from '../../controller/usuario';
import { generateAccessToken } from '../../config/jwt';
import { actions } from '../../store/reducers/usuario'
import {useSelector, useDispatch} from 'react-redux';

const LoginScreen = () => {
  const [nome, setNome] = useState('');
  const [password, setPassword] = useState('');
  const [loading,setLoading ] = useState(false);
  const account = useSelector(state => state.usuario.account)

  const dispatch = useDispatch()
  

    useEffect(()=> {
      const fisrt = async () => {
        setLoading(true)
        try {
          
          const result = await generateBioauth()
          if (result.success) {
            // console.log(result)
            const user = await loginUserAuto()
            dispatch(actions.setAccount( user ))            
          }
          setLoading(false)
        } catch (error) {
          setLoading(false)
          console.error(error)          
        }

      }

      fisrt()
      // generateAccessToken({ nome:'antonio lugogo' })
    },[])

  const handleLogin = async () => {
    // Aqui você pode implementar a lógica de autenticação
    try {
      setLoading(true)
      const account = await loginUser({ nome, password })
      dispatch(actions.setAccount( account ))
      // await generateAccessToken(result)

      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)

      Alert.alert(
        'Houve um erro',
        error,
        [{ text: 'OK' }],
        { cancelable: false }
      );
    
    }
  };

  return (
    <ImageBackground
    source={require('../../assets/images/background-login.jpg')}
    style={styles.backgroundImage}>
    <View style={styles.container}>
    <Card disabled={loading}>
        <Card.Content >

        <View style={{ alignItems: 'center', margin:"auto",justifyContent:'center' }}>
        <Avatar.Image
        source={require('../../assets/images/user.png')}
        size={120}
        />
        <Text style={{ fontSize: 30, marginBottom: 16 }}>
            Entrada
        </Text>
        </View>
      <TextInput
        label="Nome"
        value={nome}
        onChangeText={setNome}
        mode="outlined"
        keyboardType="default"
        autoCapitalize="none"
        disabled={loading}
        right={ <TextInput.Icon  icon={'account'} name="account" />}
        style={{ marginBottom: 16 }}
        />
     
      <TextInput
        label="Palavra-passe"
        value={password}
        onChangeText={setPassword}
        disabled={loading}
        mode="outlined"
        secureTextEntry
        right={ <TextInput.Icon icon={'lock'} name="lock" />}
        style={{ marginBottom: 16 }}
      />
      {/* <View style={{ flexDirection: 'row', justifyContent: 'center' }}> */}
      <Button  
      disabled={loading}
      loading={loading}
      mode="contained" textColor={'white'} onPress={handleLogin}>
        Entrar
      </Button>
      {/* <Button mode="contained" textColor={'white'}>
        criar conta
      </Button> */}

      {/* </View> */}
      </Card.Content>
      </Card>
    </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
      },
    container: {
        padding: 16,
        flex:1,
        justifyContent:'center'
    }
    

})

export default LoginScreen;