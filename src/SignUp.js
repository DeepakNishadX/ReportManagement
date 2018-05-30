/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import {
  AppRegistry,
  Platform,
  StyleSheet,
  Text,
  Image,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  Keyboard
} from "react-native";
import { StackNavigator } from "react-navigation";
import SInfo from "react-native-sensitive-info";

export default class SignUp extends Component {
  static navigationOptions = {
    header: null,
    title: "Sign up"
  };

  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      emailID: "",
      mobileNo: "",
      referenceMobileNo: "",
      IMEI_UUID: "",
      token: ""
    };
  }

  componentWillMount() {
    SInfo.getItem("mobileNo", {
      sharedPreferencesName: "userPrefs",
      keychainService: "myKeychain"
    }).then(value => {
      console.log("Sign up testing------------");
      console.log(value);
      this.setState({ mobileNo: value });
    });

    // Get IMEI/UUID and save it to state
    if (Platform.OS === "android") {
      const IMEI = require("react-native-imei");
      this.setState({ IMEI_UUID: IMEI.getImei() });
    } else if (Platform.OS === "ios") {
      var DeviceUUID = require("react-native-device-uuid");
      DeviceUUID.getUUID().then(uuid => {
        console.log(uuid);
        this.setState({ IMEI_UUID: uuid });
      });
    }
    console.debug("DEVICE_ID testing.......");
    setTimeout(() => {
      console.debug(this.state.IMEI_UUID);
      SInfo.setItem("IMEI_UUID", this.state.IMEI_UUID, {
        sharedPreferencesName: "userPrefs",
        keychainService: "myKeychain"
      }).then(value => console.log(value));
    }, 100);
  }
  _onContinuePress = () => {
    Keyboard.dismiss();
    if (this.validate()) {
      const { navigate } = this.props.navigation;

      var input = new FormData();
      input.append("username", this.state.userName);
      input.append("email_id", this.state.emailID);
      input.append("refered_by", this.state.referenceMobileNo);
      input.append("phone_number", this.state.mobileNo);
      input.append("imei", this.state.IMEI_UUID); 
      console.debug(input);

      fetch("http://59.179.21.217/trafficmitra/api/register", {
        method: "post",
        header: {
          Accept: "application/json",
          "Content-type": "application/json"
        },
        body: input
      }) 
        .then(response => response.json())
        .then(responseJson => {
          console.debug(responseJson);
          if (responseJson.status == 1) {
            let result = responseJson.data;
            //console.debug(result.token);
            //console.debug(result['token']);
            this.setState({ token: result.token }); 

            SInfo.setItem("referenceMobileNo", this.state.referenceMobileNo, {
              sharedPreferencesName: "userPrefs",
              keychainService: "myKeychain"
            }).then(value => console.log(value));
            SInfo.setItem("token", this.state.token, {
              sharedPreferencesName: "userPrefs",
              keychainService: "myKeychain"
            }).then(value => console.log(value));
            SInfo.setItem("isLoggedIn", "true", {
              sharedPreferencesName: "userPrefs",
              keychainService: "myKeychain"
            }).then(value => console.log(value));

            navigate("ReportMenu");
          } else if (responseJson.status == 0) {
            alert(responseJson.message);
          } else {
            alert("Server Not Responding!");
          }
        })
        .catch(error => {
          //console.error(error);
        });
    }
    //this.props.navigation.navigate("ReportMenu");
  };

  validate = () => {
    var msg;
    if (
      this.state.userName != null &&
      this.state.userName.length > 0 &&
      this.state.emailID != null &&
      this.state.emailID.length > 0
    ) {
      // Validate Email ID
      return true;
    } else if (this.state.userName == null || this.state.userName.length == 0) {
      msg = "Please enter user name";
    } else if (this.state.emailID == null || this.state.emailID.length == 0) {
      msg = "Please enter email id";
    }
    alert(msg);
    return false;
  };

  _onSignInPress = () => {
    this.props.navigation.navigate("SignIn");
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <View
          style={{
            flex: 0.5,
            backgroundColor: "white",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Text style={styles.headerText}>Sign up</Text>
        </View>
        <View style={styles.logoContainer}>
          <Image
            source={require("../images/sing_in_logo.png")}
            style={styles.logo}
          />
        </View>
        <View style={styles.restUI}>
          <View style={styles.textInputWrapper}>
            <Text style={styles.descText}>Sign up</Text>
            <TextInput
              style={styles.textInput}
              placeholder="User Name"
              autoCapitalize="none"
              autoCorrect={false}
              autoFocus={false}
              keyboardType="default"
              value={this.state.userName}
              onChangeText={text => this.setState({ userName: text })}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Email ID"
              autoCapitalize="none"
              autoCorrect={false}
              autoFocus={false}
              keyboardType="email-address"
              secureTextEntry={true}
              value={this.state.emailID}
              onChangeText={text => this.setState({ emailID: text })}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Reference Mobile No"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="phone-pad"
              autoFocus={false}
              secureTextEntry={true}
              value={this.state.referenceMobileNo}
              onChangeText={text => this.setState({ referenceMobileNo: text })}
            />
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <View style={styles.buttonStyle}>
            <Button
              title="Continue"
              color="#00A3ED"
              onPress={this._onContinuePress}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Text style={styles.descText1}>Already have an account? </Text>
            <TouchableOpacity
              style={{
                //borderWidth: 1,
                //borderColor: "rgba(0,0,0,0.2)",
                alignItems: "center",
                justifyContent: "center",
                //width: 100,
                //height: 100,
                // backgroundColor: "#fff",
                borderRadius: 100
              }}
              onPress={this._onSignInPress}
            >
              <Text style={styles.descText1}>Sign in.</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  },
  logo: {
    width: 220,
    height: 150,
    backgroundColor: "white"
  },
  logoContainer: {
    flex: 1.5,
    alignItems: "center",
    justifyContent: "center"
  },
  restUI: {
    flex: 2,
    backgroundColor: "white"
  },
  textInputWrapper: {
    backgroundColor: "#fff",
    paddingTop: 10,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 5
  },
  textInput: {
    height: 45,
    marginTop: 5,
    fontSize: 18,
    backgroundColor: "#fff"
  },
  descText: {
    color: "#00A3ED",
    fontWeight: "bold",
    fontFamily: "sans-serif-thin",
    fontSize: 17,
    marginTop: 20
  },
  descText1: {
    color: "gray",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
    fontFamily: "sans-serfi-thin",
    fontSize: 15
  },
  headerText: {
    color: "black",
    fontWeight: "bold",
    alignItems: "center",
    textAlign: "center",
    fontFamily: "sans-serif-thin",
    fontSize: 20
  },
  detailsText: {
    marginTop: 50,
    color: "#007CD0",
    fontSize: 20,
    textAlign: "center",
    fontFamily: "sans-serif-light"
  },
  nicLogo: {
    width: 130,
    height: 25,
    marginTop: 80,
    alignItems: "baseline",
    backgroundColor: "#F5FCFF"
  },
  buttonStyle: {
    alignSelf: "center",
    alignItems: "center",
    marginTop: 10,
    justifyContent: "space-between"
  }
});

AppRegistry.registerComponent("SignUp", () => SignUp);
