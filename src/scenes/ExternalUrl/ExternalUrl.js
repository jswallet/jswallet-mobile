import React, { Component } from "react";
import { WebView, StatusBar } from "react-native";
import styles from "./styles";
import Loading from "../../components/Loading";
import PropTypes from "prop-types";

class ExternalUrl extends Component {
  constructor(props): void {
    super(props);
    StatusBar.setHidden(true);
    this.state = {
      uri: props.navigation.state.params.uri
    };
  }

  render = function() {
    if (this.state.uri) {
      return <WebView source={{ uri: this.state.uri }} scrollEnabled={true} />;
    } else {
      return <Loading />;
    }
  };
}

ExternalUrl.propTypes = {
  navigation: PropTypes.object
};

export default ExternalUrl;
