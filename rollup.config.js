// rollup.config.js
import { terser } from "rollup-plugin-terser";
import babel from "@rollup/plugin-babel";

const devMode = process.env.NODE_ENV === "development";
console.log(`${devMode ? "development" : "production"} mode bundle`);

export default [
  {
    input: "src/index.js",
    output: {
      file: "dist/index.js",
      format: "cjs",
      sourcemap: devMode ? "inline" : false,
    },
    plugins: [
      babel({
        babelHelpers: "bundled",
        presets: ["@babel/preset-env", "@babel/preset-react"],
      }),
    ],
  },
];
