import React, { PureComponent } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import CachedImage from '../../model/CachedImage'

import { userFollowViewHeight, width } from '../../constants/Layout'

import User from '../../model/objects/parser/User';

interface UserFollowViewProps {
  user: User;
}

interface UserFollowViewState { }

const styles = StyleSheet.create({
  container: {
    flexDirection:'row',
    width: width,
    height: userFollowViewHeight - 8,
    overflow: "hidden",
    marginHorizontal: 16,
    marginVertical: 8,
    alignItems:'center'
  },
  viewInfo: {
    alignItems:'center',
    flexDirection:'row',
    width: width - (userFollowViewHeight - 24) - 48,
    height: userFollowViewHeight - 24,
    justifyContent:'space-between',
    marginHorizontal: 16,
  },
  image: {
    width: userFollowViewHeight - 24,
    height: userFollowViewHeight - 24,
    borderRadius: (userFollowViewHeight - 24) / 2,
  },
  name: {
    fontSize:14,
    color:'white',
    fontFamily: 'poppins-light'
  },
  follow: {
    color:'black',
    fontSize:15,
    fontFamily:'roboto-regular',
    backgroundColor:'white',
    paddingHorizontal:16,
    paddingVertical:3,
    height:26,
    textAlignVertical:"center",
    borderRadius:13,
    borderWidth:1,
    borderColor:'transparent',
    overflow:'hidden'
  },
});

export default class UserFollowView extends PureComponent<
  UserFollowViewProps,
  UserFollowViewState
  > {
  constructor(props: UserFollowViewProps) {
    super(props);
  }

  render():JSX.Element{
    const p = this.props;
    return (
      <View style={styles.container}>
        <CachedImage
          resizeMode="cover"
          style={styles.image}
          source={{ uri: `${p.user.avatar}` }}
          cacheKey={`${p.user.avatar}t`}
        />
        <View style={styles.viewInfo}>
          <Text style={styles.name}>{p.user.name}</Text>
          <TouchableOpacity>
            <Text style={styles.follow}>Follow</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
