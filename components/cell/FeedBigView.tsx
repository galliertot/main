import React, { MutableRefObject, Component, createRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Video } from 'expo-av';
import { feedBigViewHeight, feedBigViewWidth } from '../../constants/Layout'
import CachedImage from '../../model/CachedImage'
import * as Layout from '../../constants/Layout';
import * as Colors from '../../constants/Colors';
import { Button } from 'react-native-elements';
import Feed from '../../model/objects/parser/Feed';
import Icon from 'react-native-vector-icons/Ionicons';

interface FeedBigViewProps {
  feed: Feed;
  isActive: boolean;
}

interface FeedBigViewState {
  video: MutableRefObject<any>;
}

const widthImageUser:number = 40;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark,
  },
  mainImage: {
    width: feedBigViewWidth,
    height: feedBigViewHeight
  },
  imageUser: {
    width: widthImageUser,
    height: widthImageUser,
    borderRadius: widthImageUser / 2,
  },
  mainVideo: {
    width: feedBigViewWidth,
    height: feedBigViewHeight
  },
  overlay: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    width: feedBigViewWidth,
    height: feedBigViewHeight
  },
  viewBottom: {
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 8,
  },
  nameUser: {
    fontSize: 14,
    color: 'white',
    fontFamily: 'poppins-bold'
  },
  dateFeed:  {
    fontSize: 12,
    color: 'white',
    fontFamily: 'poppins-light'
  },
  viewButtonRight: {
    position:'absolute',
    right:0,
    bottom:0,
    alignItems:'center'
  },
  viewBottomUser: {
    position:'absolute',
    left:0,
    bottom:0,
    display:'flex',
    flexDirection:'row',
    alignContent:'center',
  },
  viewNameUser: {
    marginHorizontal:8,
  },
  numberUnderButton: {
    fontFamily: 'poppins-regular',
    fontSize:12,
    color:'white',
    marginTop:-4
  }
});

export default class FeedBigView extends Component<
  FeedBigViewProps,
  FeedBigViewState
  > {
  constructor(props: FeedBigViewProps) {
    super(props);
    this.state = { video: createRef() };
  }

  componentDidMount(): void {
    const s = this.state;
    if (s.video !== null) {
      s.video ?.current ?.setPositionAsync(0);
    }
  }

  componentWillUnmount(): void {
    const s = this.state;
    const p = this.props;
    if (s.video !== null && p.isActive) {
      s.video ?.current ?.unloadAsync();
    }
  }

  contentVideoPlayer(): JSX.Element {
    const s = this.state;
    const p = this.props;

    return (
      <Video
        ref={s.video}
        style={styles.mainVideo}
        source={{
          uri: p.feed.name,
        }}
        shouldPlay={p.isActive}
        resizeMode="cover"
        isLooping
        positionMillis={p.isActive ? undefined : 0}
        isMuted={false}
        volume={1.0}
        rate={1.0}

        onError={(error) => {
            console.log(error)
        }}
      />
    );
  }

  contentImage(): JSX.Element {
    const p = this.props;

    return (
      <CachedImage
        resizeMode="cover"
        style={styles.mainImage}
        source={{ uri: `${p.feed.name}` }}
        cacheKey={`${p.feed.name}t`}
      />
    );
  }

  render(): JSX.Element {
    const p = this.props;

    return (
      <View style={styles.container}>
        {p.feed.type === 'video'
          ? this.contentVideoPlayer()
          : this.contentImage()}
        <View style={styles.overlay}>
          <View style={styles.viewBottom}>
            <View style={styles.viewBottomUser}>
              <CachedImage
                resizeMode="cover"
                style={styles.imageUser}
                source={{ uri: `${p.feed.name}` }}
                cacheKey={`${p.feed.name}t`}
              />
              <View style={styles.viewNameUser}>
                <Text style={styles.nameUser}>{p.feed.id}</Text>
                <Text style={styles.dateFeed}>{p.feed.createdAt}</Text>
              </View>
            </View>
            <View style={styles.viewButtonRight}>
              <Button type="clear" style={styles.buttonTop} icon={
                <Icon
                  name="heart-outline"
                  size={24}
                  color={Colors.light}
                />
              } />
              <Text style={styles.numberUnderButton}>12k</Text>

              <Button type="clear" style={styles.buttonTop} icon={
                <Icon
                  name="chatbubble-outline"
                  size={24}
                  color={Colors.light}
                />
              } />
              <Text style={styles.numberUnderButton}>286</Text>

              <Button type="clear" style={styles.buttonTop} icon={
                <Icon
                  name="share-outline"
                  size={24}
                  color={Colors.light}
                />
              } />
              <Text style={styles.numberUnderButton}>182</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
