import React, { useState, useCallback, useEffect } from 'react';

import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  StyleSheet,
  Image,
  TouchableHighlight,
  Button,
  ScrollView,
  Platform,
  NativeModules, //Android import
} from 'react-native';
import BootstrapStyleSheet from 'react-native-bootstrap-styles';
import { RadioButton } from 'react-native-paper';

const bootstrapStyleSheet = new BootstrapStyleSheet();
const { s, c } = bootstrapStyleSheet;

export const RegisterScreen = () => {
  const [valueOne, setValueOne] = React.useState('first');
  const NeuroIDModule = NativeModules.NeuroidReactnativeSdk;

  const formSubmitNID = () => {
    // Various types of form submits.
    console.log('Form Submit!');
    NeuroIDModule.formSubmitSuccess();
    NeuroIDModule.formSubmitFailure();
    NeuroIDModule.formSubmit();
  };

  useEffect(() => {
    NeuroIDModule.setScreenName('RegisterScreen');
  }, []);

  return (
    <View style={styles.container}>
      <View style={[styles.view, s.mt3]}>
        <Image
          source={require('./assets/images/nid-logo.png')}
          style={[s.mt5, s.mb5]}
        />
      </View>
      <ScrollView>
        <View style={[s.mb3]} testID="innerMostView" />
        <Text style={[s.text, styles.text, s.mb5]}>
          Checking your loan options does not affect your credit score.
        </Text>
        <SafeAreaView>
          <View style={[s.mb3, styles.lowZ]}>
            <Text style={[s.text, styles.text, s.mb2]}>
              Age at work (years):
            </Text>
            <TextInput
              style={[s.formControl]}
              testID="ageAtWork"
              id="ageAtWork"
              keyboardType={'numeric'}
              maxLength={3}
            />
          </View>
          <View style={[s.mb3]}>
            <Text style={[s.text, styles.text, s.mb2]}>Own house?</Text>
            <RadioButton.Group
              onValueChange={(newValue) => setValueOne(newValue)}
              value={valueOne}
            >
              <View>
                <Text>Yes</Text>
                <RadioButton 
                  testID="radioButtonOwnYes"
                  id="radioButtonOwnYes"
                  value="first"
                  />
              </View>
              <View>
                <Text>No</Text>
                <RadioButton 
                  testID="radioButtonOwnNo"
                  id="radioButtonOwn"
                  value="second" />
              </View>
            </RadioButton.Group>
          </View>
          <View style={[s.mb3]}>
            <Text style={[s.text, styles.text, s.mb2]}>
              Number of economic dependents:
            </Text>
            <TextInput
              style={[s.formControl]}
              testID="economicDependents"
              id="economicDependents"
              keyboardType={'numeric'}
            />
          </View>
          <View style={[s.mb5, s.mt5]}>
            <TouchableHighlight style={[s.btnPrimary]}>
              <Button
                testID="buttonAgree"
                id="buttonAgree"
                color="#3579F7"
                title="Agree and Check Your Loan Options"
                onPress={() => formSubmitNID()}
              />
            </TouchableHighlight>
            <Text style={[s.text, styles.text, s.mb5]}>
              Checking your loan options does not affect your credit score.
            </Text>
          </View>
        </SafeAreaView>
      </ScrollView>
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
