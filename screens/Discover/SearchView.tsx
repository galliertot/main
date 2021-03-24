import React, { useRef,  Component, MutableRefObject, createRef } from 'react';
import { ScrollView, StyleSheet, StatusBar, FlatList, View } from 'react-native';

import { feedSmallViewHeight, userFollowViewHeight, trendingBoxViewHeight, width } from '../../constants/Layout'
import * as Colors from '../../constants/Colors'
import { SwiperFlatList } from 'react-native-swiper-flatlist'

import FeedSmallView from '../../components/cell/FeedSmallView';
import UserFollowView from '../../components/cell/UserFollowView';
import TrendingBoxView from '../../components/cell/TrendingBoxView';

import Tag from '../../model/objects/parser/Tag';
import Feed from '../../model/objects/parser/Feed';
import User from '../../model/objects/parser/User';

import SearchHeader from '../../components/Discover/SearchHeader';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.gray
  }
});

interface SearchViewProps { }

interface SearchViewState {
  users: User[];
  feeds: Feed[];
  tags: Tag[];

  category: number;
}


export default class SearchView extends Component<SearchViewProps,SearchViewState> {

  swiper:MutableRefObject<null>;
  didFocusListener!:any;
  didBlurListener!:any;

  constructor(props: SearchViewProps) {
    super(props);
    this.state = { users: [], feeds: [], tags: [], category: 0 };
    this.swiper = createRef();
  }

  componentDidMount(): void {
    const s = this.state;
  }

  updateCategory = async (index:number) => {
    await new Promise(resolve => {
      this.setState({category: index})
      setTimeout(resolve, 5);
    });
    this.swiper?.current?.scrollToIndex({index, true});
  }

  getItemLayout = (data, index) => (
    { length: feedSmallViewHeight, offset: feedSmallViewHeight * index, index}
  );

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="transparent" barStyle="light-content" />
        <ScrollView directionalLockEnabled={true} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='always' keyboardDismissMode="on-drag">
          <SearchHeader category={this.state.category} updateCategory={this.updateCategory} />
          <SwiperFlatList
            ref={this.swiper}
            contentContainerStyle={{backgroundColor:Colors.dark}}
            data={[this.state.users, this.state.feeds, this.state.tags]}
            onChangeIndex={({index, _}) => this.updateCategory(index)}
            renderItem={({item, index}) =>
              <FlatList
                data={item}
                keyExtractor={item => item.id}
                renderItem={({ item, _ }) => <View /> }
                getItemLayout={this.getItemLayout}
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
}
