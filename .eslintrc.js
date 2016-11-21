const eslintrc = {
  "extends": "airbnb",
  "env": {
    "browser": true,
    "node": true
  },
  "parser": "babel-eslint",
  "rules": {
    "comma-dangle": ["error", "never"],
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "react/forbid-prop-types": [0],
    "no-param-reassign": [0],
    "no-console": [0]
  }
}

module.exports = eslintrc;
