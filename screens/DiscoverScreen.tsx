import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, StatusBar, FlatList, Text, TouchableOpacity, ActivityIndicator, View, ScrollView, Keyboard } from 'react-native';

import * as Colors from '../constants/Colors'

import CachedImage from '../model/CachedImage';
import Icon from 'react-native-vector-icons/FontAwesome';

import TrendingBoxView from '../components/cell/TrendingBoxView';
import UserView from '../components/cell/UserView';
import FeedSmallView from '../components/cell/FeedSmallView';
import SearchView from './Discover/SearchView';

import Tag from '../model/objects/parser/Tag';

import { SwiperFlatList } from 'react-native-swiper-flatlist'
import { SearchBar, Button } from 'react-native-elements';

import { feedSmallViewHeight, trendingBoxViewHeight, userViewHeight, width } from '../constants/Layout'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: Colors.dark
  },
  searchBar: {
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    borderBottomWidth: 0,
    paddingRight:0,
    paddingLeft: 16,
    width: "77.5%",
    paddingTop: 56,
    paddingBottom:16
  },
  inputSearchBar: {
    borderWidth: 0,
  },
  inputContainerSearchBar: {
    backgroundColor:Colors.gray,
    height:35
  },
  headerSearchBar: {
    width: width,
    flexDirection: 'row'
  },
  iconContainerSearchBar: {
    color:Colors.lightGray,
    marginLeft:8,
  },
  paginationDot: {
    width: 5,
    height: 5,
  },
  headerSwiperContent: {
    height:width * 0.75,
    width:width,
    justifyContent:"center"
  },
  imageSwiperContent: {
    height:width * 0.75,
    width:width,
  },
  overlayBlackSwiperContent: {
    backgroundColor:'black',
    position: 'absolute',
    top: 0,
    width:width,
    height:width * 0.75,
    opacity: 0.25,
  },
  overlaySwiperContent: {
    backgroundColor:'transparent',
    position: 'absolute',
    top: 0,
    width:width,
    height:width * 0.65,
    justifyContent: "center"
  },
  defaultContentLabelSwiper: {
    marginVertical: 4,
    alignSelf:"center",
    color: "white"
  },
  viewCategory: {
    flexDirection:'row',
    width:width,
    justifyContent:'space-between',
    alignItems:'center',
    paddingHorizontal:16,
    marginTop:32,
    marginBottom:24
  },
  titleCategory: {
    fontSize: 24,
    fontFamily: 'poppins-bold',
    color: 'white'
  },
  contentLabelSwiperTitle: {
    fontSize: 40,
    fontFamily: 'poppins-bold',
  },
  contentLabelSwiperTag: {
    fontFamily: 'poppins-bold',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderColor: 'white',
    borderWidth: 0.5,
    borderRadius: 8,
  },
  contentLabelSwiperInfo: {
    fontFamily: 'poppins-light',
  },
  buttonTop: {
    tintColor:'white',
  },
  viewButtonTop: {
    paddingTop: 54,
    paddingBottom:16,
    width:"22.5%",
  },
  cancelButton: {
    color:'white',
    fontFamily:'poppins-regular',
    fontSize:16
  }
});

