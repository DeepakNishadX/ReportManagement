/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import * as React from "react";
import { Component } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  Text,
  AppRegistry,
  FlatList
} from "react-native";

import { StackNavigator } from "react-navigation";
import SInfo from "react-native-sensitive-info";

export default class OffenceDetails extends Component {
  // static navigationOptions = {
  //   //header: null,
  //   title: {this.state.params.complaintNo},
  //   // headerLeft: (
  //   //   <TouchableOpacity
  //   //     style={{ height: 40, width: 40, backgroundColor: "blue" }}
  //   //   />
  //   // ),
  //   headerTintColor: "#fff",
  //   headerStyle: {
  //     backgroundColor: "#007FD2",
  //     elevation: null
  //   }
  // };

  static navigationOptions = ({ navigation }) => {
    const { state } = navigation;
    return {
      //header: null,
      title: `#${state.params.complaintNo}`,
      // headerLeft: (
      //   <TouchableOpacity
      //     style={{ height: 40, width: 40, backgroundColor: "blue" }}
      //   />
      // ),
      headerTintColor: "#fff",
      headerStyle: {
        backgroundColor: "#007FD2",
        elevation: null
      }
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      token: "",
      complaintNo: "",
      complaintDetails: {
        rc_number: '--',
        address: '--',
        offences: '--',
        comment: '--',
        action: '--',
        action_comment: '--',
        photo_path: '',
      }
    };
  }

  componentWillMount() {
    console.debug("OffenceList testing.....");
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
      console.debug("---------------");
      console.debug(value);
      this.setState({ token: value });
      console.debug(value);
      console.debug("---------------");
    });

    var complaintNo = this.props.navigation.state.params.complaintNo;
    this.setState({ complaintNo: complaintNo });
    setTimeout(() => {
      this.getComplaintDetails();
    }, 500);
  }

  getComplaintDetails = () => {
    const { token, complaintNo } = this.state;
    const url = "http://59.179.21.217/trafficmitra/api/complaint-details";
    this.setState({ loading: true });
    console.debug(token);

    var input = new FormData();
    input.append("request-for", "complaint-details");
    input.append("complaint_number", complaintNo);
    input.append("token", token);
    console.debug(input);
    fetch(url, {
      method: "post",
      header: {
        Accept: "application/json",
        "Content-type": "multipart/form-data"
      },
      body: input
    })
      .then(response => response.json())
      .then(responseJSON => {
        //console.debug(responseJSON);
        if (responseJSON.status == 1) {
          let result = responseJSON.data[0];

          this.setState({ complaintDetails: result });
          console.debug(this.state.complaintDetails);
        } else if (responseJSON.status == 0) {
          alert(responseJSON.message);
        } else {
          alert("Server Not Responding!");
        }
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <View style={styles.logoContainer}>
          <View
            style={{
              flexDirection: "row",
              marginLeft: 15,
              marginTop: 20,
              marginRight: 25
            }}
          >
            <Text style={{ flex: 2, fontSize: 14, color: "black" }}>
              Vehicle Number:
            </Text>
            <Text
              style={{
                flex: 4,
                fontSize: 15,
                color: "black",
                marginLeft: 5,
                fontWeight: "bold"
              }}
            >
              {this.state.complaintDetails.rc_number}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              marginLeft: 15,
              marginTop: 10,
              marginRight: 25
            }}
          >
            <Text style={{ flex: 2, fontSize: 14, color: "black" }}>
              Offence Location:
            </Text>
            <Text
              style={{
                flex: 4,
                fontSize: 15,
                color: "black",
                marginLeft: 5,
                fontWeight: "bold"
              }}
            >
              {this.state.complaintDetails.address}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              marginLeft: 15,
              marginTop: 10,
              marginRight: 25
            }}
          >
            <Text style={{ flex: 2, fontSize: 14, color: "black" }}>
              Offence:
            </Text>
            <Text
              style={{
                flex: 4,
                fontSize: 15,
                color: "black",
                marginLeft: 5,
                fontWeight: "bold"
              }}
            >
              {this.state.complaintDetails.offences}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              marginLeft: 15,
              marginTop: 10,
              marginRight: 25
            }}
          >
            <Text style={{ flex: 2, fontSize: 14, color: "black" }}>
              Comment:
            </Text>
            <Text
              style={{
                flex: 4,
                fontSize: 15,
                color: "black",
                marginLeft: 5,
                fontWeight: "bold"
              }}
            >
              {this.state.complaintDetails.comment}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              marginLeft: 15,
              marginTop: 10,
              marginRight: 25
            }}
          >
            <Text style={{ flex: 2, fontSize: 14, color: "black" }}>
              Status:
            </Text>
            <Text
              style={{
                flex: 4,
                fontSize: 15,
                color: "black",
                marginLeft: 5,
                fontWeight: "bold"
              }}
            >
              {this.state.complaintDetails.action}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              marginLeft: 15,
              marginTop: 10,
              marginRight: 25
            }}
          >
            <Text style={{ flex: 2, fontSize: 14, color: "black" }}>
              Reason:
            </Text>
            <Text
              style={{
                flex: 4,
                fontSize: 15,
                color: "black",
                marginLeft: 5,
                fontWeight: "bold"
              }}
            >
              {this.state.complaintDetails.action_comment}
            </Text>
          </View>
          <View style={styles.imageContainer1}>
            <Image 
              source={{  
                uri: `http://59.179.21.217/trafficmitra/storage/${
                  this.state.complaintDetails.photo_path
                }`
              }}
              style={styles.ImageStyle}
            />
            <Image
              style={styles.ImageStyle1}
              source={require("../images/ic_full_screen.png")}
            />
          </View>
        </View>
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
    flex: 5.5
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
    borderColor: "#007FD2"
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
    height: 160,
    width: 160,
    marginTop: 7
  },
  ImageStyle1: {
    position: "absolute",
    alignSelf: "flex-end",
    height: 32,
    width: 32,
    marginTop: 0,
    marginRight: 0
  },
  container: {
    flex: 1
  },
  container1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
    marginTop: 24
  },
  item: {
    height: 30,
    backgroundColor: "#007FD2",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    fontSize: 19,
    marginTop: 2,
    marginLeft: 15,
    color: "white",
    fontWeight: "bold",
    paddingTop: 3,
    paddingLeft: 15,
    paddingRight: 15
  },
  imageContainer1: {
    height: 170,
    width: 170,
    marginTop: 15,
    marginLeft: 10,
    backgroundColor: "silver"
  }
});

AppRegistry.registerComponent("OffenceDetails", () => OffenceDetails);
