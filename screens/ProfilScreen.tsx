import React, { useState, useEffect, useRef } from 'react';
import { ScrollView, StyleSheet, StatusBar, FlatList, Text, ActivityIndicator, View, SafeAreaView, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';

import { feedSmallViewHeight, width } from '../constants/Layout'
import * as Colors from '../constants/Colors'

import CachedImage from '../model/CachedImage';
import { SwiperFlatList, SwiperFlatListProps } from 'react-native-swiper-flatlist'

import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';

import FeedSmallView from '../components/view/FeedSmallView';
import Feed from '../model/objects/parser/Feed';

const imageUserWidth:number = 80;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.gray
  },
  headerContent: {
    height:width * 0.95,
    width:width,
    alignItems:'center',
    justifyContent:'center',
  },
  header: {
    height:width * 1.325,
    width:width,
  },
  imageUser: {
    height:imageUserWidth,
    width:imageUserWidth,
    borderRadius:imageUserWidth / 2,
    marginBottom:16,
  },
  overlayContent: {
    backgroundColor:'transparent',
    position: 'absolute',
    top: 0,
    width:width,
    height:width,
  },
  defaultContentLabel: {
    marginVertical: 4,
    alignSelf:"center",
    color: "white"
  },
  contentLabelTitle: {
    fontSize: 40,
    fontFamily: 'poppins-bold',
  },
  contentLabelTag: {
    fontFamily: 'poppins-bold',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderColor: 'white',
    borderWidth: 0.5,
    borderRadius: 8,
  },
  contentLabelInfo: {
    fontFamily: 'poppins-light',
    textAlign:'center',
    marginHorizontal:24
  },
  buttonTop: {
    alignSelf:'flex-start',
    padding:20,
  },
  viewButtonFollowOrSendInvite: {
    position:'absolute',
    alignItems:'center',
    left:0,
    right:0,
    top:width * 0.95 - 15,
    width:width,
    height:30,
  },
  buttonFollowOrSendInvite: {
    color:'black',
    fontSize:15,
    fontFamily:'roboto-regular',
    backgroundColor:'white',
    paddingHorizontal:16,
    paddingVertical:5,
    height:"100%",
    textAlignVertical:"center",
    borderRadius:15,
    borderWidth:1,
    borderColor:'transparent',
    overflow:'hidden'
  },
  viewInfoNumber: {
    height:width * 0.25,
    backgroundColor:Colors.dark,
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    alignContent:'center',
    width:width,
    paddingHorizontal:32,
    justifyContent:'space-evenly'
  },
  mainNumberInfo: {
    width:100,
    color:'white',
    fontFamily:'roboto-bold',
    fontSize:16,
    textAlign:'center'
  },
  describeNumberInfo: {
    width:100,
    color:'white',
    marginTop:2,
    fontFamily:'poppins-light',
    fontSize:10,
    textAlign:'center'
  },
  touchableViewInfo: {
    justifyContent:'center',
    height:width * 0.25,
    marginTop:8,
    display:'flex',
    flexDirection:'column'
  },
  touchableViewCategory: {
    justifyContent:'center',
    height:width * 0.2,
  },
  viewUpdateCategoryFlatList: {
    height:width * 0.125,
    backgroundColor:Colors.dark,
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    alignContent:'center',
    justifyContent:'space-evenly',
    borderTopWidth:0.5,
    borderTopColor:Colors.lightGray,
    borderBottomWidth:0.5,
    borderBottomColor:Colors.lightGray,
  },
  categorySelected:{
    borderBottomColor:Colors.light,
    borderBottomWidth:1,
    width:width/3,
  },
  categoryNotSelected: {
    borderBottomColor:"transparent",
    borderBottomWidth:1,
    width:width/3,
  }
});

