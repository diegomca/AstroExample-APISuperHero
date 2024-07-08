import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";

//This code snippet is exporting a default configuration object using the `defineConfig` function provided by Astro. The configuration object specifies that the project is using Tailwind CSS and React as integrations. Additionally, it sets the output mode to "hybrid", which means the project will be built as a hybrid site that combines static and server-rendered content.
import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), react()],
  output: "hybrid",
  adapter: netlify(),
  // site: "https://diegomca.github.io/",
  // base: "AstroExample-APISuperHero",
});
