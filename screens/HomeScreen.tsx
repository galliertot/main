import React, { useRef,  Component, MutableRefObject, createRef } from 'react';
import { StyleSheet, StatusBar, View, TouchableOpacity } from 'react-native';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { LinearGradient } from 'expo-linear-gradient';

import * as Colors from '../constants/Colors'

import { ButtonGroup } from 'react-native-elements';

import FeedBigView from '../components/cell/FeedBigView';
import Feed from '../model/objects/parser/Feed';

import { Audio } from 'expo-av';
import { INTERRUPTION_MODE_ANDROID_DO_NOT_MIX, INTERRUPTION_MODE_IOS_DO_NOT_MIX } from 'expo-av/build/Audio';

import { feedBigViewHeight, width } from '../constants/Layout'


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: Colors.dark
  },
  topGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 80,
    opacity: 0.5,
  },
  topBar: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 40,
    left: 0,
    right: width * 0.4,
  },
  topBarLabelNoneSelected: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'poppins-bold',
  },
  topBarLabelSelected: {
    fontFamily: 'poppins-bold',
  },
  buttonTopBarSelected: {
    backgroundColor: 'transparent',
    opacity: 1,
  },
  buttonTopBarNoneSelected: {
    opacity: 0.5,
  },
  buttonGroup: {
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
});

interface HomeScreenProps {
  navigation: any;
}

interface HomeScreenState {
  feeds:Feed[]
  currentVisibleIndex:number
  selectedCategory:number
  activeScreen:boolean
}

export default class HomeScreen extends Component<HomeScreenProps,HomeScreenState> {

  swiper:MutableRefObject<null>;
  didFocusListener!:any;
  didBlurListener!:any;

  constructor(props: HomeScreenProps) {
    super(props);
    this.state = { feeds: [], currentVisibleIndex: 0, selectedCategory: 0, activeScreen:true};
    this.swiper = createRef();
  }

  componentDidMount(): void {
    const s = this.state;

    this.setState({activeScreen: true})

    this.didFocusListener = this.props.navigation.addListener('focus', () => {
      this.setState({activeScreen: true})
    });

    this.didFocusListener = this.props.navigation.addListener('blur', () => {
      this.setState({activeScreen: false})
    });

    const enableAudio = async () => {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        interruptionModeIOS: INTERRUPTION_MODE_IOS_DO_NOT_MIX,
        playsInSilentModeIOS: true,
        staysActiveInBackground: false,
        interruptionModeAndroid: INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
        shouldDuckAndroid: false,
      });
    };
    enableAudio();

    if (this.state.feeds.length == 0) {
      const array = [];
      array.push(
        new Feed(
          'https://alcyoneus.alpinecdn.com/v1/eyJpbnB1dCI6Imh0dHBzOi8vZDJlazdndDVsYzUwdDYuY2xvdWRmcm9udC5uZXQvdmlkZW8vZDhjYTIzYzlkYTEzMTZmY2QwM2M5MDMzNTk1MWYyZTM0MGE3YjZlMy5tcDQifQ==',
          '12 Mars',
          '1',
          'video'
        )
      );
      array.push(new Feed('https://picsum.photos/200', '12 Mars', '1', '1'));
      array.push(new Feed('https://picsum.photos/400', '1', '1', '1'));
      array.push(new Feed('https://picsum.photos/300', '1', '1', '1'));
      array.push(
        new Feed(
          'https://alcyoneus.alpinecdn.com/v1/eyJpbnB1dCI6Imh0dHBzOi8vZDJlazdndDVsYzUwdDYuY2xvdWRmcm9udC5uZXQvdmlkZW8vMGRlYWRkNjg1MGMyMWI5MTUyZDZlNTk1YWNmYTU2OGVmMjZkYTFhNC5tcDQifQ==',
          '1',
          '1',
          'video'
        )
      );
      array.push(
        new Feed(
          'https://alcyoneus.alpinecdn.com/v1/eyJpbnB1dCI6Imh0dHBzOi8vZDJlazdndDVsYzUwdDYuY2xvdWRmcm9udC5uZXQvdmlkZW8vZjgwYmEzYTI2NTYwMTZkNmQ4Y2Y5NmI4OGZjYThjOWUzNzI5MDVmNS5tcDQifQ==',
          '1',
          '1',
          'video'
        )
      );
      array.push(new Feed('https://picsum.photos/500', '1', '1', '1'));
      array.push(new Feed('https://picsum.photos/900', '1', '1', '1'));
      array.push(new Feed('https://picsum.photos/800', '1', '1', '1'));
      array.push(new Feed('https://picsum.photos/700', '1', '1', '1'));
      array.push(
        new Feed(
          'https://stream.livestreamfails.com/video/5c6797ab1a640.mp4',
          '1',
          '1',
          'video'
        )
      );

      array.push(new Feed('https://picsum.photos/600', '1', '1', '1'));
      array.push(new Feed('https://picsum.photos/1000', '1', '1', '1'));
      this.setState({feeds : array})
    }
  }

  componentWillUnmount(): void {
    this.setState({activeScreen: false})
  }

  renderItem = (item:Feed, index:number) => {
    return <FeedBigView feed={item} isActive={(index === this.state.currentVisibleIndex) && this.state.activeScreen} />;
  };

  onViewableItemsChanged = (viewableItems:any[]) => {
    if (viewableItems && viewableItems.length > 0) {
      this.setState({currentVisibleIndex: viewableItems[0].index })
    }
  };

  viewabilityConfig = () => {
    return { viewAreaCoveragePercentThreshold: 100 };
  };

  updateFeedWithCategoryUpdate = () => {
    this.setState({feeds: this.state.feeds.sort(() => Math.random() - 0.5)})
  };

  updateSelectedCategory = (index:number) => {
    this.setState({selectedCategory: index})
    this.updateFeedWithCategoryUpdate();
    this.swiper?.current?.goToFirstIndex();
  };

  buttonsTopBar = ['Pour moi', 'Tendances'];

  getItemLayout = (_, index:number) => (
    { length: feedBigViewHeight, offset: feedBigViewHeight * index, index}
  );

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="transparent" barStyle="light-content" />
        <SwiperFlatList
          vertical
          ref={this.swiper}
          data={this.state.feeds}
          onViewableItemsChanged={({viewableItems}) => this.onViewableItemsChanged(viewableItems)}
          viewabilityConfig={this.viewabilityConfig}
          renderItem={({ item, index }) => this.renderItem(item, index)}
          getItemLayout={this.getItemLayout}
          keyExtractor={(item) => item.id}
          snapToAlignment="start"
          snapToInterval={feedBigViewHeight}
          decelerationRate="fast"
          initialNumToRender={2}
          maxToRenderPerBatch={2}
          removeClippedSubviews
          windowSize={3}
          bounces={false}
        />
        <LinearGradient
          colors={['black', 'transparent']}
          style={styles.topGradient}
        />
        <View style={styles.topBar}>
          <ButtonGroup
            buttons={this.buttonsTopBar}
            selectedIndex={this.state.selectedCategory}
            onPress={this.updateSelectedCategory}
            containerStyle={styles.buttonGroup}
            selectedTextStyle={styles.topBarLabelSelected}
            Component={TouchableOpacity}
            textStyle={styles.topBarLabelNoneSelected}
            selectedButtonStyle={styles.buttonTopBarSelected}
            buttonStyle={styles.buttonTopBarNoneSelected}
            innerBorderStyle={{ width: 0 }}
          />
        </View>
      </View>
    );
  }
}
