import ReactNativeBiometrics, {Biometrics} from 'react-native-biometrics';
import {loginUserAuto} from '../controller/usuario';
import {actions} from '../store/reducers/usuario';
import swal from 'react-native-sweet-alert';
import {useSelector, useDispatch} from 'react-redux';

export const generateBioauth = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const Bm = new ReactNativeBiometrics({allowDeviceCredentials: true});
      const res = await Bm.isSensorAvailable();

      if (res.available && res.biometryType == 'Biometrics') {
        let response = await Bm.simplePrompt({
          promptMessage: 'Entrar com Touch ID',
          cancelButtonText: 'fechar',
        });
        // console.log(response);

        resolve(response);
      }
    } catch (error) {
      reject(error);
    }
  });
};
