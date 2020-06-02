import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    Root: {
      path: 'Search',
      screens: {
        Home: 'home',
        Links: 'links',
      },
    },
  },
};
