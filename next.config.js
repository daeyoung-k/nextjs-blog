/** @type {import('next').NextConfig} */

const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

const nextConfig_dev = {
  reactStrictMode: true,
  env: {
    mongodb_username: 'eodud4976',
    mongodb_password: 'eodud4976',
    mongodb_cluster: 'cluster0',
    mongodb_database: 'my-site-dev'
  }
}

const nextConfig_prod = {
    reactStrictMode: true,
    env: {
      mongodb_username: 'eodud4976',
      mongodb_password: 'eodud4976',
      mongodb_cluster: 'cluster0',
      mongodb_database: 'my-site'
    }
  }

module.exports = (phase) => {
    if (phase === PHASE_DEVELOPMENT_SERVER) {
        return nextConfig_dev
    } else {
        return nextConfig_prod
    }
}
