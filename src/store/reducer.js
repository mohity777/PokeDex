import { TYPE } from "../utils/strings"

const INITIAL_STATE = {
    totalCount: 0,
    favourites: [],
    list: [],
}

const Reducer = (state = INITIAL_STATE , action) => {
    switch(action.type){
      case TYPE.setList : return {...state, list : action.payload}
      case TYPE.setTotalCount: return {...state, totalCount: action.payload}
      case TYPE.setFavourites: return {...state, favourites: action.payload}
      default: return state;
    }
}

export default Reducer;