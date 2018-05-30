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

export default class VerifyOTP extends Component {
  static navigationOptions = {
    header: null,
    title: "Verify OTP"
  };
  constructor(props) {
    super(props);

    this.state = {
      OTP: "",
      mobileNo: "",
      userDetails: ""
    };
  }

  componentWillMount() {
    SInfo.getItem("isLoggedIn", {
      sharedPreferencesName: "userPrefs",
      keychainService: "myKeychain"
    }).then(value => {
      if (value == "false") {
        this._onBackPress;
      }
    });

    SInfo.getItem("mobileNo", {
      sharedPreferencesName: "userPrefs",
      keychainService: "myKeychain"
    }).then(value => {
      //console.log("testing------------");
      // console.log(value); //value1
      this.setState({ mobileNo: value });
    });

    this.saveUserState();
  }

  // componentDidMount() {
  //   this.saveUserState();
  // }

  saveUserState = () => {
    console.log("saveUserState = () =>-----------------------------");
    var userDetailsInfo;
    try {
      userDetailsInfo = this.props.navigation.state.params.userDetailsObj;
      // console.log(userDetailsInfo);
      // console.log(userDetailsInfo.id);
      // console.log(userDetailsInfo.userName);

      this.setState({ userDetails: userDetailsInfo });
      //this.setState({ userDetails: "hello" });
      //console.log("this.state.userDetails =>-----------------------------");

      // setTimeout(() => {
      //   console.log(this.state.userDetails);
      //   console.log(this.state.userDetails.id);
      //   console.log(this.state.userDetails.userName);
      // }, 100);
    } catch (error) {
      console.log(error);
      userDetails = null;
    }
  };

  _onVerifyPress = () => {
    Keyboard.dismiss();
    if (this.state.OTP != null && this.state.OTP.length > 0) {
      const { navigate } = this.props.navigation;

      // Get OTP and verify with server save token to shared preference

      SInfo.getItem("OTP", {
        sharedPreferencesName: "userPrefs",
        keychainService: "myKeychain"
      }).then(value => {
        console.log(value);
        if (value == this.state.OTP) {
          console.debug("Login successful...."); 
          SInfo.setItem("isLoggedIn", "true", {
            sharedPreferencesName: "userPrefs",
            keychainService: "myKeychain"
          }).then(value => console.log(value));
          // Save User Details into SharedPreferences
          SInfo.setItem("id", this.state.userDetails.id.toString(), {
            sharedPreferencesName: "userPrefs",
            keychainService: "myKeychain"
          }).then(value => console.log(value));
          SInfo.setItem("userName", this.state.userDetails.userName, {
            sharedPreferencesName: "userPrefs",
            keychainService: "myKeychain"
          }).then(value => console.log(value));
          SInfo.setItem("emailID", this.state.userDetails.emailID, {
            sharedPreferencesName: "userPrefs",
            keychainService: "myKeychain"
          }).then(value => console.log(value));
          SInfo.setItem("mobileNo", this.state.userDetails.mobileNo, {
            sharedPreferencesName: "userPrefs",
            keychainService: "myKeychain"
          }).then(value => console.log(value));

          SInfo.setItem("token", this.state.userDetails.token, {
            sharedPreferencesName: "userPrefs",
            keychainService: "myKeychain"
          }).then(value => console.log(value));
          SInfo.setItem("created_at", this.state.userDetails.created_at, {
            sharedPreferencesName: "userPrefs",
            keychainService: "myKeychain"
          }).then(value => console.log(value));
          SInfo.setItem("updated_at", this.state.userDetails.updated_at, {
            sharedPreferencesName: "userPrefs",
            keychainService: "myKeychain"
          }).then(value => console.log(value));
          SInfo.setItem(
            "credit_points",
            this.state.userDetails.credit_points.toString(),
            {
              sharedPreferencesName: "userPrefs",
              keychainService: "myKeychain"
            }
          ).then(value => console.log(value));
          SInfo.setItem(
            "referenceMobileNo",
            this.state.userDetails.refered_by,
            {
              sharedPreferencesName: "userPrefs",
              keychainService: "myKeychain"
            }
          ).then(value => console.log(value));
          SInfo.setItem(
            "is_active:",
            this.state.userDetails.is_active.toString(),
            {
              sharedPreferencesName: "userPrefs",
              keychainService: "myKeychain"
            }
          ).then(value => console.log(value));

          navigate("ReportMenu");
        } else {
          alert("Failed! Invalid OTP");
        }
      });
    } else if (this.state.OTP == null || this.state.OTP.length == 0) {
      alert("Please enter OTP.");
    }
  };

