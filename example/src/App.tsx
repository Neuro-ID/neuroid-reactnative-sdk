import * as React from 'react';

import { StyleSheet, View, Text } from 'react-native';
import { multiply, configure } from 'neuroid-reactnative-sdk';
// import { NativeModules } from 'react-native';
// const { configure } = NativeModules;

export default function App() {
  const [result, setResult] = React.useState<number | undefined>();
  const [conf, setConf] = React.useState<number | undefined>();

  // const [conf, setConf] = React.useState<String | undefined>();

  React.useEffect(() => {
    multiply(3, 7).then(setResult);
    configure('key_test_vtotrandom_form_mobilesandbox').then(setConf);
    // configure('123').then(setConf);
  }, []);

  return (
    <View style={styles.container}>
      <Text>A testing examples!</Text>
      <Text>Result: {result}</Text>
      <Text>API Key Set: {conf?.toString()}</Text>
      {/* <Text>API Key: {conf}</Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
