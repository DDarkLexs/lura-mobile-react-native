import React from 'react';
import { StyleSheet } from 'react-native';
import { Dialog, Paragraph, Portal,Text,Button, useTheme } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux'
import { actions as action } from '../../store/reducers/artigo';
import {
    formatarData,
    dataFormatada,
    formatarDataSimples,
    DataExpirou,
    formatarDataLongo,
    contando
  } from '../../utils/formata-data';
const MyDialog = ({ item , artigo }) => {
  const showDialog = useSelector(state => state.artigo.qualidadeDialog);
  const dispatch = useDispatch();

  return (
    <Portal>
      <Dialog visible={showDialog} onDismiss={() => console.log('Dialog dismissed.')}>
        <Dialog.Title>{ artigo.nome }</Dialog.Title>
        <Dialog.Content>
          <Paragraph>
            <Text style={styles.label}>fabricado: </Text> 
            <Text style={styles.value}>{  formatarDataLongo(item.inicio)  }</Text>
          </Paragraph>
          <Paragraph>
            <Text style={styles.label}>expiração: </Text> 
            <Text style={styles.value}> { formatarDataLongo(item.expira) } </Text>
          </Paragraph>
          <Paragraph>
            <Text style={styles.label}>Situação: </Text> 
            <Text style={styles.value}>
                
            {!DataExpirou(item.expira) ? 
                  
                "expirará " + contando(item.expira) 
                  :
                "expirou " + contando(item.expira)
                
                }
                </Text>
          </Paragraph>
          <Paragraph>
            <Text style={styles.label}>Estado: </Text> 
            <Text style={styles.value}>
            {!DataExpirou(item.expira) ? 
                  "Válido" 
                    :
                  "Expirou"
                  }
            </Text>
          </Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          <Button 
          textColor='white'
          buttonColor={useTheme().colors.primary}
          onPress={() => dispatch(action.setqualidadeDialog(!showDialog))}>
            fechar
            </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
    
    item:{
        flex:1,
    },
  label: {
    fontWeight: 'bold',
    alignContent:'flex-start',
    marginRight: 20,
  },
  value: {
  },
});

export default MyDialog;