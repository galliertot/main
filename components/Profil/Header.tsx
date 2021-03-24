import React, { PureComponent } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import CachedImage from '../../model/CachedImage'
import * as Colors from '../../constants/Colors';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';

import { width } from '../../constants/Layout'

import User from '../../model/objects/parser/User';

interface HeaderProps {
  user: User;
  category: number;
  updateCategory: Function;
  touchTopSettings: Function;
  touchFollow: Function;
  openFollowers: Function;
  openFollowing: Function;
}

interface HeaderState { }

const imageUserWidth:number = 80;

const styles = StyleSheet.create({
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
  },
  topSettingButton: {
    position:'absolute',
    top:56,
    right:16,
  },
});

export default class Header extends PureComponent<
  HeaderProps,
  HeaderState
  > {
  constructor(props: HeaderProps) {
    super(props);
  }



  render():JSX.Element{
    const p = this.props;
    return (
      <View style={styles.header}>
        <View style={styles.headerContent} >
          <CachedImage
            style={styles.imageUser}
            source={{ uri: "https://picsum.photos/1400" }}
            cacheKey={`https://picsum.photos/1400`}
            resizeMode="cover"
          />
          <Button type="clear" icon={
            <Icon
              name={"ios-settings-outline"}
              size={24}
              color={Colors.light}
            />
          } containerStyle={styles.topSettingButton}
          onPress={() => this.props.touchTopSettings() }/>
          <Text style={[styles.defaultContentLabel, styles.contentLabelTitle]}>{this.props.user.name}</Text>
          <Text style={[styles.defaultContentLabel, styles.contentLabelInfo]}>Eiusmod esse est aute qui amet reprehenderit ex occaecat fugiat.</Text>
        </View>
        <View style={styles.viewInfoNumber}>
          <View style={styles.touchableViewInfo}>
            <Text style={styles.mainNumberInfo}>120</Text>
            <Text style={styles.describeNumberInfo}>Publications</Text>
          </View>
          <TouchableOpacity style={styles.touchableViewInfo} onPress={this.props.openFollowers}>
            <Text style={styles.mainNumberInfo}>12k</Text>
            <Text style={styles.describeNumberInfo}>Followers</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.touchableViewInfo} onPress={this.props.openFollowing}>
            <Text style={styles.mainNumberInfo}>28O</Text>
            <Text style={styles.describeNumberInfo}>Following</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.viewUpdateCategoryFlatList}>
          <Button type="clear" icon={
            <Icon
              name={this.props.category == 0 ? "camera" : "camera-outline"}
              size={24}
              color={this.props.category == 0 ? Colors.light : Colors.lightGray }
            />
          } buttonStyle={this.props.category == 0 ? styles.categorySelected : styles.categoryNotSelected}
          onPress={() => this.props.updateCategory(0)}
          TouchableComponent={TouchableWithoutFeedback} />
          <Button type="clear" icon={
            <Icon
              name={this.props.category == 1 ? "albums" : "albums-outline"}
              size={24}
              color={this.props.category == 1 ? Colors.light : Colors.lightGray }
            />
          } buttonStyle={this.props.category == 1 ? styles.categorySelected : styles.categoryNotSelected}
          onPress={() => this.props.updateCategory(1)}
          TouchableComponent={TouchableWithoutFeedback} />
          <Button type="clear" icon={
            <Icon
              name={this.props.category == 2 ? "heart" : "heart-outline"}
              size={24}
              color={this.props.category == 2 ? Colors.light : Colors.lightGray }
            />
          } buttonStyle={this.props.category == 2 ? styles.categorySelected : styles.categoryNotSelected}
          onPress={() => this.props.updateCategory(2)}
          TouchableComponent={TouchableWithoutFeedback} />
        </View>
        <View style={styles.viewButtonFollowOrSendInvite}>
          <TouchableOpacity onPress={this.props.touchFollow}>
            <Text style={styles.buttonFollowOrSendInvite}>Follow</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
