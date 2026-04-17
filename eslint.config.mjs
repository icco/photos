import { fixupConfigRules } from "@eslint/compat";
import tsParser from "@typescript-eslint/parser";
import nextConfig from "eslint-config-next";
import simpleImportSort from "eslint-plugin-simple-import-sort";

// eslint-config-next bundles a custom "next" parser whose scopeManager
// doesn't implement the addGlobals API added in eslint-scope v9 / ESLint 10.
// Strip it out and let @typescript-eslint/parser (which supports ESLint 10)
// handle all files instead.
const patchedNextConfig = fixupConfigRules(nextConfig).map((config) => {
  if (config.languageOptions?.parser?.meta?.name === "eslint-config-next/parser") {
    const { parser: _parser, ...languageOptions } = config.languageOptions;
    return { ...config, languageOptions };
  }
  return config;
});

const eslintConfig = [
  ...patchedNextConfig,
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      "import/first": "error",
      "import/newline-after-import": "error",
      "import/no-duplicates": "error",
      "simple-import-sort/exports": "error",
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            ["^\\u0000"],
            [
              "^(assert|buffer|child_process|cluster|console|constants|crypto|dgram|dns|domain|events|fs|http|https|module|net|os|path|punycode|querystring|readline|repl|stream|string_decoder|sys|timers|tls|tty|url|util|vm|zlib|freelist|v8|process|async_hooks|http2|perf_hooks)(/.*|$)",
            ],
            ["^@?\\w"],
            ["^"],
            ["^components(/.*|$)", "^lib(/.*|$)"],
            ["^\\."],
          ],
        },
      ],
    },
  },
];

export default eslintConfig;
