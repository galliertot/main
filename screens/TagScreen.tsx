import React, { useState, useEffect } from 'react';
import { StyleSheet, StatusBar, FlatList, Text, ActivityIndicator, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { feedSmallViewHeight, width } from '../constants/Layout'
import * as Colors from '../constants/Colors'
import * as Style from '../constants/Style'

import CachedImage from '../model/CachedImage';

import FeedSmallView from '../components/view/FeedSmallView';
import Feed from '../model/objects/parser/Feed';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: Colors.dark
  },
  headerContent: {
    height:width,
    width:width,
  },
  imageContent: {
    height:width,
    width:width,
  },
  overlayBlackContent: {
    backgroundColor:Colors.dark,
    position: 'absolute',
    top: 0,
    width:width,
    height:width,
    opacity: 0.25,
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
  },
  buttonTop: {
    alignSelf:'flex-start',
    padding:20,
  },
});

export default function TagScreen({navigation}): JSX.Element {
  const [feeds, setFeeds] = useState(new Array(0));
  const [page, setPage] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);

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

  const renderItem = ({ item, index }) => {
    return <FeedSmallView feed={item} />;
  };

  const headerComponent = (info:String) => {
      return (
        <View style={styles.headerContent} >
          <CachedImage
            style={styles.imageContent}
            source={{ uri: `${info}` }}
            cacheKey={`${info}t`}
            resizeMode="cover"
          />
          <View style={styles.overlayBlackContent} />
          <View style={styles.overlayContent}>
            <View style={[styles.overlayContent, {justifyContent: "center"}]}>
              <Text style={[styles.defaultContentLabel, styles.contentLabelTag]}>Trending</Text>
              <Text style={[styles.defaultContentLabel, styles.contentLabelTitle]}>#neondance</Text>
              <Text style={[styles.defaultContentLabel, styles.contentLabelInfo]}>21 Publications</Text>
            </View>
            <View style={Style.default.AndroidSafeArea}>
              <TouchableOpacity style={styles.buttonTop} onPress={() => { navigation.popToTop() }}>
                <Icon
                  name="chevron-left"
                  size={16}
                  color={Colors.light}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )
  }

  const loadMore = async () => {
    if(!loadingMore) {
      setPage(page + 1)
      setLoadingMore(true)

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

      await new Promise(resolve => {
        setTimeout(resolve, 2000);
      });

      setFeeds(feeds.concat(array))
      setLoadingMore(false)
    }
  }

  const renderFooter = () => {
    if (!loadingMore) return null;
    return (
      <View
        style={{
          width: width,
          justifyContent:'center',
          flex:1,
          paddingVertical: 20,
        }}
      >
        <ActivityIndicator animating size="small" color='white' />
      </View>
    );
  };

  const getItemLayout = (data, index) => (
    { length: feedSmallViewHeight, offset: feedSmallViewHeight * index, index}
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="transparent" barStyle="light-content" />
      <FlatList
        ListHeaderComponent={headerComponent('https://picsum.photos/1000')}
        data={feeds}
        keyExtractor={item => item.id}
        renderItem={({ item, index }) => renderItem({ item, index })}
        getItemLayout={getItemLayout}
        horizontal={false}
        numColumns={3}
        initialNumToRender={6}
        maxToRenderPerBatch={1}
        removeClippedSubviews
        windowSize={9}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={{marginVertical:1, justifyContent:"space-between"}}
        onEndReached={({ distanceFromEnd }) => {
          if(distanceFromEnd >= 0) { loadMore() }
        }}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter()}
      />
    </View>
  );
}
