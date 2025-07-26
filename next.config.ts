import type { NextConfig } from "next";
import type { Configuration as WebpackConfig } from "webpack";
const path = require("path");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  webpack(config: WebpackConfig) {
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "@": path.resolve(__dirname, "."),
    };
    return config;
  },
};

export default nextConfig;
