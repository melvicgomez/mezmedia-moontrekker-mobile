import React from 'react';
import { WebView } from 'react-native-webview';

function IndexOpenStreetMapViewerContainer({ route }) {
  const { iframeSrc } = route.params;
  return (
    <WebView
      source={{
        uri: iframeSrc,
      }}
      style={{ height: 300 }}
      containerStyle={{ height: 300 }}
      onError={(syntheticEvent) => {
        const { nativeEvent } = syntheticEvent;
        console.warn('WebView error: ', nativeEvent);
      }}
      renderError={(errorName) => {
        console.warn('WebView error: ', errorName);
      }}
      onHttpError={(syntheticEvent) => {
        const { nativeEvent } = syntheticEvent;
        console.warn(
          'WebView received error status code: ',
          nativeEvent.statusCode,
        );
      }}
    />
  );
}

export default IndexOpenStreetMapViewerContainer;
