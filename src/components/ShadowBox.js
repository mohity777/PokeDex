import React from 'react';
import {TouchableOpacity, Platform} from 'react-native';
import { widthPercentageToDP } from 'react-native-responsive-screen';

const style = {
  margin: 10,
  borderRadius: widthPercentageToDP('4%'),
  backgroundColor: 'white',
  padding: 10,
  elevation:2
};

export default function Shadow({children, ...props}) {
  return (
    <TouchableOpacity
      disabled={!props.onPress || props.disabled}
      onPress={props.onPress}
      needsOffscreenAlphaCompositing={true}
      style={[style, props.style]}
      onStartShouldSetResponder={props.onStartShouldSetResponder}
      activeOpacity={props.activeOpacity}>
      {children}
    </TouchableOpacity>
  );
}
