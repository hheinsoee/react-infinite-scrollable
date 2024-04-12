import babel from "@rollup/plugin-babel";

const devMode = process.env.NODE_ENV === "development";
console.log(`${devMode ? "development" : "production"} mode bundle`);

export default [
  {
    input: "src/index.js",
    output: [
      {
        file: "dist/index.js",
        format: "es",
        sourcemap: devMode ? "inline" : false,
      },
      {
        file: "dist/index.cjs",
        format: "cjs",
        sourcemap: devMode ? "inline" : false,
      },
      {
        file: "dist/index.umd.js",
        format: "es",
        sourcemap: devMode ? "inline" : false,
      },
      {
        file: "dist/index.es.js",
        format: "iife",
        sourcemap: devMode ? "inline" : false,
        name: "InfiniteScrollAble",
      },
    ],
    plugins: [
      babel({
        babelHelpers: "bundled",
        presets: ["@babel/preset-env", "@babel/preset-react"],
      }),
    ],
  },
];
