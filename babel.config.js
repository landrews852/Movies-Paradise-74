module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo', '@babel/preset-react'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['.'],
          extensions: ['.ts', '.tsx'],
          alias: {
            '@assets': './src/assets',
            '@components': './src/components',
            '@redux': './src/redux',
          },
        },
      ],
      ['module:react-native-dotenv'],
    ],
  };
};
