require('babel-polyfill');
require('babel-register')(
  {
    plugins: [
      ['css-modules-transform',
        {
          generateScopedName: '[hash:8]',
          extensions: ['.css']
        }
      ]
    ]
  }
);
require('isomorphic-fetch');
require('./index.js');
