import { Dimensions } from 'react-native';


export const width = Dimensions.get('window').width;
export const height = Dimensions.get('window').height;

export const userViewWidth = width / 3.5 - 32;
export const userViewHeight = (userViewWidth * 1.5);

export const trendingBoxViewWidth = width / 2 - 32;
export const trendingBoxViewHeight = (trendingBoxViewWidth * 1.2);

export const feedSmallViewWidth = width / 3 - 1.5;
export const feedSmallViewHeight = (feedSmallViewWidth * 3/2);

export const feedBigViewWidth = width;
export const feedBigViewHeight = (width * 3/2);
