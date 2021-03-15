import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          Home: {
            screens: {
              HomeScreen: 'home',
            },
          },
          Discover: {
            screens: {
              DiscoverScreen: 'discover',
              TagScreen: 'tag'
            },
          },
          Profil: {
            screens: {
              ProfilScreen: 'profil',
            },
          },
        },
      },
      NotFound: '*',
    },
  },
};