export default function HomeScreen({navigation}): JSX.Element {

  const [users, setUsers] = useState(new Array(0));
  const [feeds, setFeeds] = useState(new Array(0));
  const [tags, setTags] = useState(new Array(0));
  const [categories, setCategories] = useState(new Array(0));
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const [searchViewOpen, setSearchViewOpen] = useState(false);

  useEffect(() => {
    const array = [];
    array.push(new Tag('https://picsum.photos/800', '1', '1', []));
    array.push(new Tag('https://picsum.photos/700', '1', '1', []));
    array.push(new Tag('https://picsum.photos/900', '1', '1', []));
    array.push(new Tag('https://picsum.photos/1000', '1', '1', []));
    array.push(new Tag('https://picsum.photos/1100', '1', '1', []));
    array.push(new Tag('https://picsum.photos/1200', '1', '1', []));

    setTags(array);
  }, []);

  const renderItemTag = (item) => {
    return (
      <TouchableOpacity onPress={() => { navigation.navigate('TagScreen') }}>
        <TrendingBoxView tag={item} />
      </TouchableOpacity>
    )
  };

  const renderItemUser = (item) => {
    return (
      <TouchableOpacity onPress={() => {}}>
        <UserView user={item} />
      </TouchableOpacity>
    )
  };

  const renderItemFeed = (item) => {
    return (
      <TouchableOpacity onPress={() => {}}>
        <FeedSmallView feed={item} />
      </TouchableOpacity>
    )
  };

  const headerSearchBar = () => {
    return (
      <View style={styles.headerSearchBar}>
        <SearchBar
          containerStyle={styles.searchBar}
          inputStyle={styles.inputSearchBar}
          inputContainerStyle={styles.inputContainerSearchBar}
          placeholderTextColor={Colors.lightGray}
          round
          onFocus={() => setSearchViewOpen(true) }
          showCancel
          searchIcon={styles.iconContainerSearchBar}
          placeholder="Rechercher..."
          value={search}
        />

        { searchViewOpen ? cancelButtonSearch() : iconCreateNewFeed() }
      </View>
    )
  }

  const iconCreateNewFeed = () => {
    return (
      <View style={styles.viewButtonTop}>
        <Button type="clear" style={styles.buttonTop} icon={
          <Icon
            name="plus-square-o"
            size={24}
            color={Colors.light}
          />
        } />
      </View>
    )
  }

  const cancelButtonSearch = () => {
    return (
      <View style={styles.viewButtonTop}>
        <Button type="clear" style={styles.buttonTop} title="Annuler" titleStyle={styles.cancelButton} onPress={() => cancelButtonAction() }/>
      </View>
    )
  }

  const cancelButtonAction = () => {
    setSearchViewOpen(false);
    Keyboard.dismiss();
  }

  const headerSwiper = () => {
    return (
      <View>
        <SwiperFlatList
          data={["https://picsum.photos/1000", "https://picsum.photos/1100", "https://picsum.photos/1200"]}
          renderItem={({item, index}) => headerComponent(item) }
          horizontal={true}
          showPagination={true}
          paginationStyleItem={styles.paginationDot}
          bounces={false}
          autoplayLoopKeepAnimation
          autoplayLoop
          autoplayDelay={5}
        />
      </View>
    )
  }

  const headerComponent = (info:String) => {
      return (
        <View style={styles.headerSwiperContent} >
          <TouchableOpacity onPress={() => { navigation.navigate('TagScreen') }}>
            <View>
              <CachedImage
                style={styles.imageSwiperContent}
                source={{ uri: `${info}` }}
                cacheKey={`${info}t`}
                resizeMode="cover"
              />
              <View style={styles.overlayBlackSwiperContent} />
              <View style={styles.overlaySwiperContent}>
                <Text style={[styles.defaultContentLabelSwiper, styles.contentLabelSwiperTag]}>Trending</Text>
                <Text style={[styles.defaultContentLabelSwiper, styles.contentLabelSwiperTitle]}>#neondance</Text>
                <Text style={[styles.defaultContentLabelSwiper, styles.contentLabelSwiperInfo]}>21 Publications</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      )
  }

  const loadMore = async () => {
    if(!loadingMore) {
      setPage(page + 1)
      setLoadingMore(true)

      const array = [];
      array.push(new Tag('https://picsum.photos/800', '1', '1', []));
      array.push(new Tag('https://picsum.photos/700', '1', '1', []));
      array.push(new Tag('https://picsum.photos/900', '1', '1', []));
      array.push(new Tag('https://picsum.photos/1000', '1', '1', []));
      array.push(new Tag('https://picsum.photos/1100', '1', '1', []));
      array.push(new Tag('https://picsum.photos/1200', '1', '1', []));

      await new Promise(resolve => {
        setTimeout(resolve, 2000);
      });

      setTags(tags.concat(array))
      setLoadingMore(false)
    }
  }
  const ListTypes = {
      FEED: 0,
      TAG: 1,
      USER: 2
  };

  const layoutProvider = (type, index) => {
      switch (type) {
          case ListTypes.FEED:
              return { length: feedSmallViewHeight, offset: feedSmallViewHeight * index, index}
          case ListTypes.TAG:
            return { length: trendingBoxViewHeight, offset: trendingBoxViewHeight * index, index}
          case ListTypes.USER:
            return { length: userViewHeight, offset: userViewHeight * index, index}
          default:
            return { length: 0, offset: index, index }
      }
  }

  const rowRender = (type, data) =>  {
      switch (type) {
          case ListTypes.FEED:
            return renderItemFeed(data)
          case ListTypes.TAG:
            return renderItemTag(data)
          case ListTypes.USER:
            return renderItemUser(data)
          default:
              return null;
      }
  }

  const renderFooter = () => {
    if (!loadingMore) return null;
    return (
      <View
        style={{
          width: 80,
          justifyContent:'center',
          flex:1,
          paddingLeft: 20,
        }}
      >
        <ActivityIndicator animating size="small" color='white' />
      </View>
    );
  };

  const categoryCompo = (title, type, spaceBetweenCell) => {
    return (
      <View>
        <View style={styles.viewCategory}>
          <Text style={styles.titleCategory}>{ title }  </Text>
          <Button type="clear" icon={
            <Icon
              name="chevron-right"
              size={16}
              color={Colors.light}
            />
          } />
        </View>
        <FlatList
          data={tags}
          keyExtractor={item => item.id}
          renderItem={({ item, _ }) => rowRender(type, item) }
          getItemLayout={(_, index) => layoutProvider(type, index) }
          horizontal={true}
          initialNumToRender={6}
          maxToRenderPerBatch={1}
          removeClippedSubviews
          showsHorizontalScrollIndicator={false}
          onEndReached={({ distanceFromEnd }) => {
            if(distanceFromEnd >= 0) { loadMore() }
          }}
          contentContainerStyle={{paddingHorizontal:16}}
          ItemSeparatorComponent={
            () => <View style={{ width: spaceBetweenCell, backgroundColor: 'transparent' }}/>
          }
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter()}
        />
      </View>
    )
  }

  const mainContent = () => {
    return (
      <View>
        { headerSwiper() }
        { categoryCompo("Publications populaire", ListTypes.FEED, 3)}
        { categoryCompo("Tags populaire", ListTypes.TAG, 16)}
        { categoryCompo("Personnes populaire", ListTypes.USER, 32)}
      </View>
    )
  }

  const mainSearchContent = () => {
    return (
      <SearchView />
    )
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="transparent" barStyle="light-content" />
      <ScrollView contentContainerStyle={{paddingBottom:24}} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='always' keyboardDismissMode="on-drag">
        { headerSearchBar() }

        { searchViewOpen ? mainSearchContent() : mainContent() }

      </ScrollView>
    </View>
  );
}
