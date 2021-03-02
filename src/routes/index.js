import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import PokemonDetails from '../containers/PokemonDetails';
import PokemonList from '../containers/PokemonList';
import {NavigationContainer} from '@react-navigation/native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
import { StyleSheet, Text, View } from 'react-native';
import LottieView from 'lottie-react-native';

const Stack = createStackNavigator();

const Header = props => {
  return (
    <View
      style={styles.header}>
      <View style={{height: hp('12%'), width: wp('15%')}}>
        <LottieView
          autoPlay={true}
          loop={true}
          source={require('../assets/animationJson/pokemon.json')}
        />
      </View>
      <Text style={[styles.title,{fontSize:wp('4.7%')}]}>
        PokeDex
      </Text>
    </View>
  );
}

function AppContainer() {

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerTitleStyle:styles.title,headerTitleAlign:"center"}}>
        <Stack.Screen name="List" component={PokemonList} options={{header:()=><Header/>}} />
        <Stack.Screen name="Details" component={PokemonDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  title: {
    color: '#153359',
    fontFamily: 'Montserrat-Bold',
    fontSize: wp('4.5%'),
  },
  header: {
    height: hp('7%'),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});

export default AppContainer;
