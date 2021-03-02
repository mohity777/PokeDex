import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Platform, UIManager, LayoutAnimation} from 'react-native';
import FastImage from 'react-native-fast-image';
import Shadow from './ShadowBox';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LottieView from 'lottie-react-native';
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {genAction} from '../store/actions';
import {TYPE} from '../utils/strings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DropShadow from 'react-native-drop-shadow';
import Sound from 'react-native-sound';

const Card = ({item, index, favourites,navigation}) => {
  const [animated, setAnimate] = useState(false);
  const dispatch = useDispatch();
  const color = favourites.includes(item.details.id) ? '#F95959' : '#153359';

   if (
     Platform.OS === 'android' &&
     UIManager.setLayoutAnimationEnabledExperimental
   ) {
     UIManager.setLayoutAnimationEnabledExperimental(true);
   }

  const onPress = () => {
    let sound = new Sound(require('../assets/audios/like.wav'), (error) => {
      if (error) {
        console.log('failed to load the sound', error);
      } else {
        sound.play(); 
        startAnimation()
      }
    });
  };

  const startAnimation = async() => {
   let newFavourites = [];
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    if (!favourites.includes(item.details.id)) {
      setAnimate(true);
      newFavourites = [...favourites, item.details.id];
    } else {
      newFavourites = favourites.filter((id) => id != item.details.id);
    }
    await AsyncStorage.setItem('favourites', JSON.stringify(newFavourites));
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    await dispatch(genAction(TYPE.setFavourites, newFavourites));
  }

  const renderRight = () => {
    if (animated)
      return (
        <View style={{height: hp('5.2%'), width: hp('5.2%')}}>
          <LottieView
            loop={false}
            autoPlay={true}
            source={require('../assets/animationJson/heart.json')}
            onAnimationFinish={() => setAnimate(false)}
          />
        </View>
      );
    else
      return (
        <TouchableOpacity onPress={onPress}>
          <Icon
            name="md-heart-sharp"
            style={[styles.icon,{color}]}
          />
        </TouchableOpacity>
      );
  };

  const getId = number => {
    let noOfDigits = number.toString().length;
    switch(noOfDigits){
      case 1 : return `#00${number}`
      case 2: return `#0${number}`
      default: return `#${number}`
    }
  }

  return (
    <DropShadow
      style={[{shadowColor: color},styles.dropShadow]}>
      <Shadow style={[styles.shadow, {borderLeftColor: color}]} onPress={()=>navigation.navigate('Details',{index})}>
        <View style={[styles.cent, {flex: 1}]}>
          <View style={styles.imgWrap}>
            <FastImage
              resizeMode={FastImage.resizeMode.contain}
              source={{
                uri: `https://pokeres.bastionbot.org/images/pokemon/${item.details.id}.png`,
              }}
              style={styles.img}
            />
          </View>
        </View>
        <View
          style={[ styles.cent,styles.txtVw]}>
          <Text style={[styles.text, {color}]}>{item.name}</Text>
          <Text style={styles.id}>{getId(item.details.id)}</Text>
        </View>
        <View style={[styles.cent, {flex: 1}]}>{renderRight()}</View>
      </Shadow>
    </DropShadow>
  );
};

const styles = StyleSheet.create({
  shadow: {
    flex: 1,
    height: hp('14%'),
    flexDirection: 'row',
    marginVertical: hp('1%'),
    alignItems: 'center',
    paddingVertical: 0,
    paddingHorizontal: 0,
    borderLeftWidth: wp('2.5%'),
  },
  img: {
    height: hp('8%'),
    width: hp('8%'),
  },
  imgWrap: {
    height: hp('11%'),
    width: hp('11%'),
    borderRadius: 200,
    borderWidth: 1,
    elevation: 2,
    borderColor: 'rgb(210,210,210)',
    backgroundColor: 'rgb(243,243,243)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Montserrat-Bold',
    textTransform: 'capitalize',
    fontSize: wp('4%'),
  },
  icon: {
    fontSize: wp('7%'),
  },
  dropShadow: {
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
  txtVw: {alignItems: 'flex-start', paddingLeft: wp('5%')},
  id: {
    color: 'rgb(180,180,180)',
    fontFamily: 'Montserrat-SemiBold',
  },
});

export default Card;
