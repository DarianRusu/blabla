module.exports = {
  presets: [
    '@babel/preset-typescript',
    [
      '@babel/preset-env',
      {
        modules: 'auto',
        targets: {
          browsers: ['>0.25%', 'not dead'],
        },
      },
    ],
    '@babel/preset-react',
  ],
  plugins: [
    ['@babel/plugin-proposal-class-properties'],
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '~': './src',
          theme: './src/theme',
          utils: './src/utils',
          styled: './src/styled',
        },
      },
    ],
    [
      'babel-plugin-styled-components',
      {
        ssr: true,
        displayName: process.env.NODE_ENV !== 'test',
        namespace: 'sc',
      },
    ],
    [
      'inline-react-svg',
      {
        svgo: {
          plugins: [
            {
              name: 'removeViewBox',
              active: false,
            },
          ],
        },
      },
    ],
  ],
};
