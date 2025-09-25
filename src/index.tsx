import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import {persistor, store} from '@store';
import {PersistGate} from 'redux-persist/integration/react';

import {PaperProvider} from 'react-native-paper';
import {StackNavigator} from '@navigator';
import {setI18nConfig} from '@languages';
import {SafeAreaView} from 'react-native-safe-area-context';

const App = () => {
  useEffect(() => {
    setI18nConfig();
  }, []);
  return (
    <SafeAreaView style={{flex: 1}}>
      <PaperProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <StackNavigator />
          </PersistGate>
        </Provider>
      </PaperProvider>
    </SafeAreaView>
  );
};

export default App;
