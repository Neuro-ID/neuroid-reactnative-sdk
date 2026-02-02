import React, { useEffect, useState } from "react";
import { StatusBar, useColorScheme, View, Text } from 'react-native';
import { runSmoke } from "./SmokeRunner";
import NeuroID from 'neuroid-reactnative-sdk';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppContent />
    </>
  );
}

function AppContent() {
  // const safeAreaInsets = useSafeAreaInsets();

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
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft: 10,
      paddingRight: 10,
    }}>
      <Text>Smoke: {status}</Text>
      <Text>Version: {version}</Text>
    </View>
  );
}

export default App;
