import React from "react";
import {
  AppRegistry,
  Console,
  StyleSheet,
  ScrollView,
  Text,
  View,
  Button,
  TextInput,
  TouchableOpacity,
  Keyboard
} from "react-native";
import { StackNavigator } from "react-navigation";

export default class DashboardScreen extends React.Component {
  static navigationOptions = {
    title: "Dashboard"
  };
  constructor(props) {
    super(props);
    this.state = {
      route: "Welcome User!", 
      username: "",
      password: ""
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.toolbar} />

        <View style={styles.loginForm}>
          <Text style={{ fontSize: 27 }}>{this.state.route}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    backgroundColor: "#fff"
    //marginTop: 50,
    //padding: 30,
    //alignItems: 'center',
    //justifyContent: 'center',
  },
  toolbar: {
    backgroundColor: "#2aaadd",
    padding: 38
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
  button: {
    height: 80,
    //backgroundColor: '#2aaadd',
    //alignItems: 'center',
    //justifyContent: 'center',
    backgroundColor: "#2aaadd"
  }
});

AppRegistry.registerComponent("Dashboard", () => DashboardScreen);
