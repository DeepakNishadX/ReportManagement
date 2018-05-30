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
  TouchableHighlight,
  TouchableOpacity,
  Alert
} from "react-native";
import { StackNavigator } from "react-navigation";
import SInfo from "react-native-sensitive-info";

export default class ReportMenu extends Component {
  static navigationOptions = {
    header: null,
    title: "Report Menu"
  };
  constructor(props) {
    super(props);
    this.validate();
  }

  validate = () => {
    console.debug("ReportMenu testing ......");
    SInfo.getItem("isLoggedIn", {
      sharedPreferencesName: "userPrefs",
      keychainService: "myKeychain"
    }).then(value => {
      if (value == "false") {
        this.props.navigation.navigate("SignIn");
      }
    });
    SInfo.getItem("token", {
      sharedPreferencesName: "userPrefs",
      keychainService: "myKeychain"
    }).then(value => {
      console.debug(value);
    });
  };

  componentWillMount() {
    //this.validate();
  }

  _onReportOffencePress = () => {
    //this.props.navigation.navigate("ReportOffence");
    this.props.navigation.navigate("SubmitReport");
    //this.props.navigation.navigate("TopBarTextExample");
  }; 

  _onReportOffenceDetailsPress = () => {
    //this.props.navigation.navigate("ReportOffenceDetails");
    //alert("Offence List Pressed!");
    //this.props.navigation.navigate("OffenceList");
    this.props.navigation.navigate("OffenceListDetails");
  };

  _onSignOutPress = () => {
    //Add Confirmation Dialog
    Alert.alert(
      "Confirm Sign out",
      "Are you sure you want to Sign out?",
      [
        //{text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
        {
          text: "Cancel",
          //onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "OK",
          onPress: () => {
            this._signOut();
          }
        }
      ],
      { cancelable: false }
    );
  };

  _signOut = () => {
    console.log("Ok Pressed");
    SInfo.setItem("isLoggedIn", "false", {
      sharedPreferencesName: "userPrefs",
      keychainService: "myKeychain"
    }).then(value => console.log(value));
    SInfo.deleteItem("id", {
      sharedPreferencesName: "userPrefs",
      keychainService: "myKeychain"
    }).then(value => console.log(value));
    SInfo.deleteItem("userName", {
      sharedPreferencesName: "userPrefs",
      keychainService: "myKeychain"
    }).then(value => console.log(value));
    SInfo.deleteItem("emailID", {
      sharedPreferencesName: "userPrefs",
      keychainService: "myKeychain"
    }).then(value => console.log(value));
    SInfo.deleteItem("mobileNo", {
      sharedPreferencesName: "userPrefs",
      keychainService: "myKeychain"
    }).then(value => console.log(value));
    SInfo.deleteItem("token", {
      sharedPreferencesName: "userPrefs",
      keychainService: "myKeychain"
    }).then(value => console.log(value));
    SInfo.deleteItem("OTP", {
      sharedPreferencesName: "userPrefs",
      keychainService: "myKeychain"
    }).then(value => console.log(value));
    SInfo.deleteItem("isRegistered", {
      sharedPreferencesName: "userPrefs",
      keychainService: "myKeychain"
    }).then(value => console.log(value));
    SInfo.deleteItem("referenceMobileNo", {
      sharedPreferencesName: "userPrefs",
      keychainService: "myKeychain"
    }).then(value => console.log(value));
    SInfo.deleteItem("created_at", {
      sharedPreferencesName: "userPrefs",
      keychainService: "myKeychain"
    }).then(value => console.log(value));
    SInfo.deleteItem("updated_at", {
      sharedPreferencesName: "userPrefs",
      keychainService: "myKeychain"
    }).then(value => console.log(value));
    SInfo.deleteItem("credit_points", {
      sharedPreferencesName: "userPrefs",
      keychainService: "myKeychain"
    }).then(value => console.log(value));
    SInfo.deleteItem("is_active", {
      sharedPreferencesName: "userPrefs",
      keychainService: "myKeychain"
    }).then(value => console.log(value));
    this.props.navigation.navigate("SignIn");
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
          <Text style={styles.headerText} />
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
            onPress={this._onSignOutPress}
          >
            <Image
              source={require("../images/logout.png")}
              style={styles.logout}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.logoContainer}>
          <Image
            source={require("../images/app_logo.png")}
            style={styles.logo}
          />
        </View>
        <View style={styles.restUI}>
          <View style={styles.buttonController}>
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
              onPress={this._onReportOffencePress}
            >
              <Image
                source={require("../images/report_offense_normal.png")}
                style={styles.report}
              />
            </TouchableOpacity>
            <Text style={styles.headerText}> Report offence </Text>
          </View>
          <View style={styles.buttonController}>
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
              onPress={this._onReportOffenceDetailsPress}
            >
              <Image
                source={require("../images/offence_list.png")}
                style={styles.report}
              />
            </TouchableOpacity>
            <Text style={styles.headerText}> Offence List </Text>
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
    width: 200,
    height: 200,
    backgroundColor: "white"
  },
  logout: {
    flex: 0.6,
    marginRight: 18,
    width: 32,
    height: 32
  },
  logoContainer: {
    flex: 2.5,

    alignItems: "center",
    justifyContent: "center"
  },
  restUI: {
    flex: 2.5,
    flexDirection: "row",
    backgroundColor: "#00A3ED",
    alignItems: "center",
    justifyContent: "center"
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
    color: "white",
    fontWeight: "bold",
    alignItems: "center",
    alignSelf: "center",
    textAlign: "center",
    margin: 18,
    fontFamily: "sans-serif-thin",
    fontSize: 17
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
    color: "#007CD0",
    fontWeight: "bold",
    fontSize: 28
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
  },
  buttonController: {
    alignSelf: "center",
    alignItems: "center",
    marginTop: 50
  },
  report: {
    width: 82,
    height: 82
  }
});

AppRegistry.registerComponent("ReportMenu", () => ReportMenu);
