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
import { BackHandler } from "react-native";
import { getAccessKey, getResponse } from "./controller/APIController";
import SInfo from "react-native-sensitive-info";

export default class SignIn extends Component {
  static navigationOptions = {
    header: null,
    title: "Sign in"
  };

  constructor(props) {
    super(props);

    this.state = {
      userDetails: {
        id: "",
        userName: "",
        emailID: "",
        mobileNo: "",
        OTP: "",
        isRegistered: "",
        IMEI: "",
        token: "",
        created_at: "",
        updated_at: "",
        credit_points: "",
        refered_by: "",
        is_active: ""
      },
      isLoggedIn: false
    };
  }

  componentWillMount() {
    //BackHandler.addEventListener('hardwareBackPress', () => {return true});
  }

  // componentWillMount() {
  //   BackHandler.addEventListener("hardwareBackPress", function() {
  //     // this.onMainScreen and this.goBack are just examples, you need to use your own implementation here
  //     // Typically you would use the navigator here to go to the last state.

  //     if (!this.onMainScreen()) {
  //       this.goBack();
  //       return true;
  //     }
  //     return false;
  //   });
  // }

  _onContinuePress = () => {
    Keyboard.dismiss();
    //this.props.navigation.navigate("VerifyOTP");
    const { navigate } = this.props.navigation;
    //var mobileNo = this.state.mobNo;
    //console.debug(mobileNo);
    var mobileNo = this.state.userDetails.mobileNo;
    console.debug(mobileNo);
    if (mobileNo == "" || mobileNo == null) {
      alert("Please enter mobile number");
    } else if (mobileNo.length != 10) {
      alert("Please enter valid mobile number");
    } else {
      var input = new FormData();
      input.append("phone_number", mobileNo);
      console.debug(input);
      fetch("http://59.179.21.217/trafficmitra/api/send-otp", {
        method: "post",
        header: {
          Accept: "application/json",
          "Content-type": "multipart/form-data"
        },
        body: input
      })
        .then(response => response.json())
        .then(responseJson => {
          //console.debug(responseJson);
          if (responseJson.status == 1) {
            var result = responseJson.data;
            //console.debug(result.otp);
            //console.debug(result['otp']);

            SInfo.setItem("mobileNo", mobileNo, {
              sharedPreferencesName: "userPrefs",
              keychainService: "myKeychain"
            }).then(value => console.log(value));

            this.setState({
              userDetails: {
                ...this.state.userDetails,
                OTP: result.otp.toString(),
                isRegistered: result.isRegistered.toString()
              }
            });

            if (this.state.userDetails.isRegistered == "0") {
              navigate("SignUp");
            } else if (this.state.userDetails.isRegistered == "1") {
              // Save User details into preference
              // console.debug(result["user_detail"][0].id);
              // console.debug(result["user_detail"][0].username);
              // console.debug(result["user_detail"][0].email_id);
              // console.debug(result["user_detail"][0].token);
              // console.debug(result["user_detail"][0].created_at);
              // console.debug(result["user_detail"][0].updated_at);
              // console.debug(result["user_detail"][0].credit_points);
              // console.debug(result["user_detail"][0].refered_by);
              // console.debug(result["user_detail"][0].is_active);
              this.setState({
                userDetails: { 
                  ...this.state.userDetails,
                  id: result["user_detail"][0].id,
                  userName: result["user_detail"][0].username,
                  emailID: result["user_detail"][0].email_id,
                  token: result["user_detail"][0].token,
                  created_at: result["user_detail"][0].created_at,
                  updated_at: result["user_detail"][0].updated_at,
                  credit_points: result["user_detail"][0].credit_points,
                  refered_by: result["user_detail"][0].refered_by,
                  is_active: result["user_detail"][0].is_active
                }
              });

              SInfo.setItem("OTP", result.otp.toString(), {
                sharedPreferencesName: "userPrefs",
                keychainService: "myKeychain"
              }).then(value => console.log(value));
              SInfo.setItem("isRegistered", result.isRegistered.toString(), {
                sharedPreferencesName: "userPrefs",
                keychainService: "myKeychain"
              }).then(value => console.log(value));
              var userDetailsObj=this.state.userDetails;
              navigate("VerifyOTP", {userDetailsObj});
            }
          } else if (responseJson.status == 0) {
            alert(responseJson.message);
          } else {
            alert("Server Not Responding!");
          }
        })
        .catch(error => {
          //console.error(error);
          alert("Failed! Please try again.");
        });
    }
  };

  _onSignUpPress = () => {
    this.props.navigation.navigate("SignUp");
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
          <Text style={styles.headerText}>Sign in</Text>
        </View>
        <View style={styles.logoContainer}>
          <Image
            source={require("../images/sing_in_logo.png")}
            style={styles.logo}
          />
        </View>
        <View style={styles.restUI}>
          <Text style={styles.discText}>Sign in</Text>
          <View style={{ flexDirection: "row", marginLeft: 45 }}>
            <TextInput
              underlineColorAndroid="transparent"
              style={{
                fontSize: 18,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              +91
            </TextInput>
            <TextInput
              underlineColorAndroid="transparent"
              style={{ fontSize: 18, width: 140, marginLeft: 45 }}
              placeholder="Mobile Number"
              value={this.state.userDetails.mobileNo}
              keyboardType="phone-pad"
              onChangeText={text =>
                this.setState({
                  userDetails: {
                    ...this.state.userDetails,
                    mobileNo: text
                  }
                })
              }
            />
            <Image
              source={require("../images/close.png")}
              style={{
                width: 12,
                height: 12,
                marginLeft: 25,
                marginTop: 20
              }}
            />
          </View>

          <View
            style={{
              borderBottomColor: "black",
              borderBottomWidth: 1,
              height: 1,
              marginLeft: 35,
              width: 45
            }}
          />
          <View
            style={{
              borderBottomColor: "black",
              borderBottomWidth: 1,
              marginLeft: 120,
              width: 180
            }}
          />
          <Text style={styles.discText1}>Sign in with your mobile number.</Text>
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
              justifyContent: "center",
              display: 'none' 
            }}
          >
            <Text style={styles.discText1}>Don't have an account? </Text>
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
              onPress={this._onSignUpPress}
            >
              <Text style={styles.discText1}>Sign up.</Text>
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
  discText: {
    color: "#00A3ED",
    fontWeight: "bold",
    fontFamily: "sans-serfi-thin",
    fontSize: 17,
    marginLeft: 40,
    marginTop: 20
  },
  discText1: {
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
    fontFamily: "sans-serfi-thin",
    fontSize: 20
  },
  detailtext: {
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

AppRegistry.registerComponent("SignIn", () => SignIn);
