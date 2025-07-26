import type { NextConfig } from "next";

const nextConfig = {
  reactStrictMode: true,
  webpack(config) {
    config.resolve.alias['@'] = path.resolve(__dirname, '.');
    return config;
  }
}
const path = require('path');
module.exports = nextConfig;

export default nextConfig;