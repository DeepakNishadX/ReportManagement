/* @flow */

import * as React from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Dimensions,
  TouchableOpacity,
  ToastAndroid,
  ActivityIndicator,
  AppRegistry
} from "react-native";
import { TabViewAnimated, TabBar, SceneMap } from "react-native-tab-view";

import { StackNavigator } from "react-navigation";
import SInfo from "react-native-sensitive-info";
import CardView from "react-native-cardview";
import InProgressTab from "./InProgressTab";
import DoneTab from "./DoneTab";

//import type { Route, NavigationState } from "react-native-tab-view/types";

// type State = NavigationState<
//   Route<{
//     key: string,
//     title: string
//   }>
// >;

const initialLayout = {
  height: 0,
  width: Dimensions.get("window").width
};

export default class OffenceListDetails extends React.Component {
  static title = "Offence List";
  static appbarElevation = 0;

  static navigationOptions = {
    //header: null,
    title: "Offence List",
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

  constructor(props) {
    super(props);

    this.state = {
      index: 0,
      routes: [{ key: "1", title: "In Progress" }, { key: "2", title: "Done" }],
      token: "",
      loading: false,
      inProgressTempList: [],
      doneTempList: [],
      inProgressList: [],
      doneList: [],
      page: 1,
      error: null,
      refreshing: false
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
    setTimeout(() => {
      this.getComplaintList(0);
      this.getComplaintList(1);
    }, 1500);
  }

  getComplaintList = status => {
    const { token } = this.state;
    const url = "http://59.179.21.217/trafficmitra/api/complaint-list";
    this.setState({ loading: true });
    console.debug(token);

    var input = new FormData();
    input.append("token", token);
    input.append("pg", "0");
    input.append("status", status);
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
        console.debug(responseJSON);
        if (responseJSON.status == 1) {
          //console.debug(responseJSON.data);
          this.setState({
            //data: page === 1 ? responseJSON.data : [...this.state.inProgressList, ...responseJSON.data], // Unnecessary
            error: responseJSON.error || null,
            loading: false,
            refreshing: false
          });
          // Add status check for API

          if (status == 0) {
            this.setState({ inProgressTempList: responseJSON.data });
            console.debug("inProgressList testing.....");
            //console.debug(this.state.inProgressTempList);
          } else if (status == 1) {
            this.setState({ doneTempList: responseJSON.data });
            console.debug("doneList testing.....");
            //console.debug(this.state.doneTempList);
          }
          this._updateInProgressList(status);
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

  _updateInProgressList = status => {
    if (status == 0) {
      let inProgressTempList = [...this.state.inProgressTempList];
      for (let i in inProgressTempList) {
        inProgressTempList[i].key =
          "Report No. :" + `${inProgressTempList[i].id}`;
      }
      this.setState({ inProgressTempList });
      this.setState({ inProgressList: inProgressTempList });
      console.debug(this.state.inProgressTempList);
    } else if (status == 1) {
      let doneTempList = [...this.state.doneTempList];
      for (let i in doneTempList) {
        doneTempList[i].key = "Report No. :" + `${doneTempList[i].id}`;
      }
      this.setState({ doneTempList });
      console.debug(this.state.doneTempList);
      this.setState({ doneList: doneTempList });
    }
  };

  refresh(status) {
    //console.debug("TestCall()");
    this.getComplaintList(status);
  }

  _onItemSelect(complaintNo) {
    console.debug(complaintNo);
    //ToastAndroid.show("Complaint No : " + complaintNo, ToastAndroid.SHORT);
    this.props.navigation.navigate("OffenceDetails", { complaintNo });
  }

  // state = {
  //   index: 0,
  //   routes: [
  //     { key: "1", title: "In Progress" },
  //     { key: "2", title: "Done" }
  //   ],
  //   tempList: [],
  //   data: []
  // };

  _handleIndexChange = index =>
    this.setState({
      index
    });

  _renderHeader = props => (
    // <TabBar
    //   {...props}
    //   scrollEnabled
    //    indicatorStyle={styles.indicator}
    //    //style={styles.tabbar}
    //    tabStyle={styles.tab}
    //    labelStyle={styles.label}
    // />
    <TabBar
      style={{ backgroundColor: "#007FD2" }}
      {...props}
      //scrollEnabled
      indicatorStyle={styles.indicator}
      //style={styles.tabbar}
      tabStyle={styles.tab}
      //labelStyle={styles.label}
    />
  );

  _renderScene = ({ route }) => {
    switch (route.key) {
      case "1":
        return (
          <InProgressTab
            state={this.state}
            context={this}
            style={{ backgroundColor: "#fff" }}
          />
        );
        break;
      case "2":
        return (
          <DoneTab
            state={this.state}
            context={this}
            style={{ backgroundColor: "#fff" }}
          />
        );
        break;
      default:
        return null;
    }
  };

  render() {
    if (this.state.loading) {
      return (
        <View
          style={{
            flex: 1,
            alignContent: "center",
            alignItems: "center",
            marginTop: 100
          }}
        >
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <TabViewAnimated
        style={[styles.container, this.props.style]}
        navigationState={this.state}
        renderScene={this._renderScene}
        renderHeader={this._renderHeader}
        onIndexChange={this._handleIndexChange}
        initialLayout={initialLayout}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  tabbar: {
    backgroundColor: "#222"
  },
  tab: {
    flexDirection: "row"
  },
  indicator: {
    backgroundColor: "#00B1E0",
    height: 5
  },
  label: {
    color: "#fff",
    fontWeight: "400"
  }
});

AppRegistry.registerComponent("OffenceListDetails", () => OffenceListDetails);
