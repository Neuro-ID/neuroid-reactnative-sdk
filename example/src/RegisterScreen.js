import React from 'react';
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
import {RadioButton} from 'react-native-paper';

const bootstrapStyleSheet = new BootstrapStyleSheet();
const { s, c } = bootstrapStyleSheet;

export const RegisterScreen = () => {
    const [valueOne, setValueOne] = React.useState('first');
    const {NeuroIDModule} = NativeModules; //Android

    const formSubmitNID = () => {
        if (Platform.OS === 'android') {
            NeuroIDModule.formSubmit();
        }
    };


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
                    <Text style={[s.text, styles.text, s.mb2]}>Age at work (years):</Text>
                    <TextInput
                        style={[s.formControl]}
                        testID="ageAtWork"
                        id="ageAtWork"
                        keyboardType={"numeric"}
                    />
                </View>
                <View style={[s.mb3]}>
                    <Text style={[s.text, styles.text, s.mb2]}>Own house?</Text>
                    <RadioButton.Group onValueChange={newValue => setValueOne(newValue)} value={valueOne}>
                        <View>
                            <Text>
                                Yes
                            </Text>
                            <RadioButton value="first" />
                        </View>
                        <View>
                            <Text>
                                No
                            </Text>
                            <RadioButton value="second" />
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
                        keyboardType={"numeric"}
                    />
                </View>
                <View style={[s.mb5, s.mt5]}>
                    <TouchableHighlight style={[s.btnPrimary]}>
                        <Button
                            color="#3579F7"
                            title="Agree and Check Your Loan Options"
                            onPress={()=>
                                () => formSubmitNID()
                            }
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
