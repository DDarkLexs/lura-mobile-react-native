import React, { useState } from 'react';
import { View,StyleSheet,ImageBackground } from 'react-native';
import { TextInput,  Button, Card,Avatar,Text  } from 'react-native-paper';
// import { generateAccessToken } from '../../config/jwt'
import { useEffect } from 'react';
const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

    useEffect(()=> {

      generateAccessToken({ nome:'antonio lugogo' })
    },[])

  const handleLogin = () => {
    // Aqui você pode implementar a lógica de autenticação
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <ImageBackground
    source={require('../../assets/images/background-login.jpg')}
    style={styles.backgroundImage}>
    <View style={styles.container}>
    <Card>
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
        value={email}
        onChangeText={setEmail}
        mode="outlined"
        keyboardType="default"
        autoCapitalize="none"
        right={ <TextInput.Icon  icon={'account'} name="account" />}
        style={{ marginBottom: 16 }}
        />
      <TextInput
        label="Palavra-passe"
        value={password}
        onChangeText={setPassword}
        mode="outlined"
        secureTextEntry
        right={ <TextInput.Icon icon={'lock'} name="lock" />}
        style={{ marginBottom: 16 }}
      />
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
      <Button style={{ marginRight:'auto' }} mode="contained" textColor={'white'} onPress={handleLogin}>
        Entrar
      </Button>
      <Button mode="contained" textColor={'white'}>
        criar conta
      </Button>

      </View>
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