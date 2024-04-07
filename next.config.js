const path = require('path')

/** @type {import('next').NextConfig} */

module.exports = {
  env: {
    S3_TOKEN: 'eyJhbGciOiJIUzI1NiJ9.eyJwcm9qZWN0TmFtZSI6IkZhcm1hIGRlbCBOb3J0ZSIsInByb2plY3RJZCI6IjEifQ.Lw9Iwt9omeeuNYm2KFDhtg7U9rzEjtayKFuW_kIf-C0',
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
  trailingSlash: true,
  reactStrictMode: false,
  webpack: config => {
    config.resolve.alias = {
      ...config.resolve.alias,
      apexcharts: path.resolve(__dirname, './node_modules/apexcharts-clevision')
    }

    return config
  }
}
