import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { TYPE } from "../utils/strings"

export const genAction = (type,payload) => ({ type, payload});

export const getList = (offset) => async (dispatch,getState) => {
    try{
      const result = await axios.get('https://pokeapi.co/api/v2/pokemon',{params:{offset,limit:10}});
      console.log(result)
      let list = await Promise.all( result.data?.results?.map(async (item,index)=>{
         const res = await axios.get(item.url)
         return {
           name: item.name,
           details : res.data,
         }
      }))
      console.log(list)
      dispatch(genAction(TYPE.setList,[...getState().pokemon.list,...list]))
      dispatch(genAction(TYPE.setTotalCount, result.data?.count))
    }catch(error){
      console.log(error)
      throw error;
    }
}

export const getFavourites = ()  => async dispatch => {
  try{
      const favourites = await AsyncStorage.getItem('favourites');
      dispatch(genAction(TYPE.setFavourites,JSON.parse(favourites)))
  }catch(error){
    throw error
  }
}