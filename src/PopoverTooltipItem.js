// @flow

import type { StyleObj } from "react-native/Libraries/StyleSheet/StyleSheetTypes";

import * as React from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  ViewPropTypes
} from "react-native";
import PropTypes from "prop-types";
import { Icon } from "native-base";
import { strings } from "../../../src/locales/i18n";

export type Label = string | (() => React.Node);
export const labelPropType = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.func
]);

type Props = {
  onPress: (userCallback: () => void) => void,
  onPressUserCallback: () => void,
  label: Label,
  containerStyle: ?StyleObj,
  labelStyle: ?StyleObj
};
class PopoverTooltipItem extends React.PureComponent<Props> {
  static propTypes = {
    onPress: PropTypes.func.isRequired,
    onPressUserCallback: PropTypes.func.isRequired,
    label: labelPropType.isRequired,
    containerStyle: ViewPropTypes.style,
    labelStyle: Text.propTypes.style
  };
  static defaultProps = {
    labelStyle: null,
    containerStyle: null
  };

  render() {
    const label =
      typeof this.props.label === "string" ? (
        <Text allowFontScaling={false} style={this.props.labelStyle}>
          {this.props.label}
        </Text>
      ) : (
        this.props.label()
      );

    if (this.props.label === strings("lang.reply")) {
      return (
        <View style={[styles.itemContainer, this.props.containerStyle]}>
          <View style={{ flexDirection: "row" }}>
            <Icon
              type="Entypo"
              name="reply"
              style={{ fontSize: 16, color: "black", paddingRight: 10 }}
            />
            <TouchableOpacity onPress={this.onPress}>{label}</TouchableOpacity>
          </View>
        </View>
      );
    } else if (this.props.label === strings("lang.copy")) {
      return (
        <View style={[styles.itemContainer, this.props.containerStyle]}>
          <View style={{ flexDirection: "row" }}>
            <Icon
              type="FontAwesome5"
              name="copy"
              style={{ fontSize: 16, color: "black", paddingRight: 10 }}
            />
            <TouchableOpacity onPress={this.onPress}>{label}</TouchableOpacity>
          </View>
        </View>
      );
    } else if (this.props.label === strings("lang.del")) {
      return (
        <View style={[styles.itemContainer, this.props.containerStyle]}>
          <View style={{ flexDirection: "row" }}>
            <Icon
              type="FontAwesome5"
              name="trash"
              style={{ fontSize: 16, color: "black", paddingRight: 10 }}
            />
            <TouchableOpacity onPress={this.onPress}>{label}</TouchableOpacity>
          </View>
        </View>
      );
    } else {
      return (
        <View style={[styles.itemContainer, this.props.containerStyle]}>
          <TouchableOpacity onPress={this.onPress}>{label}</TouchableOpacity>
        </View>
      );
    }
  }

  onPress = () => {
    this.props.onPress(this.props.onPressUserCallback);
  };
}

const styles = StyleSheet.create({
  itemContainer: {
    padding: 10
  }
});

export default PopoverTooltipItem;
