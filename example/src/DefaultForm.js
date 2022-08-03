import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  TouchableHighlight,
  Button,
  ScrollView,
  Platform,
} from 'react-native';

import DropDownPicker from 'react-native-dropdown-picker';
import BootstrapStyleSheet from 'react-native-bootstrap-styles';
import uuid from 'react-native-uuid';
import { months, days, dobYears } from './utils/helpers';
import {
  configure,
  setEnvironmentProduction,
  getSessionID,
  configureWithOptions,
  setSiteId,
  setScreenName,
  setUserID,
  excludeViewByTestID,
  start,
} from 'neuroid-reactnative-sdk';

const bootstrapStyleSheet = new BootstrapStyleSheet();
const { s, c } = bootstrapStyleSheet;

export const DefaultForm = ({ navigation }) => {
  const [sid, setSID] = useState();
  const [text, onChangeText] = React.useState();
  const getSIDInterval = async () => {
    getSessionID().then(setSID);
  };

  useEffect(() => {
    const timer = setInterval(getSIDInterval, 2000);
    if (Platform.OS === 'ios') {
      // iOS API key
      configure('key_live_suj4CX90v0un2k1ufGrbItT5');
    } else {
      // Android API key
      // NeuroIDModule.configure('key_live_suj4CX90v0un2k1ufGrbItT5');
      configureWithOptions(
        'key_live_suj4CX90v0un2k1ufGrbItT5',
        'http://localhost:8080'
      );
    }
    let begin = async () => {
      let startValue = await start();
      console.log('Started:', startValue);
    };
    begin();
    setEnvironmentProduction(true);
    setSiteId('form_dream102');
    setScreenName('DefaultForm');
    excludeViewByTestID('sid');
    setUserID(`${uuid.v4()}`);
    return () => clearInterval(timer);
  }, []);

  //DOB Month dropdown
  const [monthOpen, setMonthOpen] = useState(false);
  const [monthValue, setMonthValue] = useState(null);
  const [monthItems, setMonthItems] = useState(months);

  //DOB day dropdown
  const [dayOpen, setDayOpen] = useState(false);
  const [dayValue, setDayValue] = useState(null);
  const [dayItems, setDayItems] = useState(days);

  //DOB year dropdown
  const [dobYearOpen, setdobYearOpen] = useState(false);
  const [dobYearValue, setdobYearValue] = useState(null);
  const [dobYearItems, setdobYearItems] = useState(dobYears);

  // Close day and year dropdowns on Month dropdown open
  const onMonthOpen = useCallback(() => {
    setDayOpen(false);
    setdobYearOpen(false);
  }, []);

  // Close month and year dropdowns on day dropdown open
  const onDayOpen = useCallback(() => {
    setMonthOpen(false);
    setdobYearOpen(false);
  }, []);

  // Close day and month dropdowns on year dropdown open
  const onDobYearOpen = useCallback(() => {
    setMonthOpen(false);
    setDayOpen(false);
  }, []);

  // CLose all dropdowns when clicked outside
  const closeDropdowns = () => {
    setMonthOpen(false);
    setDayOpen(false);
    setdobYearOpen(false);
  };

  return (
    <TouchableWithoutFeedback onPress={closeDropdowns}>
      <View
        style={[s.body, s.container, s.p3, styles.container]}
        testID="defaultFormInnerView"
      >
        <View style={[styles.view, s.mt3]}>
          <Image
            source={require('./assets/images/nid-logo.png')}
            style={[s.mt5, s.mb5]}
          />
        </View>
        <ScrollView>
          <Text style={[s.text, styles.text, s.mb2]}>SID:</Text>
          <TextInput
            style={[s.formControl]}
            autoCapitalize="none"
            autoCorrect={false}
            id="sid"
            value={sid}
            testID="sid"
          />
          <View style={[s.mb3]} testID="innerMostView" />
          <Text style={[styles.heading, styles.text, s.mb2]}>
            Welcome! You're one step away from checking your loan options. $
          </Text>
          <Text style={[s.text, styles.text, s.mb5]}>
            Checking your loan options does not affect your credit score.
          </Text>
          <SafeAreaView>
            <View style={[s.mb3]} testID="innerMostView">
              <Text style={[s.text, styles.text, s.mb2]}>First Name:</Text>
              <TextInput
                style={[s.formControl]}
                autoCapitalize="none"
                autoCorrect={false}
                id="firstName"
                testID="firstName"
                onChangeText={onChangeText}
              >
                <Text>{text}</Text>
              </TextInput>
            </View>
            <View style={[s.mb3]}>
              <Text style={[s.text, styles.text, s.mb2]}>Last Name:</Text>
              <TextInput
                style={[s.formControl]}
                autoCapitalize="none"
                autoCorrect={false}
                id="lastName"
                testID="lastName"
              />
            </View>
            <View style={[s.mb3]}>
              <Text style={[s.text, styles.text, s.mb2]}>Date of Birth:</Text>
              <View style={[s.mb3, { zIndex: 10 }]}>
                <DropDownPicker
                  style={[s.formControl]}
                  open={monthOpen}
                  value={monthValue}
                  items={monthItems}
                  setOpen={setMonthOpen}
                  setValue={setMonthValue}
                  setItems={setMonthItems}
                  onOpen={onMonthOpen}
                  testID="dobMonth"
                  textStyle={{
                    color: '#4f5e66',
                  }}
                  zIndex={3000}
                  zIndexInverse={1000}
                />
              </View>
              <View style={[s.mb3, { zIndex: 9 }]}>
                <DropDownPicker
                  style={[s.formControl]}
                  open={dayOpen}
                  value={dayValue}
                  items={dayItems}
                  setOpen={setDayOpen}
                  setValue={setDayValue}
                  setItems={setDayItems}
                  onOpen={onDayOpen}
                  testID="dobDay"
                  textStyle={{
                    color: '#4f5e66',
                  }}
                  zIndex={2000}
                  zIndexInverse={2000}
                />
              </View>
              <View style={[s.mb3, { zIndex: 8 }]}>
                <DropDownPicker
                  style={[s.formControl]}
                  open={dobYearOpen}
                  value={dobYearValue}
                  items={dobYearItems}
                  setOpen={setdobYearOpen}
                  setValue={setdobYearValue}
                  setItems={setdobYearItems}
                  onOpen={onDobYearOpen}
                  testID="dobYear"
                  textStyle={{
                    color: '#4f5e66',
                  }}
                  zIndex={1000}
                  zIndexInverse={3000}
                />
              </View>
            </View>
            <View style={[s.mb3, styles.lowZ]}>
              <Text style={[s.text, styles.text, s.mb2]}>Email:</Text>
              <TextInput
                style={[s.formControl]}
                autoCapitalize="none"
                autoCorrect={false}
                testID="email"
                id="email"
              />
            </View>
            <View style={[s.mb3, styles.lowZ]}>
              <Text style={[s.text, styles.text, s.mb2]}>Home City:</Text>
              <TextInput
                style={[s.formControl]}
                autoCapitalize="none"
                autoCorrect={false}
                testID="homeCity"
                id="homeCity"
              />
            </View>
            <View style={[s.mb3, styles.lowZ]}>
              <Text style={[s.text, styles.text, s.mb2]}>Home Zip Code:</Text>
              <TextInput
                style={[s.formControl]}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType={'numeric'}
                maxLength={6}
                testID="homeZipCode"
                id="homeZipCode"
              />
            </View>
            <View style={[s.mb3, styles.lowZ]}>
              <Text style={[s.text, styles.text, s.mb2]}>Phone Number:</Text>
              <TextInput
                style={[s.formControl]}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType={'numeric'}
                maxLength={12}
                testID="phoneNumber"
                id="phoneNumber"
              />
            </View>
            <View style={[s.mb3]}>
              <Text style={[s.text, styles.text, s.mb2]}>Employer:</Text>
              <TextInput
                style={[s.formControl]}
                autoCapitalize="none"
                autoCorrect={false}
                testID="employer"
                id="employer"
              />
            </View>
            <View style={[s.mb3]}>
              <Text style={[s.text, styles.text, s.mb2]}>
                Employer Address:
              </Text>
              <TextInput
                style={[s.formControl]}
                autoCapitalize="none"
                autoCorrect={false}
                testID="employerAddress"
                id="employerAddress"
              />
            </View>
            <View style={[s.mb3]}>
              <Text style={[s.text, styles.text, s.mb2]}>
                Employer Phone Number:
              </Text>
              <TextInput
                style={[s.formControl]}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType={'numeric'}
                maxLength={12}
                testID="employerPhoneNumber"
                id="employerPhoneNumber"
              />
            </View>
            <View style={[s.mb5, s.mt5]}>
              <TouchableHighlight style={[s.btnPrimary]}>
                <Button
                  testID="buttonContinue"
                  id="buttonContinue"
                  color="#3579F7"
                  style={{ textColor: 'black' }}
                  title="Continue"
                  onPress={() => navigation.navigate('Register')}
                />
              </TouchableHighlight>
              <Text style={[s.text, styles.text, s.mb5]}>
                Checking your loan options does not affect your credit score.
              </Text>
            </View>
          </SafeAreaView>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  view: {
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
  },
  text: {
    color: '#4f5e66',
  },
  lowZ: {
    zIndex: -1,
  },
});
