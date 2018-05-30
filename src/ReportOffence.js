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
  ScrollView,
  Icon,
  TouchableOpacity
} from "react-native";
import { StackNavigator } from "react-navigation";

import CardView from "react-native-cardview";
//import Button from "react-native-button";

export default class ReportOffence extends Component {
  static navigationOptions = {
    header: null,
    title: "Report Offence"
  };
  constructor(props) {
    super(props);
  }

  _onSubmitPress = () => {
    //this.props.navigation.navigate("ReportMenu");
    this.props.navigation.goBack();
  };

  _onBackPress = () => {
    this.props.navigation.goBack();
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <View
          style={{
            flex: 0.5,
            flexDirection: "row",
            backgroundColor: "#00A3ED",
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
            <Image
              source={require("../images/back_left.png")}
              style={styles.back}
            />
          </TouchableOpacity>
          <Text style={styles.headerText}>Report Offence</Text>
        </View>
        <View style={styles.logoContainer}>
          <ScrollView contentContainerStyle={styles.contentContainer}>
            <CardView
              style={{ height: 220 }}
              cardElevation={2}
              cardMaxElevation={2}
              cornerRadius={5}
            >
              <View style={{ flexDirection: "row", height: 220 }}>
                <View
                  style={{
                    flex: 1.5,
                    alignItems: "center"
                  }}
                >
                  <Image
                    source={require("../images/camera1.png")}
                    style={{
                      marginTop: 130,
                      width: 55,
                      height: 61
                    }}
                  />
                </View>

                <View
                  style={{
                    flex: 4,
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <View style={styles.circle} />
                </View>
                <View
                  style={{
                    flex: 1.5,
                    alignItems: "center"
                  }}
                >
                  <Image
                    source={require("../images/video1.png")}
                    style={{
                      marginTop: 130,
                      width: 55,
                      height: 61
                    }}
                  />
                </View>
              </View>
            </CardView>
            <CardView
              style={{ height: 120 }}
              cardElevation={2}
              cardMaxElevation={2}
              cornerRadius={5}
            />
            <CardView
              style={{ height: 300 }}
              cardElevation={2}
              cardMaxElevation={2}
              cornerRadius={5}
            >
              <View style={styles.details}>
                <Text
                  style={{
                    fontSize: 16,
                    marginLeft: 10,
                    marginRight: 10,
                    marginTop: 8,
                    color: "#00A3ED",
                    fontWeight: "bold"
                  }}
                >
                  Enter Details
                </Text>
                <View style={styles.SectionStyle}>
                  <Image
                    source={require("../images/sedan.png")}
                    style={styles.ImageStyle}
                  />
                  <TextInput
                    placeholder="Vehicle Number(Max. 10 characters)"
                    style={{
                      flex: 1,
                      fontSize: 16,
                      marginLeft: 10,
                      marginRight: 10,
                      marginTop: 8
                    }}
                  />
                </View>
                <View style={styles.SectionStyle}>
                  <Image
                    source={require("../images/location.png")}
                    style={styles.ImageStyle}
                  />
                  <TextInput
                    placeholder="Offence Location(Max. 250 characters)"
                    style={{
                      flex: 1,
                      fontSize: 16,
                      marginLeft: 10,
                      marginRight: 10,
                      marginTop: 8
                    }}
                  />
                </View>
                <View style={{ flexDirection: "row", marginTop: 8 }}>
                  <View
                    style={{ flexDirection: "row", flex: 3, marginLeft: 10 }}
                  >
                    <Image
                      source={require("../images/clock.png")}
                      style={{
                        height: 20,
                        width: 20,
                        marginTop: 15,
                        marginRight: 12,
                        marginLeft: 5
                      }}
                    />
                    <TextInput
                      placeholder="Time"
                      style={{ flex: 1, fontSize: 16 }}
                    />
                  </View>
                  <View
                    style={{ flexDirection: "row", flex: 3, marginLeft: 10 }}
                  >
                    <Image
                      source={require("../images/calendar.png")}
                      style={{
                        height: 20,
                        width: 20,
                        marginTop: 15,
                        marginRight: 12,
                        marginLeft: 5
                      }}
                    />
                    <TextInput
                      placeholder="Date"
                      style={{ flex: 1, fontSize: 16 }}
                    />
                  </View>
                </View>
                <View style={styles.SectionStyle}>
                  <Image
                    source={require("../images/comment.png")}
                    style={styles.ImageStyle}
                  />
                  <TextInput
                    placeholder="Comment(Max. 500 characters)"
                    style={{
                      flex: 1,
                      fontSize: 16,
                      marginLeft: 10,
                      marginRight: 10,
                      marginTop: 8
                    }}
                  />
                </View>
              </View>
            </CardView>
          </ScrollView>
        </View>
        <TouchableOpacity
          style={{
            flex: 0.5,
            flexDirection: "row",
            backgroundColor: "#00A3ED",
            alignItems: "center",
            //borderWidth: 1,
            //borderColor: "rgba(0,0,0,0.2)",
            justifyContent: "center"
            //width: 100,
            //height: 100,
            // backgroundColor: "#fff",
            //borderRadius: 100
          }}
          onPress={this._onSubmitPress}
        >
          <Text style={styles.headerText2}>Submit</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  back: {
    flex: 0.4,
    marginLeft: 18,
    width: 24,
    height: 24
  },
  logoContainer: {
    flex: 5,
    backgroundColor: "#F5F5F5"
  },
  headerText: {
    flex: 5,
    color: "white",
    fontWeight: "bold",
    margin: 18,
    fontFamily: "sans-serif-light",
    fontSize: 21
  },
  headerText2: {
    flex: 5,
    color: "white",
    fontWeight: "bold",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "sans-serif-light",
    fontSize: 21,
    textAlign: "center"
  },
  circle: {
    width: 170,
    height: 170,
    borderRadius: 170 / 2,
    borderWidth: 2,
    borderColor: "#00A3ED"
  },
  details: {
    marginLeft: 10,
    marginRight: 15
  },
  image: {
    width: 12,
    height: 12
  },
  SectionStyle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10
  },
  ImageStyle: {
    height: 25,
    width: 25,
    marginTop: 7
  }
});
AppRegistry.registerComponent("ReportOffence", () => ReportOffence);
