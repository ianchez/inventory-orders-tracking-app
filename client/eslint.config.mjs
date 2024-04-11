import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";
import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginImport from "eslint-plugin-import";
import pluginJsx from "eslint-plugin-jsx-a11y";

const config = [
  {
    languageOptions: {
      ecmaVersion: "latest",
      globals: globals.browser,
    },
    plugins: {
      js: pluginJs.configs.recommended,
      react: pluginReactConfig,
      "react-hooks": pluginReactHooks.configs.recommended,
      "jsx-a11y": pluginJsx.configs.recommended,
      import: pluginImport,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
    },
  },
];

export default config;