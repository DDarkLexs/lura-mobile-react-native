import * as React from 'react';
import {AppRegistry, useColorScheme} from 'react-native';
import {PaperProvider} from 'react-native-paper';
import {name as appName} from './app.json';
import App from './App';
import {Provider} from 'react-redux';
import {store} from './src/store/index';
import {dark, light} from './src/theme/index';
import {
  useAsyncStorage,
  AsyncStorageStatic,
} from '@react-native-async-storage/async-storage';

export default function Main() {
  const colorTheme = useColorScheme() === 'light' ? light : dark;

  return (
    <Provider store={store}>
      <PaperProvider theme={colorTheme}>
        <App />
      </PaperProvider>
    </Provider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
// AppRegistry.registerHeadlessTask('controlo-de-validade', ()=>{
//   require('./src/config/background')
// });
