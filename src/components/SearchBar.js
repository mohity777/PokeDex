import React from "react"
import { TextInput, View } from "react-native"
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen"
import Icon from "react-native-vector-icons/Ionicons"

const SearchBar = props => {
    return(
        <View style={{height:hp('5.5%'), borderWidth:0.5, borderColor:"rgb(200,200,200)",width:"94%",alignSelf:"center",backgroundColor:"rgb(250,250,250)", borderRadius:wp('100%'),marginBottom:hp('0.8%'),flexDirection:"row",alignItems:"center",paddingHorizontal:wp('2.5%')}}>
            <Icon name="search" style={{color:"grey", fontSize:wp('6%')}}/>
            <TextInput onChangeText={props.onChangeText} value={props.value} style={{flex:1,padding:0,height:"100%",paddingHorizontal:wp('1.5%')}}/>
        </View>
    )
}

export default SearchBar;