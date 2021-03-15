import React, { PureComponent } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CachedImage from '../../model/CachedImage'
import * as Colors from '../../constants/Colors';
import { Button } from 'react-native-elements'
import * as Layout from '../../constants/Layout';
import Icon from 'react-native-vector-icons/FontAwesome';
import { userViewWidth, userViewHeight } from '../../constants/Layout'

import User from '../../model/objects/parser/User';

interface UserViewProps {
  user: User;
}

interface UserViewState { }

const styles = StyleSheet.create({
  container: {
    justifyContent:"space-between",
    flexDirection:'column',
    width: userViewWidth,
    height: userViewHeight,
    overflow: "hidden"
  },
  viewInfo: {
    alignItems:'center',
    flexDirection:'column'
  },
  image: {
    height: userViewWidth,
    borderRadius: userViewWidth / 2,
  },
  name: {
    fontSize:12,
    color:'white',
    fontFamily: 'poppins-medium'
  },
  followers: {
    fontSize:10,
    color:Colors.lightGray,
    fontFamily: 'poppins-light'
  }
});

export default class UserView extends PureComponent<
  UserViewProps,
  UserViewState
  > {
  constructor(props: UserViewProps) {
    super(props);
  }

  render():JSX.Element{
    const p = this.props;
    return (
      <View style={styles.container}>
        <CachedImage
          resizeMode="cover"
          style={styles.image}
          source={{ uri: `${p.user.name}` }}
          cacheKey={`${p.user.name}t`}
        />
        <View style={styles.viewInfo}>
          <Text style={styles.name}>azeaze</Text>
          <Text style={styles.followers}>1.8M Followers</Text>
        </View>
      </View>
    );
  }
}
