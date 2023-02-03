/**
 * @type {import('@types/eslint').Linter.BaseConfig}
 */
module.exports = {
  extends: [
    "@remix-run/eslint-config",
    "@remix-run/eslint-config/node",
    "@remix-run/eslint-config/jest",

    "plugin:unicorn/all",
  ],
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": "error",
    "unicorn/filename-case": "off",
    "unicorn/prevent-abbreviations": "off",
  },
  // we're using vitest which has a very similar API to jest
  // (so the linting plugins work nicely), but it we have to explicitly
  // set the jest version.
  settings: {
    jest: {
      version: 27,
    },
  },
  ignorePatterns: [
    "remix.env.d.ts",
    "remix.config.js",
    "jest.config.js",
    ".eslintrc.js",
    "setup-test-env.ts",
  ],
};
