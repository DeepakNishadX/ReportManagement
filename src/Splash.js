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
  View
} from "react-native";
import { StackNavigator } from "react-navigation";
import SInfo from "react-native-sensitive-info";

export default class Splash extends Component {
  static navigationOptions = {
    header: null,
    title: "Splash"
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    setTimeout(() => {
      SInfo.getItem("isLoggedIn", {
        sharedPreferencesName: "userPrefs",
        keychainService: "myKeychain"
      }).then(value => {
        if (value == 'true') {
          this.props.navigation.navigate("ReportMenu");
        } else {
          this.props.navigation.navigate("SignIn");
        }
      });
    }, 2000);
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../images/ovr_splash_icon.jpg")}
            style={styles.logo}
          />
        </View>
        <View style={styles.restUI}>
          <Text style={styles.logoText}>KHATARA GAADI</Text>
          <Text style={styles.detailsText}>
            A Green Initiative of{"\n"}Transport Department{"\n"}G.N.C.T of
            Delhi
          </Text>
          <Image
            source={require("../images/ic_nic_logo.png")}
            style={styles.nicLogo}
          />
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
    width: 300,
    height: 260,
    backgroundColor: "#F5FCFF"
  },
  logoContainer: {
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center"
  },
  restUI: {
    alignItems: "center",
    backgroundColor: "white"
  },
  logoText: {
    color: "#007CD0",
    fontWeight: "bold",
    fontSize: 24
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
    marginTop: 100,
    alignItems: "baseline",
    backgroundColor: "#F5FCFF"
  }
});

AppRegistry.registerComponent("Splash", () => Splash);