export default function ProfilScreen({navigation}): JSX.Element {
  const [feeds, setFeeds] = useState(new Array(0));
  const [category, setCategory] = useState(0);
  const swiper = useRef(null);

  useEffect(() => {
    const array = [];
    array.push(new Feed('https://picsum.photos/800', '1', '1', '1'));
    array.push(new Feed('https://picsum.photos/700', '1', '1', '1'));
    array.push(new Feed('https://picsum.photos/600', '1', '1', '1'));
    array.push(new Feed('https://picsum.photos/1000', '1', '1', '1'));
    array.push(new Feed('https://picsum.photos/1100', '1', '1', '1'));
    array.push(new Feed('https://picsum.photos/1200', '1', '1', '1'));
    array.push(new Feed('https://picsum.photos/1300', '1', '1', '1'));
    array.push(new Feed('https://picsum.photos/1400', '1', '1', '1'));
    array.push(new Feed('https://picsum.photos/1500', '1', '1', '1'));
    array.push(new Feed('https://picsum.photos/800', '1', '1', '1'));
    array.push(new Feed('https://picsum.photos/700', '1', '1', '1'));
    array.push(new Feed('https://picsum.photos/600', '1', '1', '1'));
    array.push(new Feed('https://picsum.photos/1000', '1', '1', '1'));
    array.push(new Feed('https://picsum.photos/1100', '1', '1', '1'));
    array.push(new Feed('https://picsum.photos/1200', '1', '1', '1'));
    array.push(new Feed('https://picsum.photos/1300', '1', '1', '1'));
    array.push(new Feed('https://picsum.photos/1400', '1', '1', '1'));
    array.push(new Feed('https://picsum.photos/1500', '1', '1', '1'));
    setFeeds(array);
  }, []);

  const renderItem = (item:Feed) => {
    return <FeedSmallView feed={item} />;
  };

  const updateCategory = async (index:number) => {
    await new Promise(resolve => {
      setCategory(index);
      setTimeout(resolve, 5);
    });
    swiper.current?.scrollToIndex({index, true});
  }

  const headerComponent = () => {
      return (
        <View style={styles.header}>
          <View style={styles.headerContent} >
            <CachedImage
              style={styles.imageUser}
              source={{ uri: "https://picsum.photos/1400" }}
              cacheKey={`https://picsum.photos/1400`}
              resizeMode="cover"
            />
            <Text style={[styles.defaultContentLabel, styles.contentLabelTitle]}>gallierthomas</Text>
            <Text style={[styles.defaultContentLabel, styles.contentLabelInfo]}>Eiusmod esse est aute qui amet reprehenderit ex occaecat fugiat.</Text>
          </View>
          <View style={styles.viewInfoNumber}>
            <View style={styles.touchableViewInfo}>
              <Text style={styles.mainNumberInfo}>120</Text>
              <Text style={styles.describeNumberInfo}>Publications</Text>
            </View>
            <TouchableOpacity style={styles.touchableViewInfo}>
              <Text style={styles.mainNumberInfo}>12k</Text>
              <Text style={styles.describeNumberInfo}>Followers</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.touchableViewInfo}>
              <Text style={styles.mainNumberInfo}>28O</Text>
              <Text style={styles.describeNumberInfo}>Following</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.viewUpdateCategoryFlatList}>
            <Button type="clear" icon={
              <Icon
                name={category == 0 ? "camera" : "camera-outline"}
                size={24}
                color={Colors.light}
              />
            } buttonStyle={category == 0 ? styles.categorySelected : styles.categoryNotSelected}
            onPress={() => updateCategory(0)}
            TouchableComponent={TouchableWithoutFeedback} />
            <Button type="clear" icon={
              <Icon
                name={category == 1 ? "albums" : "albums-outline"}
                size={24}
                color={Colors.light}
              />
            } buttonStyle={category == 1 ? styles.categorySelected : styles.categoryNotSelected}
            onPress={() => updateCategory(1)}
            TouchableComponent={TouchableWithoutFeedback} />
            <Button type="clear" icon={
              <Icon
                name={category == 2 ? "heart" : "heart-outline"}
                size={24}
                color={Colors.light}
              />
            } buttonStyle={category == 2 ? styles.categorySelected : styles.categoryNotSelected}
            onPress={() => updateCategory(2)}
            TouchableComponent={TouchableWithoutFeedback} />
          </View>
          <View style={styles.viewButtonFollowOrSendInvite}>
            <TouchableOpacity>
              <Text style={styles.buttonFollowOrSendInvite}>Follow</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
  }

  const getItemLayout = (data, index) => (
    { length: feedSmallViewHeight, offset: feedSmallViewHeight * index, index}
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="transparent" barStyle="light-content" />
      <ScrollView directionalLockEnabled={true} showsVerticalScrollIndicator={false}>
        { headerComponent() }
        <SwiperFlatList
          ref={swiper}
          contentContainerStyle={{backgroundColor:Colors.dark}}
          data={[[], [], []]}
          onChangeIndex={({index, _}) => updateCategory(index)}
          renderItem={({item, index}) =>
            <FlatList
              data={feeds}
              keyExtractor={item => item.id}
              renderItem={({ item, _ }) => renderItem(item) }
              getItemLayout={getItemLayout}
              horizontal={false}
              scrollEnabled={false}
              numColumns={3}
              initialNumToRender={6}
              maxToRenderPerBatch={1}
              removeClippedSubviews
              windowSize={9}
              style={{width:width}}
              showsVerticalScrollIndicator={false}
              columnWrapperStyle={{marginVertical:1.25, justifyContent:"space-between"}}
            />
          }
          horizontal={true}
          bounces={false}
        />
      </ScrollView>
    </View>
  );
}
