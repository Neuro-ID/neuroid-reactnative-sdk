import React, { useEffect, useState } from "react";
import { View, Text } from 'react-native';
import { runSmoke } from "./SmokeRunner";
import NeuroID from 'neuroid-reactnative-sdk';

function App() {

  return (
      <AppContent />
  );
}

function AppContent() {

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
      paddingBottom:10,
      paddingLeft:10,
      paddingRight: 10,
    }}>
      <Text>Smoke: {status}</Text>
      <Text>Version: {version}</Text>
    </View>
  );
}

export default App;
