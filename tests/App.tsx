import React, { useEffect, useState } from "react";
import { StatusBar, useColorScheme, View, Text } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { runSmoke } from "./SmokeRunner";
import NeuroID from 'neuroid-reactnative-sdk';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppContent />
    </SafeAreaProvider>
  );
}

function AppContent() {
  const safeAreaInsets = useSafeAreaInsets();

  const [status, setStatus] = useState<"RUNNING" | "PASS" | "FAIL">("RUNNING");
  
    useEffect(() => {
      (async () => {
        try {
          await runSmoke();
          setStatus("PASS");
        } catch(error) {
          setStatus("FAIL");
          console.log("Smoke Test Failed", error);
        }
      })();
    }, []);
  
    const [version, setVersion] = React.useState('0.0.0');
  
    useEffect(() => {
      (async function () {
        const newVersion = await NeuroID.getSDKVersion();
        setVersion(newVersion);
      })();
    }, []);

  return (
    <View style={{ 
      flex: 1, 
      paddingTop: safeAreaInsets.top,
      paddingBottom: safeAreaInsets.bottom,
      paddingLeft: safeAreaInsets.left,
      paddingRight: safeAreaInsets.right,
    }}>
      <Text>Smoke: {status}</Text>
      <Text>Version: {version}</Text>
    </View>
  );
}

export default App;
