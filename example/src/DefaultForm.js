import React, { useState, useCallback } from 'react';
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
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import BootstrapStyleSheet from 'react-native-bootstrap-styles';
import { months, days, dobYears } from './utils/helpers';

import { configure, start } from 'neuroid-reactnative-sdk';

const bootstrapStyleSheet = new BootstrapStyleSheet();
const { s, c } = bootstrapStyleSheet;

export const DefaultForm = ({ navigation }) => {
  React.useEffect(() => {
    configure('key_test_vtotrandom_form_mobilesandbox'); //.then(setConf);
    start();
  }, []);
  //DOB Month dropdown
  const [monthValue, setMonthValue] = useState(null);
  const [monthItems, setMonthItems] = useState(months);

  //DOB day dropdown
  const [dayValue, setDayValue] = useState(null);
  const [dayItems, setDayItems] = useState(days);

  //DOB year dropdown
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
      <View style={[s.body, s.container, s.p3, styles.container]}>
        <View style={[styles.view, s.mt3]}>
          <Image
            source={require('./assets/images/nid-logo.png')}
            style={[s.mt5, s.mb5]}
          />
        </View>
        <ScrollView>
          <Text style={[styles.heading, styles.text, s.mb2]}>
            Welcome! You're one step away from checking your loan options.
          </Text>
          <Text style={[s.text, styles.text, s.mb5]}>
            Checking your loan options does not affect your credit score.
          </Text>
          <SafeAreaView>
            <View style={[s.mb3]}>
              <Text style={[s.text, styles.text, s.mb2]}>First Name:</Text>
              <TextInput
                style={[s.formControl]}
                autoCapitalize="none"
                autoCorrect={false}
                id="firstName"
              />
            </View>
            <View style={[s.mb3]}>
              <Text style={[s.text, styles.text, s.mb2]}>Last Name:</Text>
              <TextInput
                style={[s.formControl]}
                autoCapitalize="none"
                autoCorrect={false}
                id="lastName"
              />
            </View>
            <View style={[s.mb3]}>
              <Text style={[s.text, styles.text, s.mb2]}>Date of Birth:</Text>
              <View style={[s.mb3, { zIndex: 10 }]}>
                <Picker
                  style={[s.formControl]}
                  selectedValue={monthValue}
                  onValueChange={(itemValue) =>
                    setMonthValue(itemValue)
                  }
                  itemStyle={{
                    color: '#4f5e66',
                  }}
                >
                  {
                    monthItems.map((m) => {
                      return (
                        <Picker.Item label={m} value={m} />
                      )
                    })
                  }
                </Picker>
              </View>
              <View style={[s.mb3, { zIndex: 9 }]}>
                <Picker
                  style={[s.formControl]}
                  selectedValue={dayValue}
                  onValueChange={(itemValue) =>
                    setDayValue(itemValue)
                  }
                  itemStyle={{
                    color: '#4f5e66',
                  }}
                >
                  {
                    dayItems.map((d) => {
                      return (
                        <Picker.Item label={d} value={d} />
                      )
                    })
                  }
                </Picker>
              </View>
              <View style={[s.mb3, { zIndex: 8 }]}>
                <Picker
                  style={[s.formControl]}
                  selectedValue={dobYearValue}
                  onValueChange={(itemValue) =>
                    setdobYearValue(itemValue)
                  }
                  itemStyle={{
                    color: '#4f5e66',
                  }}
                >
                  {
                    dobYearItems.map((d) => {
                      return (
                        <Picker.Item label={d} value={d} />
                      )
                    })
                  }
                </Picker>
              </View>
            </View>
            <View style={[s.mb3, styles.lowZ]}>
              <Text style={[s.text, styles.text, s.mb2]}>Email:</Text>
              <TextInput
                style={[s.formControl]}
                autoCapitalize="none"
                autoCorrect={false}
                id="email"
              />
            </View>
            <View style={[s.mb3, styles.lowZ]}>
              <Text style={[s.text, styles.text, s.mb2]}>Home City:</Text>
              <TextInput
                style={[s.formControl]}
                autoCapitalize="none"
                autoCorrect={false}
                id="homeCity"
              />
            </View>
            <View style={[s.mb3, styles.lowZ]}>
              <Text style={[s.text, styles.text, s.mb2]}>Home Zip Code:</Text>
              <TextInput
                style={[s.formControl]}
                autoCapitalize="none"
                autoCorrect={false}
                id="homeZipCode"
              />
            </View>
            <View style={[s.mb3, styles.lowZ]}>
              <Text style={[s.text, styles.text, s.mb2]}>Phone Number:</Text>
              <TextInput
                style={[s.formControl]}
                autoCapitalize="none"
                autoCorrect={false}
                id="phoneNumber"
              />
            </View>
            <View style={[s.mb3]}>
              <Text style={[s.text, styles.text, s.mb2]}>Employer:</Text>
              <TextInput
                style={[s.formControl]}
                autoCapitalize="none"
                autoCorrect={false}
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
                id="employerPhoneNumber"
              />
            </View>
            <View style={[s.mb5, s.mt5]}>
              <TouchableHighlight style={[s.btnPrimary]}>
                <Button
                  color="white"
                  title="Agree and Check Your Loan Options"
                />
              </TouchableHighlight>
              <Text style={[s.text, styles.text, s.mb5]}>
                Checking your loan options does not affect your credit score.
              </Text>
            </View>
            <View style={[s.mb3]}>
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                id="employerPhoneNumber"
              />
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
