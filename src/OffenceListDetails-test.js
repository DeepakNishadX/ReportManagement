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
  FlatList,
  TouchableHighlight,
  RefreshControl
} from "react-native"; 
import { TabViewAnimated, TabBar, SceneMap} from "react-native-tab-view";
import { StackNavigator } from "react-navigation";
import SInfo from "react-native-sensitive-info";

import CardView from "react-native-cardview";

export default class OffenceListDetails extends Component {
  static navigationOptions = {
    header: null,
    title: "Offence List"
  };

  constructor(props) {
    super(props);

    this.state = {
      index: 0,
      routes: [
        { key: "first", title: "In Progress" },
        { key: "second", title: "Done" }
      ],
      token: "",
      loading: false,
      tempList: [],
      inProgressList: [],
      doneList: [],
      data: [
        // {
        //   key: "Report No. :87",
        //   rcNo: "UP53BM0816",
        //   address: "E29, Sector 11, Noida, UP",
        //   comment: "Without Seat Belt",
        //   date: "16/12/2018"
        // },
        // {
        //   key: "Report No. :12",
        //   rcNo: "UP53BM0832",
        //   address: "A22, Sector 22, Noida, UP",
        //   comment: "Without Helmet",
        //   date: "20/01/2018"
        // },
        // {
        //   key: "Report No. :21",
        //   rcNo: "UP53BM0856",
        //   address: "E29, Sector 11, Noida, UP",
        //   comment: "Overloading",
        //   date: "01/02/2018"
        // },
        // {
        //   key: "Report No. :55",
        //   rcNo: "UP53BM0899",
        //   address: "H.No 122, 1st Floor, Maharani Bagh, New Delhi",
        //   comment: "Improper Parking",
        //   date: "02/02/2018"
        // },
        // {
        //   key: "Report No. :58",
        //   rcNo: "UP53BM0844",
        //   address: "H.No 122, 1st Floor, Maharani Bagh, New Delhi",
        //   comment: "Red light Jump",
        //   date: "20/02/2018"
        // }
      ],
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
      this.getComplaintList();
    }, 1500);
  }

  // componentDidMount() {
  //   this.getComplaintList();
  // }

  getComplaintList = () => {
    const { token } = this.state;
    const url = "http://59.179.21.217/trafficmitra/api/complaint-list";
    this.setState({ loading: true });
    console.debug(token);

    var input = new FormData();
    input.append("token", token);
    input.append("pg", "1");
    input.append("status", "0");
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
        //console.debug(responseJSON.data);
        this.setState({
          //data: page === 1 ? responseJSON.data : [...this.state.inProgressList, ...responseJSON.data], // Unnecessary
          error: responseJSON.error || null,
          loading: false,
          refreshing: false
        });

        this.setState({ tempList: responseJSON.data });
        console.debug("inProgressList testing.....");
        console.debug(this.state.tempList);
        this._updateInProgressList();
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
  };

  _updateInProgressList = () => {
    let tempList = [...this.state.tempList];
    console.debug("tempList[0] testing.....");
    console.debug(tempList);

    for (let i in tempList) {
      tempList[i].key = "Report No. :#" + `${tempList[0].id}`;
      break;
    }

    this.setState({ tempList });
    console.debug("tempList[0] testing 1.....");
    console.debug(this.state.tempList);
    this.setState({ inProgressList: tempList });
    console.debug("inProgressList[0] testing 1.....");
    console.debug(this.state.inProgressList);
  };

  initialLayout = {
    height: 0,
    width: Dimensions.get("window").width
  };

  _renderRefreshControl() {
    return (
      <RefreshControl
        refreshing={this.state.refreshing}
        onRefresh={this._onRefresh}
        title="Loading..."
      />
    );
  };

  FirstRoute = () => ( 
    <View style={[styles.container]}>
      <FlatList
        data={this.state.inProgressList}
        extraData={this.state}
        refreshControl={this._renderRefreshControl()}
        renderItem={({ item }) => (
          <TouchableHighlight
            style={{
              //borderWidth: 0,
              //borderColor: "rgba(0,0,0,0.2)",
              //alignItems: "center",
              //justifyContent: "center",
              //width: 100,
              //height: 100,
              backgroundColor: "#fff"
              //borderRadius: 100
            }}
            onPress={() => console.debug("Item Pressed")}
          >
            <View>
              <CardView
                style={{ height: 185 }}
                cardElevation={2}
                cardMaxElevation={2}
                cornerRadius={5}
              >
                <View style={{ flex: 1 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      height: 30,
                      marginTop: 10
                    }}
                  >
                    <View style={{ flex: 0.01, backgroundColor: "#007FD2" }} />
                    <Text style={styles.item}>{item.key}</Text>
                  </View>
                  <Text
                    style={{
                      color: "black",
                      fontSize: 16,
                      fontWeight: "bold",
                      marginLeft: 15,
                      marginTop: 10
                    }}
                  >
                    {item.rc_number}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      marginLeft: 15,
                      marginTop: 10,
                      marginRight: 25
                    }}
                  >
                    <Text style={{ fontSize: 14, color: "black" }}>
                      Address:
                    </Text>
                    <Text style={{ fontSize: 14, marginLeft: 5 }}>
                      {item.address}
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
                    <Text
                      style={{
                        fontSize: 14,
                        color: "red",
                        fontWeight: "bold"
                      }}
                    >
                      Comment:
                    </Text>
                    <Text style={{ fontSize: 14, marginLeft: 5 }}>
                      {item.comment}
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
                    <Text style={{ fontSize: 14 }}>Date: </Text>
                    <Text style={{ fontSize: 14, marginLeft: 5 }}>
                      {item.survey_date}
                    </Text>
                  </View>
                </View>
              </CardView>
            </View>
          </TouchableHighlight>
        )}
      />
    </View>
  );

  SecondRoute = () => (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <Image
        source={require("../images/warning.png")}
        style={styles.ImageStyle}
      />
      <Text style={{ fontSize: 18, marginTop: 10 }}>No Data Found !</Text>
    </View>
  );

  //////////////////

  // state = {
  //   index: 0,
  //   routes: [
  //     { key: "first", title: "In Progress" },
  //     { key: "second", title: "Done" }
  //   ],
  //   listData: [
  //     {
  //       key: "Report No. :87",
  //       rcNo: "UP53BM0816",
  //       address: "E29, Sector 11, Noida, UP",
  //       comment: "Without Seatbelt",
  //       date: "16/12/2018"
  //     }]
  // };
  _handleIndexChange = index => this.setState({ index });

  _renderHeader = props => (
    <TabBar style={{ backgroundColor: "#007FD2" }} {...props} />
  );

  _renderScene = SceneMap({
    first: this.FirstRoute,
    second: this.SecondRoute
  });

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <View
          style={{
            flex: 0.5,
            flexDirection: "row",
            backgroundColor: "#007FD2",
            alignItems: "center"
          }}
        >
          <Image
            source={require("../images/back_left.png")}
            style={styles.back}
          />
          <Text style={styles.headerText}>Offence List</Text>
        </View>
        <View style={styles.logoContainer}>
          <TabViewAnimated
            style={styles.container}
            navigationState={this.state}
            renderScene={this._renderScene}
            renderHeader={this._renderHeader}
            onIndexChange={this._handleIndexChange}
            initialLayout={this.initialLayout}
          />
        </View>
      </View>
      // <View style={[styles.container]}>
      //   <FlatList
      //     data={this.state.inProgressList}
      //     extraData={this.state}
      //     renderItem={({ item }) => (
      //       <TouchableHighlight
      //         style={{
      //           //borderWidth: 0,
      //           //borderColor: "rgba(0,0,0,0.2)",
      //           //alignItems: "center",
      //           //justifyContent: "center",
      //           //width: 100,
      //           //height: 100,
      //           backgroundColor: "#fff"
      //           //borderRadius: 100
      //         }}
      //         onPress={() => console.debug("Item Pressed")}
      //       >
      //         <View>
      //           <CardView
      //             style={{ height: 185 }}
      //             cardElevation={2}
      //             cardMaxElevation={2}
      //             cornerRadius={5}
      //           >
      //             <View style={{ flex: 1 }}>
      //               <View
      //                 style={{
      //                   flexDirection: "row",
      //                   height: 30,
      //                   marginTop: 10
      //                 }}
      //               >
      //                 <View
      //                   style={{ flex: 0.01, backgroundColor: "#007FD2" }}
      //                 />
      //                 <Text style={styles.item}>{item.key}</Text>
      //               </View>
      //               <Text
      //                 style={{
      //                   color: "black",
      //                   fontSize: 16,
      //                   fontWeight: "bold",
      //                   marginLeft: 15,
      //                   marginTop: 10
      //                 }}
      //               >
      //                 {item.rc_number}
      //               </Text>
      //               <View
      //                 style={{
      //                   flexDirection: "row",
      //                   marginLeft: 15,
      //                   marginTop: 10,
      //                   marginRight: 25
      //                 }}
      //               >
      //                 <Text style={{ fontSize: 14, color: "black" }}>
      //                   Address:
      //                 </Text>
      //                 <Text style={{ fontSize: 14, marginLeft: 5 }}>
      //                   {item.address}
      //                 </Text>
      //               </View>
      //               <View
      //                 style={{
      //                   flexDirection: "row",
      //                   marginLeft: 15,
      //                   marginTop: 10,
      //                   marginRight: 25
      //                 }}
      //               >
      //                 <Text
      //                   style={{
      //                     fontSize: 14,
      //                     color: "red",
      //                     fontWeight: "bold"
      //                   }}
      //                 >
      //                   Comment:
      //                 </Text>
      //                 <Text style={{ fontSize: 14, marginLeft: 5 }}>
      //                   {item.comment}
      //                 </Text>
      //               </View>
      //               <View
      //                 style={{
      //                   flexDirection: "row",
      //                   marginLeft: 15,
      //                   marginTop: 10,
      //                   marginRight: 25
      //                 }}
      //               >
      //                 <Text style={{ fontSize: 14 }}>Date: </Text>
      //                 <Text style={{ fontSize: 14, marginLeft: 5 }}>
      //                   {item.survey_date}
      //                 </Text>
      //               </View>
      //             </View>
      //           </CardView>
      //         </View>
      //       </TouchableHighlight>
      //     )}
      //   />
      // </View>
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
    height: 45,
    width: 45,
    marginTop: 7
  },
  container: {
    flex: 1
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
  }
});

AppRegistry.registerComponent("OffenceListDetails", () => OffenceListDetails);
