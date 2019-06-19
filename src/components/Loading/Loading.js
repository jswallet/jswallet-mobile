import React from "react";
import PropTypes from "prop-types";
import { View, Text, ActivityIndicator } from "react-native";
import styles from "./styles";

const Loading = props => {
  return (
    <View style={styles.container}>
      <ActivityIndicator animating size={props.size} {...props} />
    </View>
  );
};

Loading.propTypes = {
  size: PropTypes.string
};

Loading.defaultProps = {
  size: "large"
};

export default Loading;
