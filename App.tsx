import React, { useEffect, useState } from "react";
import { SafeAreaView, Text } from "react-native";
import { runSmoke } from "./SmokeRunner";
import NeuroID from 'neuroid-reactnative-sdk';

export default function App() {
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
    <SafeAreaView>
      <Text>Smoke: {status}</Text>
      <Text>Version: {version}</Text>
    </SafeAreaView>
  );
}