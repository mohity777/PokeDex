import React from "react"
import LottieView from 'lottie-react-native';
import { StyleSheet, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";


const Footer = props => {
    return (
      <View style={styles.view}>
        <LottieView
          autoPlay={true}
          source={require('../assets/animationJson/loader.json')}
        />
      </View>
    );
}

const styles = StyleSheet.create({
  view: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height:hp('3.5%'),
    backgroundColor:"rgba(0,0,0,0.6)",
    marginTop:hp('1.5%')
  },
});

export default Footer;