import React, { PureComponent } from 'react';
import { StyleSheet, View, TouchableWithoutFeedback } from 'react-native';
import * as Colors from '../../constants/Colors';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';

import { width } from '../../constants/Layout'

interface SearchHeaderProps {
  category: number;
  updateCategory: Function;
}

interface SearchHeaderState { }

const styles = StyleSheet.create({
  header: {
    height:width * 1.325,
    width:width,
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
    color:Colors.light,
    fontFamily:'poppins-medium',
    fontSize:14,
  },
  categoryNotSelected: {
    borderBottomColor:"transparent",
    borderBottomWidth:1,
    width:width/3,
    color:Colors.lightGray,
    fontFamily:'poppins-light',
    fontSize:14,
  }
});

export default class SearchHeader extends PureComponent<
  SearchHeaderProps,
  SearchHeaderState
  > {
  constructor(props: SearchHeaderProps) {
    super(props);
  }



  render():JSX.Element{
    const p = this.props;
    return (
      <View style={styles.header}>
        <View style={styles.viewUpdateCategoryFlatList}>
          <Button type="clear" title="People"
          buttonStyle={this.props.category == 0 ? styles.categorySelected : styles.categoryNotSelected}
          titleStyle={this.props.category == 0 ? styles.categorySelected : styles.categoryNotSelected}
          onPress={() => this.props.updateCategory(0)}
          TouchableComponent={TouchableWithoutFeedback} />
          <Button type="clear" title="Feed"
          titleStyle={this.props.category == 1 ? styles.categorySelected : styles.categoryNotSelected}
          buttonStyle={this.props.category == 1 ? styles.categorySelected : styles.categoryNotSelected}
          onPress={() => this.props.updateCategory(1)}
          TouchableComponent={TouchableWithoutFeedback} />
          <Button type="clear" title="Tags"
          titleStyle={this.props.category == 2 ? styles.categorySelected : styles.categoryNotSelected}
          buttonStyle={this.props.category == 2 ? styles.categorySelected : styles.categoryNotSelected}
          onPress={() => this.props.updateCategory(2)}
          TouchableComponent={TouchableWithoutFeedback} />
        </View>
      </View>
    );
  }
}
