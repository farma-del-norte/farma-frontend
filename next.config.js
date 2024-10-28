const million = require('million/compiler')

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    S3_TOKEN: process.env.S3_TOKEN,
    BRANCHES_ENDPOINT: process.env.BRANCHES_ENDPOINT,
    BUDGETS_ENDPOINT: process.env.BUDGETS_ENDPOINT,
    CONCEPTS_CAT_ENDPOINT: process.env.CONCEPTS_CAT_ENDPOINT,
    DAMAGE_MAINTENANCE_ENDPOINT: process.env.DAMAGE_MAINTENANCE_ENDPOINT,
    DAMAGES_ENDPOINT: process.env.DAMAGES_ENDPOINT,
    DAMAGES_CAT_ENDPOINT: process.env.DAMAGES_CAT_ENDPOINT,
    DIMENSIONS_CAT_ENDPOINT: process.env.DIMENSIONS_CAT_ENDPOINT,
    MAINTENANCES_ENDPOINT: process.env.MAINTENANCES_ENDPOINT,
    MATERIALS_ENDPOINT: process.env.MATERIALS_ENDPOINT,
    MATERIALS_CAT_ENDPOINT: process.env.MATERIALS_CAT_ENDPOINT,
    REQUIREMENTS_CAT_ENDPOINT: process.env.REQUIREMENTS_CAT_ENDPOINT,
    MEDIA_ENDPOINT: process.env.MEDIA_ENDPOINT,
    SERVICES_ENDPOINT: process.env.SERVICES_ENDPOINT,
    SERVICES_CAT_ENDPOINT: process.env.SERVICES_CAT_ENDPOINT,
    SUPPLIERS_ENDPOINT: process.env.SUPPLIERS_ENDPOINT,
    USERS_ENDPOINT: process.env.USERS_ENDPOINT,
    VARIABLES_CAT_ENDPOINT: process.env.VARIABLES_CAT_ENDPOINT,
    ZONES_ENDPOINT: process.env.ZONES_ENDPOINT,
    S3_ENDPOINT: process.env.S3_ENDPOINT
  },
  trailingSlash: true,
  reactStrictMode: false,
  experimental: {
    esmExternals: false
  },
  transpilePackages: [
    '@fullcalendar/common',
    '@fullcalendar/react',
    '@fullcalendar/daygrid',
    '@fullcalendar/list',
    '@fullcalendar/timegrid'
  ],
  images: {
    domains: ['products-images-9fe5.s3.amazonaws.com', 'products-images-9fe5.s3.us-east-1.amazonaws.com']
  }
}

const millionConfig = {
  auto: {rsc: true}
}

module.exports = million.next(nextConfig, millionConfig)
