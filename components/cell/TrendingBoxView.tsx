import React, { PureComponent } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CachedImage from '../../model/CachedImage'
import * as Colors from '../../constants/Colors';
import * as Layout from '../../constants/Layout';
import { trendingBoxViewWidth, trendingBoxViewHeight } from '../../constants/Layout'


import Tag from '../../model/objects/parser/Tag';

interface TrendingBoxViewProps {
  tag: Tag;
}

interface TrendingBoxViewState { }

const styles = StyleSheet.create({
  container: {
    justifyContent:"space-between",
    width: trendingBoxViewWidth,
    height: trendingBoxViewHeight,
    borderWidth:1,
    borderRadius:8,
    borderColor: 'transparent',
    backgroundColor: Colors.gray,
    overflow: "hidden"
  },
  content: {
    backgroundColor:'transparent'
  },
  tag: {
    fontSize:14,
    color:'white',
    fontFamily:'poppins-bold'
  },
  viewPublication: {
    marginLeft:8,
    marginRight:'auto',
    paddingVertical:2,
    paddingHorizontal:4,
    borderWidth:1,
    borderRadius:2,
    borderColor: 'transparent',
    backgroundColor: Colors.lightGray,
    overflow: "hidden",
  },
  numberOfPublication: {
    fontSize:12,
    color:'white',
    fontFamily:'poppins-light'
  },
  topContent: {
    marginTop: 12,
    marginHorizontal:8,
    flexDirection:'row',
    justifyContent:'space-between'
  },
  bottomContent: {
    height: "50%",
    paddingHorizontal: 8,
    marginBottom: 8,
    width: "100%",
    flexDirection:"row"
  },
  partOfViewSmallImage:{
    flexDirection:'column',
    height: "100%",
    flex:1/2
  },
  bigImage: {
    borderWidth:1,
    borderRadius:8,
    borderColor: 'transparent',
    overflow: "hidden",
    flex:1/3,
    height: "100%",
    margin:2,
  },
  smallImage: {
    flex:1,
    borderWidth:1,
    borderRadius:8,
    borderColor: 'transparent',
    overflow: "hidden",
    height: "100%",
    marginHorizontal:2,
  },
  viewSmallImage: {
    flex:2/3,
    height: "100%",
    flexDirection:'row',
    marginVertical:2,
  }
});

export default class TrendingBoxView extends PureComponent<
  TrendingBoxViewProps,
  TrendingBoxViewState
  > {
  constructor(props: TrendingBoxViewProps) {
    super(props);
  }

  render():JSX.Element{
    const p = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={[styles.content, styles.topContent]}>
            <Text style={[styles.tag, { width: "80%" } ]}>#neondance</Text>
            <Text style={[styles.tag, { marginTop: 2 }]}> {">"} </Text>
          </View>
          <View style={[styles.content, styles.viewPublication]}>
            <Text style={styles.numberOfPublication}>6,5M</Text>
          </View>
        </View>
        <View style={[styles.content, styles.bottomContent]}>
          <CachedImage
            resizeMode="cover"
            style={styles.bigImage}
            source={{ uri: `${p.tag.name}` }}
            cacheKey={`${p.tag.name}t`}
          />
          <View style={styles.viewSmallImage}>
            <View style={styles.partOfViewSmallImage}>
              <CachedImage
                resizeMode="cover"
                style={[styles.smallImage, { marginBottom: 4 }]}
                source={{ uri: `${p.tag.name}` }}
                cacheKey={`${p.tag.name}t`}
              />
              <CachedImage
                resizeMode="cover"
                style={styles.smallImage}
                source={{ uri: `${p.tag.name}` }}
                cacheKey={`${p.tag.name}t`}
              />
            </View>
            <View style={styles.partOfViewSmallImage}>
              <CachedImage
                resizeMode="cover"
                style={[styles.smallImage, { marginBottom: 4 }]}
                source={{ uri: `${p.tag.name}` }}
                cacheKey={`${p.tag.name}t`}
              />
              <CachedImage
                resizeMode="cover"
                style={styles.smallImage}
                source={{ uri: `${p.tag.name}` }}
                cacheKey={`${p.tag.name}t`}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }
}
