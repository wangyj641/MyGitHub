/** @type {import('next').NextConfig} */

const config = require('./global.config')

const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    GITHUB_OAUTH_URL: config.GITHUB_OAUTH_URL,
    OAUTH_URL: config.OAUTH_URL,
  }
}

module.exports = nextConfig
