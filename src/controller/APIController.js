import React, { Component } from "react";
import {
  AppRegistry,
  Platform,
  StyleSheet,
  Text,
  Image,
  View,
  TextInput,
  Button,
  AsyncStorage,
  TouchableOpacity
} from "react-native";

export function getAccessKey() {
  return "accessToken";
}

// export const getResponse = (input)=>{
//     return input;
// }

export async function getResponse(input) {
    await fetch("http://echallanweb.gov.in/api/check-device-status", {
        method: "post",
        header: {
          Accept: "application/json",
          "Content-type": "application/json"
        },
        body: input
      })
        .then(response => response.json())
        .then(responseJson => {
          //console.debug(responseJson);
          if (responseJson.status == 204) {
            //alert("true" + responseJson.status);
            //navigate("Dashboard");
          }
          //alert(responseJson.status);
          //return responseJson.status; 
          setTimeout(() => null, 0);
           return "Hello!";
        })
        .catch(error => {
          console.error(error);
        });
}

export function callPostApi(urlStr, params) {
    return fetch(urlStr, {
            method: "POST", 
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params)
        })
        .then((response) => response.json())
        .then((responseData) => {
            result = JSON.stringify(responseData)
        })
        .catch((error) => { 
            console.error(error);
            Alert.alert('Alert Title failure' + JSON.stringify(error))
        });
}


// callapi() {
//     callPostApi('http://demo.com', {
//             email: 'at@gmail.com',
//             password: '123456',
//         })
//         .then((response) => {
//             // Continue your code here...
//         });
// }
