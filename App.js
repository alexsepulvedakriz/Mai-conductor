import React, { Component } from 'react';
import { Provider } from 'react-redux';
import './source/firebase/firebase';
import AppContainer from './source/navigation/AppNavigator';
import { AppLoading } from 'expo';
import {Asset} from 'expo-asset';
import * as Font from 'expo-font';
import configuracion from './source/reduxStore';
import { PersistGate } from 'redux-persist/integration/react';



class App extends Component {
  state = {
    assetsLoaded: false,
  };
  constructor(){
    super();
    console.disableYellowBox = true;
  }
  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        // require('./assets/images/background.png'),
        require('./assets/images/logo.png'),
      ]),
      Font.loadAsync({
        'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
        'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
        'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
        'Roboto-Light': require('./assets/fonts/Roboto-Light.ttf'),

      }),
    ]);
  };

  render() {
    const {store, persistor} = configuracion;
    return (
        this.state.assetsLoaded ?
            <Provider  store={store}>
              <PersistGate loading={null} persistor={persistor}>
                <AppContainer/>
              </PersistGate>
            </Provider>
            : // solo es utilo para cargar los elementos asyncronos no tiene nada que vr con el loading
            <AppLoading
                startAsync={this._loadResourcesAsync}
                onFinish={() => {this.setState({ assetsLoaded: true });}}
                onError={console.warn}
                autoHideSplash={true}
            />
    );
  }
}

export default App;
