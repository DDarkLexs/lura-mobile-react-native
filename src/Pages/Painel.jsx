import React from 'react';
import { View, StyleSheet,ScrollView } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { useDispatch,useSelector } from 'react-redux' 

export const Painel = () => {
  const account = useSelector(state => state.usuario.account)
  const data = [
    { label: 'Total Artigo', value: 'Value 1', icon:'star' },
    { label: 'Total Válido', value: 'Value 2', icon:'star' },
    { label: 'Total Expirado', value: 'Value 3', icon:'star' },
    { label: 'Label 4', value: 'Value 4' },
    { label: 'Label 5', value: 'Value 5' },
    { label: 'Label 6', value: 'Value 6' },
    { label: 'Label 7', value: 'Value 7' },
    { label: 'Label 8', value: 'Value 8' },
    { label: 'Label 9', value: 'Value 9' },
    { label: 'Label 10', value: 'Value 10' },
  ];

  return (
    <ScrollView style={styles.container}>
      <Card>
        <Card.Content>
          <Avatar.Icon size={64} icon="account" />
          <Title>{ account.nome }</Title>
          {/* <Paragraph>{ JSON.stringify(account) }</Paragraph> */}
        </Card.Content>
        <Card.Actions>
        </Card.Actions>
      </Card>

      {data.map((item, index) => (
        <Card key={index} style={{ margin: 10,borderColor:'red' }}>
          <Card.Content>
          <Avatar.Icon  size={50}  icon="star" />
            <View style={{ alignContent:'flex-end', alignItems:'flex-end' }}>
            <Title>{item.label}</Title>
            <Paragraph>{item.value}</Paragraph>
            </View>
          </Card.Content>
        </Card>
      ))}

      <View style={ { marginBottom:100 } }>

      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    // justifyContent: 'center',
  },
});

