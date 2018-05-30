import * as React from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  RefreshControl
} from "react-native";
import { TabViewAnimated, TabBar, SceneMap } from "react-native-tab-view";
import { StackNavigator } from "react-navigation";
import SInfo from "react-native-sensitive-info";

import CardView from "react-native-cardview";

import { parseDate } from "./utility/Utility";

export default function SetInProgressReportDetails({ state, context, style }) {
  function _onRefresh() { 
    console.debug("_onRefresh()");
    context.refresh(0);
  }  
  function _onItemSelect(complaintNo) { 
    console.debug("_onItemSelect(complaintNo)");
    context._onItemSelect(complaintNo);
  }  
 
  function _renderRefreshControl() {
    //console.debug("Refresh...."); 
    return (
      <RefreshControl
        refreshing={state.refreshing}
        onRefresh={_onRefresh}
        title="Loading..."
      />
    );
  }
  return (
    <View style={[styles.container]}>
      <FlatList
        data={state.inProgressList}
        extraData={state}
        refreshControl={_renderRefreshControl()}
        renderItem={({ item }) => (
          <TouchableOpacity
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
            onPress={() => {_onItemSelect(item.id)}}
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
                    {parseDate(item.survey_date)}
                    </Text>
                  </View>
                </View>
              </CardView>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  container: {
    backgroundColor: "rgba(0, 0, 0, .1)",
    borderRadius: 3
  },
  text: {
    color: "#fff",
    textAlign: "center",
    marginVertical: 8,
    marginHorizontal: 16
  },
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
