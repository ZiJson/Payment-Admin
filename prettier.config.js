/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
const config = {
  "trailingComma": "es5",
  "tabWidth": 4,
  "semi": false,
  "singleQuote": true,
  plugins: ["prettier-plugin-tailwindcss"],
};

export default config;
