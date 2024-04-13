const million = require('million/compiler')

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    S3_TOKEN:
      'eyJhbGciOiJIUzI1NiJ9.eyJwcm9qZWN0TmFtZSI6IkZhcm1hIGRlbCBOb3J0ZSIsInByb2plY3RJZCI6IjEifQ.Lw9Iwt9omeeuNYm2KFDhtg7U9rzEjtayKFuW_kIf-C0'
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
