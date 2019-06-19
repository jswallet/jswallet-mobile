import React, { Component } from "react";
import { StatusBar, SafeAreaView } from "react-native";
import styles from "./styles";
import Loading from "../../components/Loading";
import PropTypes from "prop-types";
import { WebView } from "react-native-webview";

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
      return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#212121'}}>
          <WebView source={{ uri: this.state.uri }} scrollEnabled={true} />
        </SafeAreaView>)
    } else {
      return <Loading />;
    }
  };
}

ExternalUrl.propTypes = {
  navigation: PropTypes.object
};

export default ExternalUrl;
