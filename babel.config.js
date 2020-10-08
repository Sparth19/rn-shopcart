module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  //for react-native-paper
  env: {
    production: {
      plugins: ['react-native-paper/babel'],
    },
  },
};
