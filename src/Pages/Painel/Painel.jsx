import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ScrollView, Alert} from 'react-native';
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  useTheme,
} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {getResults} from '../../controller/painel';
import {actions} from '../../store/reducers/usuario';
export const Painel = () => {
  const theme = useTheme();
  const [data, setData] = useState([
    {label: 'Total Artigo', value: 0, icon: 'format-list-numbered'},
    {label: 'Validade Total', value: 0, icon: 'calendar-sync'},
    {label: 'Total Expirado', value: 0, icon: 'calendar-alert'},
    {label: 'Total Válido', value: 0, icon: 'calendar-check'},
  ]);
  const account = useSelector(state => state.usuario.account);
  const showDialog = useSelector(state => state.usuario.editDialog);
  const dispatch = useDispatch();

  const get = async () => {
    try {
      const {artigoTotal, validadesTotal, totalExpirado, totalValido} =
        await getResults(account.id_usuario);
      setData([
        {
          label: 'Total Artigo',
          value: artigoTotal,
          icon: 'format-list-numbered',
        },
        {label: 'Validade Total', value: validadesTotal, icon: 'calendar-sync'},
        {label: 'Total Expirado', value: totalExpirado, icon: 'calendar-alert'},
        {label: 'Total Válido', value: totalValido, icon: 'calendar-check'},
      ]);
      // data.map((card,i)=> {
      //   card.value = items[i]
      //   return card
      // })
    } catch (error) {
      Alert.alert('Houve um erro', error, [{text: 'OK'}], {cancelable: false});
    }
  };

  const edit = () => {
    try {
      dispatch(actions.setEditDialog(!showDialog))

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // console.log("mounted")
    get();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Card>
        <Card.Content>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Avatar.Icon size={65} icon="account" />
          </View>
          <Title>{account.nome}</Title>
          {/* <Paragraph>{ JSON.stringify(showDialog) }</Paragraph> */}
        </Card.Content>
        <Card.Actions></Card.Actions>
      </Card>

      <Card style={styles.cardStyle}>
        <Card.Content>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Avatar.Icon size={40}  style={styles.buttonP} icon="pencil" onTouchStart={()=>{ edit() }} />

            <Avatar.Icon
              size={40}
              style={styles.buttonP}
              icon="sync"
              onTouchStart={() => {
                get();
              }}
            />
          </View>
        </Card.Content>

        <Card.Actions></Card.Actions>
      </Card>

      {data.map((item, index) => (
        <Card key={index} style={{margin: 10}}>
          <Card.Content>
            <Avatar.Icon size={50} icon={item.icon} />
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
  buttonP: {
    margin: 5,
  },
  cardStyle: {
    margin: 10,
  },
  container: {
    flex: 1,
    padding: 16,
    // justifyContent: 'center',
  },
});
