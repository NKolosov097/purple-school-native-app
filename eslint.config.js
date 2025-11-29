const { defineConfig } = require("eslint/config")
const expoConfig = require("eslint-config-expo/flat")

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ["dist/*"],
    basePath: "./",
    settings: {
      "import/resolver": {
        alias: {
          map: [
            ["@shared", "./shared"],
            ["@features", "./features"],
            ["@providers", "./providers"],
            ["@entities", "./entities"],
            ["@hooks", "./hooks"],
          ],
          extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
        },
        node: {
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
      },
    },
    rules: {},
  },
])
