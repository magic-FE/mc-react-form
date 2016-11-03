const eslintrc = {
  "extends": "airbnb",
  "env": {
    "browser": 1,
    "node": 1
  },
  "parser": "babel-eslint",
  "rules": {
    "comma-dangle": ["error", "never"],
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "react/forbid-prop-types": [0],
    "no-param-reassign": ["error", { "props": 0 }]
  }
}

module.exports = eslintrc;
