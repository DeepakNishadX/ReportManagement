import React, { Component } from "react";
import {
  AppRegistry,
  Console,
  StyleSheet,
  ScrollView,
  Text,
  View,
  Button,
  TouchableHighlight,
  Image,
  TextInput,
  TouchableOpacity,
  Keyboard
} from "react-native";
import { StackNavigator } from "react-navigation";
import Camera from "react-native-camera";

export default class LoginScreen extends React.Component {
  static navigationOptions = {
    header: null,
    title: "Sign in"
  };
  constructor(props) {
    super(props);

    this.state = {
      route: "Sign in",
      username: "dkn@dkn.com",
      password: "dkn", 
      path: "http://placehold.it/300x300"
    };
  }

  componentDidMount() {
    this.saveImageState();
  }

  saveImageState = () => {
    console.log("Hello! Deepak-----------------------------");
    var cameraResponse;
    try {
      cameraResponse = this.props.navigation.state.params.response;
      console.log(cameraResponse);

      this.setState({ path: cameraResponse.uri });
      console.log(this.state.path);
    } catch (error) {
      console.log(error);
      cameraResponse = null;
    }
  };

  onBarCodeRead(e) {
    console.log("Bar code Found!", "Type: " + e.type + "\nData: " + e.data);
  }

  userLogin(e) {
    //this.props.onLogin(this.state.username, this.state.password);
    //e.preventDefault();
  }

  login = () => {
    //const {name,pass} = this.state;
    const { navigate } = this.props.navigation;
    var uName = this.state.username;
    var uPass = this.state.password;
    if (uName == "") {
      alert("Please enter User name");
    } else if (uPass == "") {
      alert("Please enter Password");
    } else {
      //alert(this.state.username+" : "+this.state.password);

      fetch("http://echallanweb.gov.in/api/check-device-status", {
        method: "post",
        header: {
          Accept: "application/json",
          "Content-type": "application/json"
        },
        body: JSON.stringify({
          // we will pass our input data to server
          officer_id: "525",
          imei: "867290028441409",
          token: ""
        })
      })
        .then(response => response.json())
        .then(responseJson => {
          console.debug(responseJson);
          if (responseJson.status == 204) {
            alert("true" + responseJson.status);
            navigate("Dashboard");
          }
          //alert(responseJson.status);
        })
        .catch(error => {
          console.error(error);
        });
    }

    Keyboard.dismiss();

    //alert(this.state.username+" : "+this.state.password);
    //const {userEmail,userPassword} = this.state;
    //let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
    //if(userEmail==""){
    //alert("Please enter Email address");
    //this.setState({email:'Please enter Email address'})

    //}
  };

  takePicture = () => {
    // const options = {};
    // //options.location = ...
    // this.camera
    //   .capture({ metadata: options })
    //   .then(data => console.log(data))
    //   .catch(err => console.error(err));
    this.props.navigation.navigate("Camera");
  };

  openGallery = () => {
    var ImagePicker = require("react-native-image-picker");
    var options = {
      title: "Select Avatar",
      customButtons: [{ name: "fb", title: "Choose Photo from Facebook" }],
      storageOptions: {
        skipBackup: true,
        path: "images"
      }
    };

    ImagePicker.showImagePicker(options, response => {
      console.log("Response = ", response);

      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        let source = { uri: response.uri };

        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          path: source
        });
      }
    });

    // // Launch Camera:
    // ImagePicker.launchCamera(options, response => {
    //   // Same code as in above section!
    //   this.setState({ path: response.uri });
    // });

    // // Open Image Library:
    // ImagePicker.launchImageLibrary(options, response => {
    //   // Same code as in above section!
    //   this.setState({ path: response.uri });
    // });

  };

  toggleRoute(e) {
    let alt = this.state.route === "Sign in" ? "Sign up" : "Sign in";
    this.setState({ route: alt });
    e.preventDefault();
  }

  render() {
    let alt = this.state.route === "Sign in" ? "Sign up" : "Sign in";
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={{
              borderWidth: 1,
              borderColor: "rgba(0,0,0,0.2)",
              alignItems: "center",
              justifyContent: "center",
              width: 100,
              height: 100,
              // backgroundColor: "#fff",
              borderRadius: 100
            }}
            onPress={this.openGallery.bind(this)}
          >
            <Image
              //source={require("../images/ic_app.png")}
              source={{ uri: this.state.path }}
              style={styles.circle}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.contentContainer}>
          <TouchableHighlight
            style={styles.circleContainer}
            onPress={this.takePicture.bind(this)}
          >
            <Image
              source={require("../images/ic_camera.png")}
              style={styles.cameraIcon}
            />
          </TouchableHighlight>
        </View>
        <View style={styles.mainContent}>
          <Text style={styles.titleText}>Welcome!</Text>
        </View>
        <View style={styles.loginForm}>
          <View style={styles.textInputWrapper}>
            <Text style={{ fontSize: 27 }}>{this.state.route}</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Username"
              autoCapitalize="none"
              autoCorrect={false}
              autoFocus={false}
              keyboardType="email-address"
              value={this.state.username}
              onChangeText={text => this.setState({ username: text })}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Password"
              autoCapitalize="none"
              autoCorrect={false}
              autoFocus={false}
              secureTextEntry={true}
              value={this.state.password}
              onChangeText={text => this.setState({ password: text })}
            />
          </View>
          <View style={{ marginTop: 10 }} />
          <Button
            style={styles.button}
            title={this.state.route}
            onPress={this.login}
          />

          <View style={{ marginTop: 5 }} />
          <Text
            style={{ fontSize: 16, color: "#277add" }}
            onPress={e => this.toggleRoute(e)}
          >
            {alt}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#263238"
    //marginTop: 50,
    //padding: 30,
    //alignItems: 'center',
    //justifyContent: 'center',
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2
  },
  preview: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  capture: {
    flex: 0,
    backgroundColor: "#fff",
    borderRadius: 5,
    color: "#000",
    padding: 10,
    margin: 40
  },
  header: {
    //flex: 0,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center"
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    backgroundColor: "#263238"
  },
  circleContainer: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.2)",
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    height: 100,
    backgroundColor: "#fff",
    borderRadius: 100
  },
  mainContent: {
    //flex:1,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center"
  },
  titleText: {
    fontSize: 34,
    fontWeight: "bold",
    color: "white",
    fontFamily: "Times New Roman"
  },
  appIcon: {
    height: 80,
    width: 80
    //alignItems: 'center',
    //justifyContent: 'center',
  },
  cameraIcon: {
    height: 100,
    width: 100
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
    flex: 1,
    paddingTop: 10,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
    marginHorizontal: 20
  },
  textInputWrapper: {
    backgroundColor: "#fff",
    paddingTop: 10,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 5
  },
  textInput: {
    height: 45,
    backgroundColor: "#fff"
  },
  button: {
    paddingVertical: 10,
    //alignItems: 'center',
    //justifyContent: 'center',
    backgroundColor: "#2aaadd"
  }
});

AppRegistry.registerComponent("Login", () => LoginScreen);
