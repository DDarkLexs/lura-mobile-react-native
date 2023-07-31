import {useEffect} from 'react';
import {useState} from 'react';
import {} from 'react-native';
import {
    Dialog,
    Paragraph,
    Portal,
    Text,
    Button,
    useTheme,
    TextInput,
    Menu,
    
} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {actions} from '../../store/reducers/setor';
import { Alert } from 'react-native';
import { SetorController } from '../../controller/setor';

export const AdicionarSetor = () => {
    const setor = new SetorController()
    const [nome,setNome ] = useState('')
    const [ loading, setLoading ] = useState(false)
    const showDialog = useSelector(state => state.setor.addSetorDialog)
    const dispatch = useDispatch()
    const theme = useTheme()

    const addSetor = async () => {
        try {
            setLoading(true)
            await setor.insertSetor(nome)
            alert(`Setor "${nome}" foi reistrado!`)
        } catch (error) {
            console.log(error)
        Alert.alert('Houve um erro', 
        JSON.stringify(error), [{text: 'OK'}], {
            cancelable: false,
        });
        } finally {
            setLoading(false)
        }
    }

    useEffect(()=>{
     
    },[])
    return (
    <Portal>
      <Dialog
        visible={showDialog}
        onDismiss={() => dispatch(actions.setAddSetorDialog(false))}>
        <Dialog.Title>Adicionar setor</Dialog.Title>
        <Dialog.Content>

        <TextInput
            label='Nome do setor'
            value={nome}
            onChangeText={setNome}
            mode='outlined'
            autoCapitalize='words'
            disabled={loading}
            right={
                <TextInput.Icon icon={'store'} name='store' />
            }
            style={{marginBottom: 16}}
        />


        </Dialog.Content>
        <Dialog.Actions>
          <Button
            loading={loading}
            disabled={loading}
            buttonColor={theme.colors.primary}
            textColor='white'
            onPress={()=> addSetor()}>
            adicionar
          </Button>
          <Button
            loading={loading}
            disabled={loading}
            buttonColor={theme.colors.primary}
            textColor='white'
            onPress={()=> dispatch(actions.setAddSetorDialog(false))}>
            fechar
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>

    )

}