const { withContentlayer } = require("next-contentlayer");

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = withContentlayer(config);
