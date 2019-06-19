import React from "react";
import PropTypes from "prop-types";
import { Text, TouchableOpacity } from "react-native";
import styles from "./styles";

const Button = props => {
  const { text, onPress, style } = props;
  return (
    <TouchableOpacity style={[style, styles.button]} onPress={onPress}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

Button.propTypes = {
  text: PropTypes.string,
  onPress: PropTypes.func
};

Button.defaultProps = {
  text: "Button Text",
  onPress: () => console.log("Button Pressed")
};

export default Button;
