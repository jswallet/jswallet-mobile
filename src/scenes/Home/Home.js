import React, { Component } from "react";
import { View, StatusBar, Text, Linking, Platform } from "react-native";
import styles from "./styles";
import QRCodeScanner from "react-native-qrcode-scanner";
import Button from "../../components/Button";
import Loading from "../../components/Loading";
import Toast from "react-native-simple-toast";
import PropTypes from "prop-types";
import { WebView } from "react-native-webview";
import AsyncStorage from "@react-native-community/async-storage";
import { SafeAreaView } from 'react-native';

class Home extends Component {
  constructor(props): void {
    StatusBar.setHidden(true);

    super();
    this.state = {
      isLoading: true,
      hash: ""
    };

    this.loadHash();
  }

  onMessage = (message) => {
    var data = JSON.parse(message.nativeEvent.data);

    switch (data.method) {
      case "startQr":
        this.startQr();
        break;
      case "saveHash":
        this.saveHash(data.hash);
        break;
      case "showToast":
        this.showToast(data.text);
        break;
      case "goToUrl":
        this.goExternalUrl(data.url);
        break;
    }
  };

  saveHash = async (hash) => {
    try {
      await AsyncStorage.setItem("@JSWallet:hash", hash);
    } catch (error) {
      console.log(hash);
    }
  };

  startQr = () => {
    this.props.navigation.navigate("ScanQr", {
      qrCodeResult: this.qrCodeResult
    });
  };

  showToast = (text) => {
    Toast.show(text, Toast.SHORT);
  };

  goExternalUrl = (uri) => {
    this.props.navigation.navigate("ExternalUrl", { uri: uri });
  };

  qrCodeResult = (qrResult) => {
    var data = JSON.stringify({ method: "setQr", qrResult: qrResult });
    this.webview.postMessage(data);
    Toast.show("Scanned: " + qrResult, Toast.SHORT);
  }

  loadHash = async () => {
    try {
      const hash = await AsyncStorage.getItem("@JSWallet:hash");

      this.setState({
        isLoading: false,
        hash
      });
    } catch (error) {
      this.showToast("Error while loading data");
    }
  };

  getRef = ref => {
    this.webview = ref;
  }

  getInjection = () => {
    const { hash } = this.state;

    let injectedJavaScript = "";

    if(hash) {
      injectedJavaScript += `window.location.hash="${hash}";`
    }

    injectedJavaScript += `init();`

    return injectedJavaScript;
  }

  onShouldStartLoadWithRequest = (request) => {
    const { url } = request;

    if(url.indexOf('file://') === 0) {
      return true;
    }

    this.goExternalUrl(url);
    return false;
  }

  getIndexFile = () => {
    if (Platform.OS === "android") {
      return { uri: "file:///android_asset/Web.bundle/index.html" };
    }

    return { uri: "Web.bundle/index.html" };
  }

  onError = () => {
    console.log('error')
  }

  render() {
    const { isLoading } = this.state;

    if (isLoading) {
      return <Loading />;
    } else {
      return (
        <>
        <SafeAreaView style={{ flex: 0, backgroundColor: '#05343e' }} />
        <SafeAreaView style={{flex: 1, backgroundColor: '#252525'}}>
          <WebView
            style={styles.container}
            ref={this.getRef}
            injectedJavaScript={this.getInjection()}
            source={this.getIndexFile()}
            onMessage={this.onMessage}
            onError={this.onError}
            scrollEnabled={false}
            javaScriptEnabled
            originWhitelist={['*']}
            allowFileAccess
            useWebKit
            onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest}
          />
        </SafeAreaView>
        </>
      );
    }
  };
}

Home.propTypes = {
  navigation: PropTypes.object
};

export default Home;
