import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { useDispatch,useSelector } from 'react-redux' 

export const ProfileScreen = () => {
  const account = useSelector(state => state.usuario.account)
  return (
    <View style={styles.container}>
      <Card>
        <Card.Content>
          <Avatar.Icon size={64} icon="account" />
          <Title>{ account.nome }</Title>
          {/* <Paragraph>{ JSON.stringify(account) }</Paragraph> */}
        </Card.Content>
        <Card.Actions>
          <Button mode="contained" textColor='white' onPress={() => console.log('Edit pressed')}>
            Editar Perfil
          </Button>
          {/* <Button mode="outlined" onPress={() => console.log('Logout pressed')}>
            Logout
          </Button> */}
        </Card.Actions>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    // justifyContent: 'center',
  },
});

export default ProfileScreen;