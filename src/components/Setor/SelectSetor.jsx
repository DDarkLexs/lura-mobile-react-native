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
import {SetorController} from '../../controller/setor';
import {Alert} from 'react-native';

export const SelectSetor = () => {
    const theme = useTheme();
    const setorCrl = new SetorController();
    const showDialog = useSelector((state) => state.setor.SelectSetorDialog);
    const setor = useSelector((state) => state.setor.setor);
    const setorArray = useSelector((state) => state.setor.setorArray);
    const dispatch = useDispatch();
    const [label, setLabel] = useState(null);
    const [selectedItem, setSelectedItem] = useState('');
    const [visible, setVisible] = useState(false);
    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);
    const handleItemSelect = (item) => {
        setSelectedItem(item);
        dispatch(actions.setSetor(item));
        closeMenu();
    };
    useEffect(() => {
        const s = setorArray.find((setor) => setor.id_seccao === selectedItem);
        if (s) {
            setLabel(s.nome);
        }
    }, [selectedItem]);

    useEffect(() => {
        const proceed = async () => {
            try {
                const query = await setorCrl.getallSetorByIdUsuario();
                dispatch(actions.setSetorArray(query));
            } catch (error) {
                Alert.alert(
                    'Houve um erro',
                    JSON.stringify(error),
                    [{text: 'OK'}],
                    {
                        cancelable: false,
                    },
                );
            }
        };
        proceed();
    }, [showDialog]);
    return (
        <Portal>
            <Dialog
                visible={showDialog}
                onDismiss={() => dispatch(actions.setSelectSetorDialog(false))}
            >
                <Dialog.Title>Selecione o setor</Dialog.Title>
                <Dialog.Content>
                    <Menu
                        visible={visible}
                        onDismiss={closeMenu}
                        anchor={
                            <TextInput
                                mode='outlined'
                                showSoftInputOnFocus={false}
                                value={label || 'Selecione um setor'}
                                right={
                                    <TextInput.Icon icon={'pencil'} name='pencil' />
                                }
                                onPressIn={openMenu}
                            ></TextInput>
                        }
                    >
                        {setorArray.map((item, i) => {
                            return (
                                <Menu.Item
                                    key={i}
                                    onPress={() => {
                                        handleItemSelect(item.id_seccao);
                                    }}
                                    title={item.nome}
                                />
                            );
                        })}
                    </Menu>
                    <Text></Text>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button
                        buttonColor={theme.colors.primary}
                        textColor='white'
                        onPress={() =>
                            dispatch(actions.setSelectSetorDialog(false))
                        }
                    >
                        fechar
                    </Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );
};
