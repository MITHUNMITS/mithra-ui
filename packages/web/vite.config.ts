import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    dts({
      entryRoot: "src",
      insertTypesEntry: true,
      tsconfigPath: "./tsconfig.json"
    })
  ],
  build: {
    lib: {
      entry: new URL("./src/index.ts", import.meta.url).pathname,
      name: "MithraUIWeb",
      cssFileName: "theme",
      fileName: (format) =>
        format === "umd" ? "mithra-ui-web.umd.cjs" : "mithra-ui-web.js",
      formats: [
        "es",
        "umd"
      ]
    },
    sourcemap: true,
    target: "es2022"
  }
});
