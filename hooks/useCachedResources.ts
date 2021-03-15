/* eslint-disable global-require */
import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import * as React from 'react';

export default function useCachedResources(): boolean {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();
        await Font.loadAsync({
          ...Ionicons.font,
          'poppins-regular': require('../assets/fonts/Poppins/Poppins-Regular.ttf'),
          'poppins-medium': require('../assets/fonts/Poppins/Poppins-Medium.ttf'),
          'poppins-bold': require('../assets/fonts/Poppins/Poppins-Bold.ttf'),
          'poppins-light': require('../assets/fonts/Poppins/Poppins-Light.ttf'),
          'roboto-light': require('../assets/fonts/Roboto/Roboto-Light.ttf'),
          'roboto-regular': require('../assets/fonts/Roboto/Roboto-Regular.ttf'),
          'roboto-medium': require('../assets/fonts/Roboto/Roboto-Medium.ttf'),
          'roboto-bold': require('../assets/fonts/Roboto/Roboto-Bold.ttf'),
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
