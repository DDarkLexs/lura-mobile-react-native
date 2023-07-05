import React from 'react';
import {StyleSheet} from 'react-native';
import {
  Dialog,
  Paragraph,
  Portal,
  Text,
  Button,
  useTheme,
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
export const EditPerfilDialog = (/* { artigo , artigo } */) => {
  const showDialog = useSelector(state => state.usuario.editDialog);
  const dispatch = useDispatch();
  const theme = useTheme()
  
//   const artigo = useSelector(state => state.artigo.infoArtigoValidade);

  return (
    <Portal>
      <Dialog
        visible={showDialog}
        // onDismiss={() => console.log('Dialog dismissed.')}
        >
            <Dialog.Title>{"Editar a conta"}</Dialog.Title>
        <Dialog.Content>
 {/*        
          <Paragraph>
            <Text style={styles.label}>fabricado: </Text>
            <Text style={styles.value}>{formatarDataLongo(artigo.inicio)}</Text>
          </Paragraph>
          <Paragraph>
            <Text style={styles.label}>expiração: </Text>
            <Text style={styles.value}>
              {' '}
              {formatarDataLongo(artigo.expira)}{' '}
            </Text>
          </Paragraph>
          <Paragraph>
            <Text style={styles.label}>Situação: </Text>
            <Text style={styles.value}>
              {!DataExpirou(artigo.expira)
                ? 'expirará ' + contando(artigo.expira)
                : 'expirou ' + contando(artigo.expira)}
            </Text>
          </Paragraph>
          <Paragraph>
            <Text style={styles.label}>Estado: </Text>
            <Text style={styles.value}>
              {!DataExpirou(artigo.expira) ? 'Válido' : 'Expirou'}
            </Text>
          </Paragraph>
        */}
        </Dialog.Content> 
        <Dialog.Actions>
          <Button
            textColor="white"
            buttonColor={theme.colors.primary}
            onPress={() => dispatch(action.setEditDialog(!showDialog))}>
            salvar
          </Button>

          <Button
            textColor="white"
            buttonColor={theme.colors.primary}
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
