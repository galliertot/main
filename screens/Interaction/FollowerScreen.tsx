import React, { Component } from 'react';
import { StyleSheet, StatusBar, FlatList, Text, ActivityIndicator, View, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SearchBar, Button } from 'react-native-elements';

import { width, userFollowViewHeight } from '../../constants/Layout'
import * as Colors from '../../constants/Colors'
import * as Style from '../../constants/Style'
import UserFollowView from '../../components/cell/UserFollowView'

import User from '../../model/objects/parser/User';

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: Colors.dark
  },
  headerContent: {
    flexDirection:'row',
    width:"100%",
    position:'absolute',
    top:0,
    left:0,
    right:0,
    height:"15%",
    justifyContent:'space-between',
  },
  navigationTitle: {
    alignSelf:"center",
    color: "white",
    fontSize: 20,
    fontFamily: 'poppins-bold',
  },
  buttonTop: {
    alignSelf:'flex-start',
    paddingVertical:26,
    paddingHorizontal:16,
  },
});

const searchBar = StyleSheet.create({
  searchBar: {
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    borderBottomWidth: 0,
    paddingHorizontal: 16,
    width: "100%",
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
})

interface FollowerScreenProps {
  navigation: any;
  route: any;
}

interface FollowerScreenState { }

enum FollowerType { FOLLOWERS = 'followers', FOLLOWING = 'following' }

export default class FollowerScreen extends Component<FollowerScreenProps,FollowerScreenState> {

  didFocusListener!:any;
  didBlurListener!:any;
  type:FollowerType;

  constructor(props: FollowerScreenProps) {
    super(props);
    this.state = { };
    this.type = this.props.route.params.type;
  }

  componentDidMount(): void {
    const s = this.state;
    this.didFocusListener = this.props.navigation.addListener('focus', () => { });
    this.didFocusListener = this.props.navigation.addListener('blur', () => { });
  }

  searchBarComponent():JSX.Element {
    return (
      <View style={searchBar.headerSearchBar}>
        <SearchBar
          containerStyle={searchBar.searchBar}
          inputStyle={searchBar.inputSearchBar}
          inputContainerStyle={searchBar.inputContainerSearchBar}
          placeholderTextColor={Colors.lightGray}
          round
          showCancel
          searchIcon={searchBar.iconContainerSearchBar}
          placeholder="Rechercher..."
        />
      </View>
    )
  }

  componentWillUnmount(): void {  }


  getItemLayout = (data, index) => (
    { length: userFollowViewHeight, offset: userFollowViewHeight * index, index}
  );

  render() {
    return (
      <View style={styles.container}>
        <View style={[styles.headerContent, Style.default.AndroidSafeArea]}>
          <TouchableOpacity style={styles.buttonTop} onPress={() => { this.props.navigation.popToTop() }}>
            <Icon
              name="chevron-left"
              size={16}
              color={Colors.light}
            />
          </TouchableOpacity>
          <Text style={styles.navigationTitle}>{ this.type == FollowerType.FOLLOWERS ? "Followers" : "Following" }</Text>
          <View style={styles.buttonTop} />
        </View>

        <ScrollView showsVerticalScrollIndicator={false} style={{marginTop:"30%"}}>
          <FlatList
            data={this.props.route.params.user.follows}
            keyExtractor={item => item.id}
            renderItem={({ item, _ }) => <UserFollowView user={item} /> }
            getItemLayout={this.getItemLayout}
            horizontal={false}
            scrollEnabled={false}
            ListHeaderComponent={this.searchBarComponent}
            initialNumToRender={6}
            maxToRenderPerBatch={1}
            removeClippedSubviews
            windowSize={9}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={
              () => <View style={{ height: 1, marginHorizontal:16, backgroundColor: Colors.lightGray }}/>
            }
          />
        </ScrollView>
      </View>
    )
  }
}
