import React from "react";
import {
  AppRegistry,
  Image,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View
} from "react-native";
import { StackNavigator } from "react-navigation";
import Camera from "react-native-camera";
import CompressImage from 'react-native-compress-image';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  preview: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  overlay: {
    position: "absolute",
    padding: 16,
    right: 0,
    left: 0,
    alignItems: "center"
  },
  topOverlay: {
    top: 0,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  bottomOverlay: {
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.4)",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  captureButton: {
    padding: 15,
    backgroundColor: "white",
    borderRadius: 40
  },
  typeButton: {
    padding: 5
  },
  flashButton: {
    padding: 5
  },
  buttonsSpace: {
    width: 10
  }
});

export default class CameraScreen extends React.Component {
  static navigationOptions = {
    header: null,
    title: "Camera"
  };
  constructor(props) {
    super(props);

    this.camera = null;

    this.state = {
      camera: {
        aspect: Camera.constants.Aspect.fill,
        captureTarget: Camera.constants.CaptureTarget.cameraRoll,
        type: Camera.constants.Type.back,
        orientation: Camera.constants.Orientation.auto,
        flashMode: Camera.constants.FlashMode.auto
      },
      path: null,
      isRecording: false
    };
  }

  takePicture = () => {
    if (this.camera) {
      this.camera
        .capture()
        .then(data => {
          console.log(data);
          console.log(data.path);
          CompressImage.createCustomCompressedImage(data.path, "Khatara Gadi/images", 640, 480, 80).then((response) => {
            // response.uri is the URI of the new image that can now be displayed, uploaded...
            // response.path is the path of the new image
            // response.name is the name of the new image with the extension
            // response.size is the size of the new image
            this.setState({ path: response.path })
            console.log(response);
            console.log( this.state.path);
            setTimeout(() => { 
              //console.log("PATH", "PATH: " + this.state.path);
              this.props.navigation.navigate("Login", {response});
               //this.backStock();
              }, 800);
          }).catch((err) => { 
            // Oops, something went wrong. Check that the filename is correct and
            // inspect err to get more details.
          }); 
        })
        .catch(err => console.error(err));
    }
  };

  backStock() {
    this.props.navigation.state.params.callback(this.state.path);
    this.props.navigation.goBack();
  }

  startRecording = () => {
    if (this.camera) {
      this.camera
        .capture({ mode: Camera.constants.CaptureMode.video })
        .then(data => console.log(data))
        .catch(err => console.error(err));
      this.setState({
        isRecording: true
      });
    }
  };

  stopRecording = () => {
    if (this.camera) {
      this.camera.stopCapture();
      this.setState({
        isRecording: false
      });
    }
  };

  switchType = () => {
    let newType;
    const { back, front } = Camera.constants.Type;

    if (this.state.camera.type === back) {
      newType = front;
    } else if (this.state.camera.type === front) {
      newType = back;
    }

    this.setState({
      camera: {
        ...this.state.camera,
        type: newType
      }
    });
  };

  get typeIcon() {
    let icon;
    const { back, front } = Camera.constants.Type;

    if (this.state.camera.type === back) {
      icon = require("../assets/ic_camera_rear_white.png");
    } else if (this.state.camera.type === front) {
      icon = require("../assets/ic_camera_front_white.png");
    }

    return icon;
  }

  switchFlash = () => {
    let newFlashMode;
    const { auto, on, off } = Camera.constants.FlashMode;

    if (this.state.camera.flashMode === auto) {
      newFlashMode = on;
    } else if (this.state.camera.flashMode === on) {
      newFlashMode = off;
    } else if (this.state.camera.flashMode === off) {
      newFlashMode = auto;
    }

    this.setState({
      camera: {
        ...this.state.camera,
        flashMode: newFlashMode
      }
    });
  };

  get flashIcon() {
    let icon;
    const { auto, on, off } = Camera.constants.FlashMode;

    if (this.state.camera.flashMode === auto) {
      icon = require("../assets/ic_flash_auto_white.png");
    } else if (this.state.camera.flashMode === on) {
      icon = require("../assets/ic_flash_on_white.png");
    } else if (this.state.camera.flashMode === off) {
      icon = require("../assets/ic_flash_off_white.png");
    }

    return icon;
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar animated hidden />
        <Camera
          ref={cam => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={this.state.camera.aspect}
          captureTarget={this.state.camera.captureTarget}
          type={this.state.camera.type}
          flashMode={this.state.camera.flashMode}
          onFocusChanged={() => {}}
          onZoomChanged={() => {}}
          defaultTouchToFocus
          mirrorImage={false}
          cropToPreview={false}
          permissionDialogTitle="Sample title"
          permissionDialogMessage="Sample dialog message"
        />
        <View style={[styles.overlay, styles.topOverlay]}>
          <TouchableOpacity style={styles.typeButton} onPress={this.switchType}>
            <Image source={this.typeIcon} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.flashButton}
            onPress={this.switchFlash}
          >
            <Image source={this.flashIcon} />
          </TouchableOpacity>
        </View>
        <View style={[styles.overlay, styles.bottomOverlay]}>
          {(!this.state.isRecording && (
            <TouchableOpacity
              style={styles.captureButton}
              onPress={this.takePicture}
            >
              <Image source={require("../assets/ic_photo_camera_36pt.png")} />
            </TouchableOpacity>
          )) ||
            null}
          <View style={styles.buttonsSpace} />
          {(!this.state.isRecording && (
            <TouchableOpacity
              style={styles.captureButton}
              onPress={this.startRecording}
            >
              <Image source={require("../assets/ic_videocam_36pt.png")} />
            </TouchableOpacity>
          )) || (
            <TouchableOpacity
              style={styles.captureButton}
              onPress={this.stopRecording}
            >
              <Image source={require("../assets/ic_stop_36pt.png")} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }
}

AppRegistry.registerComponent("Camera", () => CameraScreen);
