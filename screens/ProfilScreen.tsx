import React, { useState, useEffect, useRef } from 'react';
import { ScrollView, StyleSheet, StatusBar, FlatList, View } from 'react-native';
import * as Haptics from 'expo-haptics';

import { feedSmallViewHeight, width } from '../constants/Layout'
import * as Colors from '../constants/Colors'
import { SwiperFlatList } from 'react-native-swiper-flatlist'

import FeedSmallView from '../components/cell/FeedSmallView';
import Feed from '../model/objects/parser/Feed';
import User from '../model/objects/parser/User';

import Header from '../components/Profil/Header'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.gray
  }
});

export default function ProfilScreen({navigation}): JSX.Element {
  const [user, setUser] = useState(User.prototype);
  const [category, setCategory] = useState(0);
  const swiper = useRef(null);

  useEffect(() => {
    setUser(new User("thomasgallier", "1", "1", 'https://picsum.photos/800', new Array(10).fill(new Feed('https://picsum.photos/800', '1', '1', '1')), new Array(10).fill(new User("thomasgallier", "1", "1", 'https://picsum.photos/800', [], []))));
  }, []);

  const updateCategory = async (index:number) => {
    await new Promise(resolve => {
      setCategory(index);
      setTimeout(resolve, 5);
    });
    swiper.current?.scrollToIndex({index, true});
  }

  const touchTopSettings = () => {
    Haptics.impactAsync("medium");
  }

  const touchFollow = () => {
    Haptics.impactAsync("light");
  }

  const openFollowers = () => {
    navigation.navigate('FollowerScreen', { user: user, type: 'followers' })
  }

  const openFollowing = () => {
    navigation.navigate('FollowerScreen', { user: user, type: 'following' })
  }

  const getItemLayout = (data, index) => (
    { length: feedSmallViewHeight, offset: feedSmallViewHeight * index, index}
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="transparent" barStyle="light-content" />
      <ScrollView directionalLockEnabled={true} showsVerticalScrollIndicator={false}>
        <Header user={user} category={category} updateCategory={updateCategory} touchTopSettings={touchTopSettings} touchFollow={touchFollow} openFollowers={openFollowers} openFollowing={openFollowing}/>
        <SwiperFlatList
          ref={swiper}
          contentContainerStyle={{backgroundColor:Colors.dark}}
          data={[[], [], []]}
          onChangeIndex={({index, _}) => updateCategory(index)}
          renderItem={({item, index}) =>
            <FlatList
              data={user.feeds}
              keyExtractor={item => item.id}
              renderItem={({ item, _ }) => <FeedSmallView feed={item} /> }
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
