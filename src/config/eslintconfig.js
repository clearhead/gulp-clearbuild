const config = {
  'ecmaFeatures': {
    'jsx': true,
    'modules': true
  },
  'env': {
    'browser': true,
    'es6': true,
    'node': true
  },
  'globals': {
    '$': false
  },
  'rules': {
    'comma-dangle': [2, 'always-multiline'],
    'consistent-return': 0,
    'curly': 0,
    'new-cap': 0,
    'no-shadow': 0,
    'no-underscore-dangle': 0,
    'quotes': [2, 'single'],
    'semi': [2, 'always'],
    'strict': 0,
  }
};

export default config;