  _onEditPress = () => {
    this.props.navigation.navigate("SignIn");
  };

  _onBackPress = () => {
    this.props.navigation.navigate("SignIn");
    //this.props.navigation.goBack();
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <View
          style={{
            flex: 0.5,
            flexDirection: "row",
            backgroundColor: "white",
            alignItems: "center"
          }}
        >
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
            onPress={this._onBackPress}
          >
            <Image source={require("../images/back.png")} style={styles.back} />
          </TouchableOpacity>
          <Text style={styles.headerText}>Verify OTP</Text>
        </View>
        <View style={styles.logoContainer}>
          <Text style={styles.verificationCode}>Verification Code </Text>
          <Text style={styles.sub_head}>
            SMS Verification Code Has Been{"\n"}Sent To :{" "}
          </Text>
          <View style={{ flexDirection: "row", alignContent: "center" }}>
            <Text
              style={{
                fontSize: 17,
                color: "#00A3ED",
                marginTop: 10,
                fontWeight: "bold"
              }}
            >
              {this.state.mobileNo}
            </Text>
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
              onPress={this._onEditPress}
            >
              <Image
                source={require("../images/edit.png")}
                style={{
                  width: 18,
                  height: 18,
                  marginLeft: 15,
                  marginTop: 12
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.restUI}>
          <Text style={styles.discText}>OTP Code</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <TextInput
              style={{ fontSize: 18, width: 120, textAlign: "center" }}
              placeholder="OTP"
              value={this.state.OTP}
              keyboardType="phone-pad"
              value={this.state.OTP}
              onChangeText={text => this.setState({ OTP: text })}
            />
          </View>
        </View>
        <View style={{ flex: 1.2 }}>
          <Text style={styles.discText1}>
            Didn't receive the code ? Resend SMS
          </Text>
          <Text style={styles.discText2}>10:00</Text>

          <View style={styles.buttonStyle}>
            <Button
              title="Verify"
              color="#00A3ED"
              onPress={this._onVerifyPress}
            />
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
  back: {
    flex: 0.4,
    marginLeft: 12,
    width: 22,
    height: 22
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
  discText: {
    color: "#00A3ED",
    fontWeight: "bold",
    fontFamily: "sans-serif-light",
    fontSize: 17,
    marginLeft: 40,
    marginTop: 20
  },
  discText1: {
    color: "gray",
    fontWeight: "bold",
    textAlign: "center",

    fontFamily: "sans-serif-thin",
    fontSize: 15
  },
  discText2: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 5,
    fontFamily: "sans-serif-light",
    fontSize: 15
  },
  headerText: {
    flex: 5,
    color: "black",
    fontWeight: "bold",
    alignItems: "center",
    alignSelf: "center",
    textAlign: "center",
    marginRight: 30,
    fontFamily: "sans-serif-thin",
    fontSize: 20
  },
  sub_head: {
    color: "gray",
    fontWeight: "bold",
    alignItems: "center",
    alignSelf: "center",
    textAlign: "center",
    marginTop: 10,
    fontFamily: "sans-serif-thin",
    fontSize: 19
  },
  verificationCode: {
    color: "black",
    fontWeight: "bold",
    fontSize: 32,
    fontFamily: "sans-serif-light"
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
    marginTop: 20,
    width: 120,
    justifyContent: "space-between"
  }
});

AppRegistry.registerComponent("VerifyOTP", () => VerifyOTP);
