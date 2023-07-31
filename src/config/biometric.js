import ReactNativeBiometrics, {Biometrics} from 'react-native-biometrics';
import { LocalAccount } from '../controller/storage';
import {actions} from '../store/reducers/usuario';
import {useSelector, useDispatch} from 'react-redux';

const localStorage = new LocalAccount()

export const generateBioauth = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const touchID = await localStorage.getFingerPrint()
        
      
      const Bm = new ReactNativeBiometrics({allowDeviceCredentials: true});
      const res = await Bm.isSensorAvailable();

      if (res.available && res.biometryType == 'Biometrics') {
          let response = await Bm.simplePrompt({
              promptMessage: 'Entrar com Touch ID',
              cancelButtonText: 'fechar',
          });
          response.touchID = Number(touchID)
          resolve(response)
          
      }
    } catch (error) {
      reject(error);
    }
  });
};
