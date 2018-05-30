/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  Image,
  View,
  TextInput,
  ScrollView,
  Icon,
  TouchableOpacity,
  AppRegistry
} from "react-native";

import { StackNavigator } from "react-navigation";
import SInfo from "react-native-sensitive-info";
import Camera from "react-native-camera";
import CardView from "react-native-cardview";
import MultiSelect from "react-native-multiple-select";
import DateTimePicker from "react-native-modal-datetime-picker";

import { parseDate, parseTime } from "./utility/Utility";

import moment from "moment";

//import styles from "./styles/app.style";

export default class SubmitReport extends Component {
  static navigationOptions = {
    //header: null,
    title: "Report Offence",
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

  constructor() {
    super();

    this.state = {
      imagePath: "",
      videoPath: "",
      DATE_PICKER: "date",
      TIME_PICKER: "time",
      DATE_TIME_PICKER: "datetime",
      cameraIconUri: require("../images/camera1.png"),
      videoIconUri: require("../images/video1.png"),
      isCameraCapture: true,
      selectedItems: [],
      items: [],
      isDatePickerVisible: false,
      isTimePickerVisible: false,
      reportDetails: {
        imagePath: "",
        videoPath: "",
        selectedItems: [],
        items: [],
        lat: "",
        lng: "",
        vehicleNo: "",
        offenceLocation: "",
        date: "",
        time: "",
        comment: ""
      }
    };
  }

  componentDidMount() {
    //this.saveImageState();
    this._handleTimePicked();
    setTimeout(() => {
      this._handleDatePicked();
      this.getOffenceList();
    }, 500);
  }

  getOffenceList = () => {
    const url = "http://59.179.21.217/trafficmitra/api/offences";
    this.setState({ loading: true });

    fetch(url, {
      method: "GET",
      header: {
        Accept: "application/json"
        //"Content-type": "multipart/form-data"
      } //,
      // body: input
    })
      .then(response => response.json())
      .then(responseJSON => {
        //console.debug(responseJSON);
        if (responseJSON.status == 1) {
          let result = responseJSON.offence;

          this.setState({ items: result });
          console.debug(this.state.items);
        } else if (responseJSON.status == 0) {
          //alert(responseJSON.message);
        } else {
          alert("Server Not Responding!");
        }
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
  };

  // Handle Camera Callback
  handleOnCameraCallback = cameraResponse => {
    console.log("handleOnCameraCallback......");

    if (cameraResponse.isCameraCapture) {
      console.debug("Image Path......");
      //this.setState({ ImagePath: cameraResponse.path });

      this.setState({
        reportDetails: {
          ...this.state.reportDetails,
          ImagePath: cameraResponse.path
        }
      });

      this.setState({
        cameraIconUri: require("../images/ic_camera_fill.png")
      });
      console.log(this.state.ImagePath);
    } else {
      console.debug("Video Path......");
      //this.setState({ VideoPath: cameraResponse.path });

      this.setState({
        reportDetails: {
          ...this.state.reportDetails,
          VideoPath: cameraResponse.path
        }
      });

      this.setState({ videoIconUri: require("../images/ic_video_fill.png") });
      console.log(this.state.VideoPath);
    }
  };

  saveImageState = () => {
    console.log("Callback from Camera-----------------------------");
    var cameraResponse;
    try {
      cameraResponse = this.props.navigation.state.params.cameraData;
      console.log(cameraResponse);
      console.log("TEST START.........");
      console.log(cameraResponse.path);
      console.log(cameraResponse.isCameraCapture);
      console.log("TEST END.........");
      //const { isCameraCapture } = this.state;
      //console.debug("Camera Status: "+isCameraCapture);
      if (cameraResponse.isCameraCapture) {
        console.debug("Image Path......");
        this.setState({ ImagePath: cameraResponse.path });
        this.setState({
          cameraIconUri: require("../images/ic_camera_fill.png")
        });
        console.log(this.state.ImagePath);
      } else {
        console.debug("Video Path......");
        this.setState({ VideoPath: cameraResponse.path });
        this.setState({ videoIconUri: require("../images/ic_video_fill.png") });
        console.log(this.state.VideoPath);
      }
    } catch (error) {
      console.log(error);
      cameraResponse = null;

      this.setState({ cameraIconUri: require("../images/camera1.png") });
      this.setState({ videoIconUri: require("../images/video1.png") });
    }
  };

  takePicture = () => {
    // var cameraStatus = true;
    // this.setState({ isCameraCapture: cameraStatus });
    // this.props.navigation.navigate("Camera", { cameraStatus });

    this.props.navigation.navigate("Camera", {
      onNavigateBack: this.handleOnCameraCallback,
      cameraStatus: true
    });
  };
  takeVideo = () => {
    // var cameraStatus = false;
    // this.setState({ isCameraCapture: cameraStatus });
    // this.props.navigation.navigate("Camera", { cameraStatus });
    this.props.navigation.navigate("Camera", {
      onNavigateBack: this.handleOnCameraCallback,
      cameraStatus: false
    });
  };

  _onPress() {
    Alert.alert("on Press!");
  }

  onSelectedItemsChange = selectedItems => {
    this.setState({ selectedItems });
  };

  // DateTimePicker
  _showDatePicker = () => this.setState({ isDatePickerVisible: true });

  _hideDatePicker = () => this.setState({ isDatePickerVisible: false });

  _showTimePicker = () => this.setState({ isTimePickerVisible: true });

  _hideTimePicker = () => this.setState({ isTimePickerVisible: false });

  _handleDatePicked = pickedDate => {
    console.log(
      "A date has been picked: ",
      parseDate(pickedDate, "DD-MM-YYYY")
    );
    this.setState({
      reportDetails: {
        ...this.state.reportDetails,
        date: parseDate(pickedDate, "DD/MM/YYYY")
      }
    });
    this._hideDatePicker();
  };
  _handleTimePicked = pickedDate => {
    console.log("A date has been picked: ", pickedDate);
    console.log("A date has been picked: ", parseTime(pickedDate, "hh:mm:ss"));
    this.setState({
      reportDetails: {
        ...this.state.reportDetails,
        time: parseTime(pickedDate, "hh:mm A")
      }
    });
    this._hideTimePicker();
  };

  render() {
    const { selectedItems } = this.state;
    console.debug(selectedItems);
    var data;
    if (selectedItems && selectedItems.length > 0) {
      console.debug("testing......");
      data = this.multiSelect.getSelectedItemsExt(selectedItems);
    }

    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
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
                    marginTop: 130,
                    alignItems: "center"
                  }}
                >
                  <TouchableOpacity
                    style={styles.touchableView}
                    onPress={this.takePicture.bind(this)}
                  >
                    <Image
                      source={this.state.cameraIconUri}
                      style={{
                        width: 55,
                        height: 61
                      }}
                    />
                  </TouchableOpacity>
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
                    marginTop: 130,
                    alignItems: "center"
                  }}
                >
                  <TouchableOpacity
                    style={styles.touchableView}
                    onPress={this.takeVideo.bind(this)}
                  >
                    <Image
                      source={this.state.videoIconUri}
                      style={{
                        width: 55,
                        height: 61
                      }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </CardView>
            <CardView
              style={{
                paddingLeft: 15,
                paddingRight: 15,
                paddingTop: 15,
                paddingBottom: 15
              }}
              cardElevation={2}
              cardMaxElevation={2}
              cornerRadius={5}
            >
              <MultiSelect
                hideTags
                items={this.state.items}
                uniqueKey="offence_id"
                ref={component => {
                  this.multiSelect = component;
                }}
                onSelectedItemsChange={this.onSelectedItemsChange}
                selectedItems={selectedItems}
                selectText="Select Offences"
                searchInputPlaceholderText="Search Offences..."
                onChangeInput={text => console.log(text)}
                altFontFamily="ProximaNova-Light"
                tagRemoveIconColor="#00A3ED"
                tagBorderColor="#00A3ED"
                tagTextColor="#00A3ED"
                selectedItemTextColor="#00A3ED"
                selectedItemIconColor="#00A3ED"
                itemTextColor="#000"
                displayKey="offence"
                searchInputStyle={{ color: "#CCC" }}
                submitButtonColor="#00A3ED"
                submitButtonText="Submit"
              />
              <View>{data}</View>
            </CardView>
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
                    placeholder="Vehicle Number"
                    style={{
                      flex: 1,
                      fontSize: 16,
                      marginLeft: 10,
                      marginRight: 10,
                      marginTop: 8
                    }}
                    editable={true}
                    maxLength={16}
                    multiline={false}
                    autoCapitalize="characters"
                    value={this.state.reportDetails.vehicleNo}
                    onChangeText={text =>
                      this.setState({
                        reportDetails: {
                          ...this.state.reportDetails,
                          vehicleNo: text
                        }
                      })
                    }
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
                    editable={true}
                    maxLength={250}
                    multiline={true}
                    value={this.state.reportDetails.offenceLocation}
                    onChangeText={text =>
                      this.setState({
                        reportDetails: {
                          ...this.state.reportDetails,
                          offenceLocation: text
                        }
                      })
                    }
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
                    <TouchableOpacity
                      onPress={this._showTimePicker}
                      style={{ flex: 1 }}
                    >
                      <TextInput
                        editable={false}
                        selectTextOnFocus={false}
                        placeholder="Time"
                        style={{ fontSize: 16 }}
                        value={this.state.reportDetails.time}
                        onChangeText={text =>
                          this.setState({
                            reportDetails: {
                              ...this.state.reportDetails,
                              time: text
                            }
                          })
                        }
                      />
                    </TouchableOpacity>
                    <DateTimePicker 
                      mode={this.state.TIME_PICKER}
                      isVisible={this.state.isTimePickerVisible}
                      onConfirm={this._handleTimePicked}
                      is24Hour={false}
                      onCancel={this._hideTimePicker}
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
                    <TouchableOpacity
                      onPress={this._showDatePicker}
                      style={{ flex: 1 }}
                    >
                      <TextInput
                        editable={false}
                        selectTextOnFocus={false}
                        placeholder="Date"
                        style={{ fontSize: 16 }}
                        value={this.state.reportDetails.date}
                        onChangeText={text =>
                          this.setState({
                            reportDetails: {
                              ...this.state.reportDetails,
                              date: text
                            }
                          })
                        }
                      />
                    </TouchableOpacity>
                    <DateTimePicker
                    isVisible={this.state.isDatePickerVisible}
                    onConfirm={this._handleDatePicked}
                    mode={this.state.DATE_PICKER}
                    onCancel={this._hideDatePicker}
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
                    value={this.state.reportDetails.comment}
                    editable={true}
                    maxLength={500}
                    multiline={true}
                    onChangeText={text =>
                      this.setState({
                        reportDetails: {
                          ...this.state.reportDetails,
                          comment: text
                        }
                      })
                    }
                  />
                </View>
              </View>
            </CardView>
          </ScrollView>
        </View>

        <View
          style={{
            flex: 0.5,
            flexDirection: "row",
            backgroundColor: "#00A3ED",
            alignItems: "center"
          }}
        >
          <Text style={styles.headerText2}>Send</Text>
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
  },
  touchableView: {
    //borderWidth: 1,
    //borderColor: "rgba(0,0,0,0.2)",
    alignItems: "center",
    justifyContent: "center",
    //width: 100,
    //height: 100,
    // backgroundColor: "#fff",
    borderRadius: 100
  }
});

AppRegistry.registerComponent("SubmitReport", () => SubmitReport);
