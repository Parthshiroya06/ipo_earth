import {View, Text} from 'react-native';
import React from 'react';
import WebView from 'react-native-webview';
import {useRoute} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
type Props = {};

const WebViewScreen = (props: Props) => {
  const route = useRoute();
  const insets = useSafeAreaInsets();

  return (
    <View style={{flex: 1}}>
      <WebView
        onLoad={() => {}}
        source={{uri: route.params.url}}
        onNavigationStateChange={event => {}}
      />
    </View>
  );
};

export {WebViewScreen};
