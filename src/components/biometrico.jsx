import React, { useEffect } from 'react';
import { View, Button } from 'react-native';
import ReactNativeBiometrics, { Biometrics } from 'react-native-biometrics';

export const BiometricsScreen = () => {
  useEffect(() => {

    const ShowBiometric = async () => {
        try {
            
            const Biometrics = new ReactNativeBiometrics({allowDeviceCredentials:true})
            
          let response = await Biometrics.simplePrompt({
              promptMessage: 'Entrar com Touch ID',
              cancelButtonText: 'fechar',
            });
      
                console.log(response)
       

    } catch (error) {
        console.error(error)    
    }
    }

    ShowBiometric()
  }, []);
  

  return (
    <View>
      <Button title="Authenticate" />
    </View>
  );
};
