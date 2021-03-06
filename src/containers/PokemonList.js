import React from 'react';
import {useState} from 'react';
import {useRef} from 'react';
import {useEffect} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import { set } from 'react-native-reanimated';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';
import Card from '../components/Card';
import Footer from '../components/Footer';
import {genAction, getFavourites, getList} from '../store/actions';
import { TYPE } from '../utils/strings';
import LottieView from 'lottie-react-native';
import SearchBar from '../components/SearchBar';

const PokemonList = ({route, navigation}) => {
  const {list, favourites, totalCount} = useSelector((state) => state.pokemon);
  const dispatch = useDispatch();
  let offset = useRef(0);

  const [refreshing, setRefreshing] = useState(false);
  const [value, setValue] = useState('')
  const [data, setData] = useState([])
  const [load,setLoad] = useState(false)

  let loading = useRef(false)
  
  useEffect(() => {
    setLoad(true);
    getFav().then(()=>{
      apiCall()}).catch((error)=>alert('Something Went Wrong!!'));
  }, []);

  useEffect(()=>{
      setData(list);
  },[list])

  const getFav = async () => {
    await dispatch(getFavourites());
  }


  const apiCall = async () => {
    try {
      await dispatch(getList(offset.current));
      offset.current = offset.current + 10;
      setRefreshing(false);
      setLoad(false);
      loading.current = false; 
    } catch (error) {
      throw error
    }
  };

  const onRefresh = () => {
    offset.current = 0;
    setValue('')
    dispatch(genAction(TYPE.setList, []));
    setRefreshing(true);
    apiCall();
  };

  const onEndReached = async() => {
    if (loading.current || value) return;
    loading.current = true
    setLoad(true)
    apiCall();
  };

  const onChange = val => {
    if(!val.length){ 
      setValue(val)
      setData(list);
      return;
    }
    setValue(val)
    let newData = list.filter((item)=>
      item.name.includes(val.toLowerCase())
    )
    setData(newData)
  }
  
  return (
    <View style={styles.view}>
      {(load || refreshing) && !data.length ? (
        <LottieView
          speed={0.8}
          style={{width: '105%', top: -10}}
          autoPlay={true}
          loop={true}
          source={require('../assets/animationJson/skelotonLoading.json')}
        />
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => (
            <Card
              item={item}
              index={index}
              favourites={favourites}
              navigation={navigation}
              highlight={value}
            />
          )}
          onRefresh={onRefresh}
          refreshing={refreshing}
          onEndReachedThreshold={0.2}
          onEndReached={onEndReached}
          ListFooterComponent={
            load && list.length < totalCount ? <Footer /> : <></>
          }
          contentContainerStyle={styles.container}
          ListHeaderComponent={<SearchBar onChangeText={onChange} value={value}/>}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  view: {flex: 1},
  container: {
    flexGrow: 1,
    backgroundColor: 'white',
    paddingTop: hp('1.5%'),
  },
});

export default PokemonList;
