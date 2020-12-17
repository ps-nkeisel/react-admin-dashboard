const path = require("path");
const webpack = require("webpack");
// const withImages = require("next-images");
const withSass = require("@zeit/next-sass");
const withCSS = require("@zeit/next-css");
const withFonts = require("next-fonts");
const withPlugins = require("next-compose-plugins");
const optimizedImages = require("next-optimized-images");

require("dotenv").config();

module.exports = withPlugins(
  [
    [
      optimizedImages,
      {
        inlineImageLimit: 8192,
        imagesFolder: "images",
        imagesName: "[name]-[hash].[ext]",
        handleImages: ["jpeg", "jpg", "png", "svg"],
        optimizeImages: true,
        optimizeImagesInDev: false,
        mozjpeg: { quality: 80 },
        optipng: { optimizationLevel: 3 }
      }
    ],
    [withCSS],
    [withFonts],
    [withSass]
  ],
  {
    // Read more at: https://nextjs.org/docs/api-reference/next.config.js/exportPathMap
    exportTrailingSlash: true,
    generateBuildId: () => "vuukle-dashboard",
    exportPathMap: async function(
      defaultPathMap,
      { dev, dir, outDir, distDir, buildId }
    ) {
      return {
        "/": { page: "/" },
        "/register": { page: "/register" },
        "/login": { page: "/login" },
        "/email-confirmation": { page: "/email-confirmation" },
        "/change-password": { page: "/change-password" },
        "/forgot-password": { page: "/forgot-password" },
        "/integration": { page: "/integration" },
        "/moderation": { page: "/moderation" },
        "/realtime": { page: "/realtime" },
        "/reports": { page: "/reports" },
        "/realtime": { page: "/realtime" },
        "/revenue": { page: "/revenue" },
        "/settings": { page: "/settings" },
        "/analytics/comments": { page: "/analytics/comments" },
        "/analytics/emotes": { page: "/analytics/emotes" },
        "/analytics/overview": { page: "/analytics/overview" }
      };
    },
    env: {
      ENV: process.env.ENV,
      VERSION: process.env.VERSION,
      API_BASE_URL:
        process.env.ENV === "production"
          ? "https://api.vuukle.com/"
          : "https://apitest.vuukle.com/"
    },
    webpack(config, options) {
      // Add @ alias
      config.resolve.alias = {
        ...config.resolve.alias,
        "@": path.resolve(__dirname)
      };
      // Add environment variables
      const env = Object.keys(process.env).reduce((acc, curr) => {
        acc[`process.env.${curr}`] = JSON.stringify(process.env[curr]);
        return acc;
      }, {});
      config.plugins.push(new webpack.DefinePlugin(env));
      config.plugins.push(
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/)
      );

      config.devtool = "source-map";

      for (const plugin of config.plugins) {
        if (plugin.constructor.name === "UglifyJsPlugin") {
          plugin.options.sourceMap = true;
          break;
        }
      }

      if (config.optimization && config.optimization.minimizer) {
        for (const plugin of config.optimization.minimizer) {
          if (plugin.constructor.name === "TerserPlugin") {
            plugin.options.sourceMap = true;
            break;
          }
        }
      }

      if (!options.dev && !options.isServer) {
        config.output.filename = "[name]";
        const chunkFilename = config.output.chunkFilename;
        config.output.chunkFilename = chunkFilename.replace(
          ".[contenthash]",
          ""
        );
      }
      
      return config;
    }
  }
);
