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
import Splash from "./Splash";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import VerifyOTP from "./VerifyOTP";
import ReportMenu from "./ReportMenu";
import ReportOffence from "./ReportOffence";
import SubmitReport from "./SubmitReport";
import Camera from "./Camera";
import OffenceDetails from "./OffenceDetails";
import OffenceList from "./OffenceList";
import OffenceListDetails from "./OffenceListDetails";
import TopBarTextExample from "./tabviewTest/TopBarTextExample";

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <SimpleApp />;
  }
}

// const navigationConfig = {
//   initialRouteName: "Places",
//   headerMode: "float",
//   navigationOptions: {
//     title: "App Name",
//     header: ({ state, setParams }) => ({
//       style: { backgroundColor: "green" }
//     })
//   }
// };

export const SimpleApp = StackNavigator({
  Splash: { screen: Splash },
  SignIn: { screen: SignIn },
  SignUp: { screen: SignUp },
  VerifyOTP: { screen: VerifyOTP },
  ReportMenu: { screen: ReportMenu },
  ReportOffence: { screen: ReportOffence },
  SubmitReport: { screen: SubmitReport },
  Camera: { screen: Camera },
  OffenceDetails: { screen: OffenceDetails },
  OffenceList: { screen: OffenceList },
  OffenceListDetails: { screen: OffenceListDetails },
  TopBarTextExample: { screen: TopBarTextExample }
});

AppRegistry.registerComponent("SimpleApp", () => SimpleApp);
