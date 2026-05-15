import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import license from "rollup-plugin-license";
import path from "node:path";

export default defineConfig({
  plugins: [
    tailwindcss(),
    sveltekit(),
    license({
      sourcemap: true,
      thirdParty: {
        includePrivate: true,
        multipleVersions: true,
        output: {
          file: path.join(__dirname, "license", "license.txt"),
          encoding: "utf-8",
        },
      },
    }),
  ],
});
