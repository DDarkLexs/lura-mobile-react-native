import * as React from 'react';
import {AppRegistry, useColorScheme} from 'react-native';
import {MD3LightTheme, MD3DarkTheme, PaperProvider} from 'react-native-paper';
import {name as appName} from './app.json';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './src/store/index'
import { theme } from './src/theme/index';
import { knex } from './src/utils/database'
export default function Main() {
  const colorTheme = useColorScheme() === 'dark'
      ? {
          ...MD3DarkTheme.colors,
          colors: {
            ...MD3DarkTheme.colors,
            primary: '#00695C',
            secondary: '#8c9eff',
          },
        }
      :
      
      {
          ...MD3LightTheme.colors,
          colors: {
            ...MD3LightTheme.colors,
            primary: '#00695C',
            secondary: '#8c9eff',
          },
        };

  return (
    <Provider store={store}>
      <PaperProvider theme={colorTheme}>
        <App />
      </PaperProvider>
    </Provider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
