import React, { PureComponent } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CachedImage from '../../model/CachedImage'
import { feedSmallViewWidth, feedSmallViewHeight } from '../../constants/Layout'

import { Button } from 'react-native-elements'
import * as Layout from '../../constants/Layout';
import * as Colors from '../../constants/Colors'
import Icon from 'react-native-vector-icons/FontAwesome';

import Feed from '../../model/objects/parser/Feed';

interface FeedSmallViewProps {
  feed: Feed;
}

interface FeedSmallViewState { }

const styles = StyleSheet.create({
  container: {
    justifyContent:"center",
  },
  mainImage: {
    width: feedSmallViewWidth,
    height: feedSmallViewHeight,
  },
  mainVideo: {
    width: feedSmallViewWidth,
    height: feedSmallViewHeight,
  },
  overlay: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    width: feedSmallViewWidth,
    height: feedSmallViewHeight,
  },
  viewBottom: {
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: -4,
    flexDirection:'row'
  },
  likeButton: {
    tintColor:"white"
  },
  numberOfLike: {
    fontFamily: 'poppins-regular',
    fontSize: 12,
    color: 'white',
    marginLeft:6
  }
});

export default class FeedSmallView extends PureComponent<
  FeedSmallViewProps,
  FeedSmallViewState
  > {
  constructor(props: FeedSmallViewProps) {
    super(props);
  }

  render():JSX.Element{
    const p = this.props;
    return (
      <View style={styles.container}>
        <CachedImage
          resizeMode="cover"
          style={styles.mainImage}
          source={{ uri: `${p.feed.name}` }}
          cacheKey={`${p.feed.name}t`}
        />
        <View style={styles.overlay}>
          <View style={styles.viewBottom}>
            <Button style={styles.likeButton} titleStyle={styles.numberOfLike} type="clear" icon={
              <Icon
                name="heart-o"
                size={12}
                color="white"
              />
            } title="500"/>
          </View>
        </View>
      </View>
    );
  }
}
