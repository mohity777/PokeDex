import React from "react"
import {View, Text, StyleSheet, ScrollView} from "react-native"
import FastImage from "react-native-fast-image"
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen"
import { useSelector } from "react-redux"
import {VictoryAxis, VictoryBar, VictoryChart, VictoryLabel} from "victory-native"
import Shadow from "../components/ShadowBox"

const LabelVal = ({label, val}) => {
    return (
      <View style={{flex:1,alignItems:"flex-start"}}>
        <Text style={{fontFamily: 'Montserrat-Medium', color: 'white'}}>
          {label}
        </Text>
        <Text style={{fontFamily: 'Montserrat-Medium'}}>
          {val}
        </Text>
      </View>
    );
}

const PokemonDetails = ({route,navigation}) => {
   const item = useSelector(state=>state.pokemon.list)[route.params.index]
   const colors = {
     speed: 'rgb(219,40,40)',
     'special-defense': 'rgb(242,113,28)',
     'special-attack': 'rgb(251,189,8)',
     defense: 'rgb(181,204,24)',
     attack: 'rgb(33,186,69)',
     hp: '#01E138',
   };

   const getValue = (array,key) => {
    if(!array || !array.length) return '';
    let value =''
    array.map((item,index)=> {
        value = value + (index ? ', ' : '')  + item[key].name 
    })
    return value
   }
   
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Shadow
          style={{
            width: '100%',
            backgroundColor: '#30a7d7',
            marginHorizontal: wp('1.5%'),
            elevation: 6,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 200,
            marginVertical: wp('1.5'),
          }}>
          <Text
            style={{
              fontFamily: 'Montserrat-SemiBold',
              color: 'white',
              textTransform: 'capitalize',
              fontSize: wp('4.5%'),
            }}>
            {item?.name}
          </Text>
        </Shadow>
        <Shadow
          style={{
            marginHorizontal: wp('2%'),
            elevation: 6,
            borderWidth: 0.5,
            borderColor: 'rgb(230,230,230)',
            padding: wp('2%'),
            marginVertical: wp('1.5'),
          }}>
          <FastImage
            resizeMode={FastImage.resizeMode.contain}
            style={styles.img}
            source={{
              uri: `https://pokeres.bastionbot.org/images/pokemon/${item?.details?.id}.png`,
            }}
          />
        </Shadow>
        <Shadow style={{marginHorizontal: wp('2%'), marginVertical: wp('1.5')}}>
          <VictoryChart
            padding={styles.chart}
            height={hp('30%')}
            width={wp('90%')}>
            <VictoryAxis style={{tickLabels: styles.labels}} />
            <VictoryBar
              horizontal
              animate
              barWidth={wp('5%')}
              data={item?.details?.stats?.map((item) => ({
                y: item?.base_stat,
                x: item?.stat?.name,
                fill: colors[item?.stat?.name],
              }))}
              style={{
                labels: styles.labels,
                data: {fill: ({datum}) => datum.fill},
              }}
              labels={({datum}) => `${datum.y.toFixed(0)}`}
              labelComponent={<VictoryLabel dx={5} />}
              cornerRadius={wp('1%')}
            />
          </VictoryChart>
        </Shadow>
        <Shadow
          style={{
            width: '100%',
            backgroundColor: '#30a7d7',
            marginHorizontal: wp('2%'),
            elevation: 5,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: wp('1.5'),
            }}>
            <LabelVal label={'Height'} val={item?.details?.height} />
            <LabelVal label={'Weight'} val={item?.details?.weight} />
          </View>
          <View style={{marginVertical: hp('1%')}}>
            <LabelVal
              label={'Type'}
              val={getValue(item?.details?.types, 'type')}
            />
          </View>
          <LabelVal
            label={'Abilities'}
            val={getValue(item?.details?.abilities, 'ability')}
          />
          <Shadow
            style={{
              marginHorizontal: wp('2%'),
              elevation: 6,
              borderWidth: 0.5,
              borderColor: 'rgb(230,230,230)',
              padding: 0,
              marginVertical: wp('5'),
            }}>
            <Text
              style={{
                fontFamily: 'Montserrat-SemiBold',
                color: '#30a7d7',
                textAlign: 'center',
                marginTop: hp('1%'),
                fontSize:wp('4%')
              }}>
              Sprites
            </Text>
            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
              }}>
              <FastImage
                style={{height: hp('22%'), width: wp('40%')}}
                source={{
                  uri: `${item?.details?.sprites?.front_shiny}`,
                }}
              />
              <FastImage
                style={{height: hp('22%'), width: wp('40%')}}
                source={{
                  uri: `${item?.details?.sprites?.back_shiny}`,
                }}
              />
            </View>
          </Shadow>
        </Shadow>
      </ScrollView>
    );
}

const styles = StyleSheet.create({
  container:{flexGrow: 1, alignItems: 'center',paddingVertical:hp('1%'),marginHorizontal:wp('2%')},
  labels: {
    fontFamily: 'Montserrat-Medium',
    fontSize: wp('3.2%'),
    color: '#153359',
  },
  chart: {
    left: wp('30%'),
    top: hp('1.5%'),
    bottom: hp('1.5%'),
    right: wp('7%'),
  },
  img: {
      height:hp('40%'),
      width:wp('90%'),
  }
});

export default PokemonDetails;