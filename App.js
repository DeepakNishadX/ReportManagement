import React, { Component } from "react";
import {
  Platform,
  AppRegistry,
  View,
  Image,
  StyleSheet,
  Button,
  TouchableOpacity,
  Text
} from "react-native";
import { StackNavigator } from "react-navigation";
import LoginScreen from "./pages/Login";
import CameraScreen from "./pages/Camera";
import DashboardScreen from "./pages/Dashboard";

class ChatScreen extends React.Component {
  static navigationOptions = {
    title: "Chat with Deepak"
  };
  render() {
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 27 }}>Chat with Deepak Nishad</Text>
      </View>
    );
  }
}

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});

class Splash extends React.Component {
  static navigationOptions = {
    header: null,
    title: "Splash"
  };

  moveToLogin = () => {
    //const { navigate } = this.props.navigation;
    setTimeout(() => {
      let testData="Deepak";
      this.props.navigation.navigate("Login");
    }, 100);
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <View style={styles.header}>
            <Image
              source={require("./images/ic_app.png")}
              style={styles.appIcon}
            />
            <Text style={styles.appTitleText}>Khatara Gadi</Text>
          </View>
          <View style={styles.mainBody}>
            <Text style={styles.appBodyText}>
              Department of Agriculture, Cooperation &amp; Farmers Welfare{" "}
              {"\n"}Ministry of Agriculture &amp; Farmers Welfare {"\n"}Government
              of India
            </Text>
          </View>
          <View style={styles.footer}>
            <Text style={styles.appBodyText}>Designed and developed by</Text>
            <Text style={styles.appDescText}>
              National Informatics Centre{"\n"}Ministry of Electronics and
              Information Technology{"\n"}Government of India
            </Text>
            <TouchableOpacity style={styles.button} onPress={this.moveToLogin}>
              <Text style={styles.appDescText}> Continue </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.tabBar}>
          <View style={[styles.tabBarButton, styles.button1]} />
          <View style={[styles.tabBarButton, styles.button2]} />
          <View style={[styles.tabBarButton, styles.button3]} />
          <View style={[styles.tabBarButton, styles.button4]} />
          <View style={[styles.tabBarButton, styles.button5]} />
        </View>
      </View>
    );
  }
}

export default class App extends React.Component {
  render() {
    return <SimpleApp />;
  }
}

export const SimpleApp = StackNavigator({
  Home: { screen: Splash },
  Chat: { screen: ChatScreen },
  Login: { screen: LoginScreen },
  Camera: { screen: CameraScreen },
  Dashboard: { screen: DashboardScreen }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#263238"
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: "#263238"
  },
  toolbar: {
    backgroundColor: "#2aaadd",
    padding: 38
    //alignItems: 'center',
    //justifyContent: 'center',
  },
  button: {
    alignItems: "center",
    marginTop: 30,
    backgroundColor: "#00000000",
    padding: 10
  },
  header: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center"
  },
  mainBody: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center"
  },
  footer: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center"
  },
  appTitleText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    textDecorationLine: "underline",
    fontFamily: "Times New Roman"
  },
  appBodyText: {
    fontSize: 18,
    fontWeight: "normal",
    color: "white",
    textAlign: "center",
    fontFamily: "Times New Roman"
  },
  appDescText: {
    fontSize: 16,
    fontWeight: "normal",
    color: "white",
    opacity: 0.65,
    textAlign: "center",
    fontFamily: "Times New Roman"
  },
  appIcon: {
    height: 80,
    width: 80
    //alignItems: 'center',
    //justifyContent: 'center',
  },
  loginForm: {
    //flex: 1,
    backgroundColor: "#fff",
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    padding: 10
    //alignItems: 'center',
    //justifyContent: 'center',
  },
  textInput: {
    height: 40,
    backgroundColor: "#fff",
    marginTop: 10,
    padding: 10
  },

  tabBar: {
    flexDirection: "row",
    height: 50
  },
  tabBarButton: {
    flex: 1
  },
  button1: { backgroundColor: "#8BC051" },
  button2: { backgroundColor: "#CCD948" },
  button3: { flex: 2, backgroundColor: "#FDE84D" },
  button4: { backgroundColor: "#FCBF2E" },
  button5: { backgroundColor: "#FC9626" }
});

AppRegistry.registerComponent("SimpleApp", () => SimpleApp);
