/** @type {import('next').NextConfig} */

const config = require('./global.config')
const withBundleAnalyzer = require('@zeit/next-bundle-analyzer')

const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    GITHUB_OAUTH_URL: config.GITHUB_OAUTH_URL,
    OAUTH_URL: config.OAUTH_URL,
  },
  analyzerBrowser: ['browser', 'both'].includes(process.env.BUNDLE_ANALYZE),
  bundleAnalyzerConfig: {
    server: {
      analyzerMode: 'static',
      reportFilename: '../bundles/server.html',
    },
    browser: {
      analyzerMode: 'static',
      reportFilename: '../bundles/client.html',
    },
  }

}

module.exports = withBundleAnalyzer(nextConfig)
