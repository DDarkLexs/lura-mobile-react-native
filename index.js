import * as React from 'react';
import {AppRegistry, useColorScheme} from 'react-native';
import {MD3LightTheme, MD3DarkTheme, PaperProvider} from 'react-native-paper';
import {name as appName} from './app.json';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './src/store/index'
import { theme } from './src/theme/index';

// import {createStore} from 'redux';

// const reducer = (state = {count: 0}, action) => {
//   switch (action.type) {
//     case 'INCREMENT':
//       return {
//         count: state.count + 1,
//       };
//       break;
//     case 'DECREMENT':
//       return {
//         count: state.count - 1,
//       };

//     default:
//       return state;
//       break;
//   }
// };

// const store = createStore(reducer);

// store.dispatch({ type:"INCREMENT"})

export default function Main() {
  const colorTheme =
    useColorScheme() === 'dark'
      ? {
          ...MD3DarkTheme.colors,
          colors: {
            ...MD3DarkTheme.colors,
            primary: '#00695C',
            secondary: '#8c9eff',
          },
        }
      : {
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
