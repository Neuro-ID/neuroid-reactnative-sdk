import * as React from 'react';

import { StyleSheet, Button, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RegisterScreen } from './RegisterScreen';
import { ContactScreen } from './ContactScreen';

// import { NativeModules } from 'react-native';
// const { configure } = NativeModules;

// const [conf, setConf] = React.useState<String | undefined>();

const Stack = createNativeStackNavigator();

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen
//           name="Register"
//           component={HomeScreen}
//           options={{ title: 'Register' }}
//         />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ title: 'Register' }}
        />
        <Stack.Screen name="Contact" component={ContactScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
