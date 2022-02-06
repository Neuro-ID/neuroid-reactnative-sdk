import * as React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RegisterScreen } from './RegisterScreen';
import { ContactScreen } from './ContactScreen';
import { DefaultForm } from './DefaultForm';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Neuro ID"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen
          name="Neuro ID"
          component={DefaultForm}
          testID="defaultFormOuterView"
        />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Contact" component={ContactScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
