import * as React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

import { configure } from 'neuroid-reactnative-sdk';

export const RegisterScreen = ({ navigation }) => {
  const [conf, setConf] = React.useState();

  // const [conf, setConf] = React.useState<String | undefined>();

  React.useEffect(() => {
    configure('key_test_vtotrandom_form_mobilesandbox').then(setConf);
    // configure('123').then(setConf);
  }, []);

  return (
    <View style={styles.container}>
      <Text>A testing examples!</Text>
      <Text>API Key Set: {conf?.toString()}</Text>
      {/* <Text>API Key: {conf}</Text> */}
      <Button
        title="Contact Screen"
        onPress={() => navigation.navigate('Contact')}
      />
    </View>
  );
};

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
