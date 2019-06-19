/* eslint-disable react/prop-types */
import React from "react";
import { Image } from "react-native";
import { createAppContainer, createStackNavigator } from "react-navigation";

import Home from "../scenes/Home";
import ScanQr from "../scenes/ScanQr";
import ExternalUrl from "../scenes/ExternalUrl";

const MainNavigator = createStackNavigator(
  {
    Home,
    ScanQr,
    ExternalUrl
  },
  {
    defaultNavigationOptions: {
      header: null
    }
  }
);

export const HomeStack = createAppContainer(MainNavigator);
