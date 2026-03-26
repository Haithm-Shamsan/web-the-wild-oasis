// .eslintrc.cjs
module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'react-app', // From your .json config (useful if it brings specific rules for React apps)
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'], // Keep ignoring the dist folder and itself
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  settings: {
    react: {
      version: '18.2', // Specifying React version, from your cjs file
    },
  },
  plugins: [
    'react-refresh', // Vite-specific plugin for HMR
  ],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
        
   
  
     ],"react/prop-types": "off",
    // You can add other custom rules if necessary
    



  },
  
  "overrides": [
    {
      "files": [".jsx"], // Specify the file path
      "rules": {
        "react/prop-types": "off"
      }
    }
  ]


}
