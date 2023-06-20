import React, {useEffect} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {Avatar, Button, Card, Title, Paragraph} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import { getResults } from '../../controller/painel';
import swal from 'react-native-sweet-alert';
export const Painel = () => {
  const account = useSelector(state => state.usuario.account);

  const get = async () => {
    try {
      const response = await getResults(account.id_usuario);
      console.log(response);
    } catch (error) {
      swal.showAlertWithOptions({
        title: 'Houve um erro',
        subTitle: `${error}!`,
        confirmButtonTitle: 'OK',
        confirmButtonColor: '#000',
        otherButtonTitle: 'Cancel',
        otherButtonColor: '#dedede',
        style: 'error',
        cancellable: true,
        // onConfirm: () => console.log('Confirmed'),
        // onCancel: () => console.log('Cancelled'),
      });
    }
  };
  const data = [
    {label: 'Total Artigo', value: 'Value 1', icon: 'star'},
    {label: 'Total Válido', value: 'Value 2', icon: 'star'},
    {label: 'Total Expirado', value: 'Value 3', icon: 'star'},
    {label: 'Label 4', value: 'Value 4'},
    {label: 'Label 5', value: 'Value 5'},
    {label: 'Label 6', value: 'Value 6'},
    {label: 'Label 7', value: 'Value 7'},
    {label: 'Label 8', value: 'Value 8'},
    {label: 'Label 9', value: 'Value 9'},
    {label: 'Label 10', value: 'Value 10'},
  ];

  useEffect(() => {
    get();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Card>
        <Card.Content>
          <Avatar.Icon size={64} icon="account" />
          <Title>{account.nome}</Title>
          {/* <Paragraph>{ JSON.stringify(account) }</Paragraph> */}
        </Card.Content>
        <Card.Actions></Card.Actions>
      </Card>

      {data.map((item, index) => (
        <Card key={index} style={{margin: 10, borderColor: 'red'}}>
          <Card.Content>
            <Avatar.Icon size={50} icon="star" />
            <View style={{alignContent: 'flex-end', alignItems: 'flex-end'}}>
              <Title>{item.label}</Title>
              <Paragraph>{item.value}</Paragraph>
            </View>
          </Card.Content>
        </Card>
      ))}

      <View style={{marginBottom: 100}}></View>
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
