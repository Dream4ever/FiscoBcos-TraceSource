/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: false,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/pages/login',
        permanent: false,
      },
      {
        source: '/sign/:path*',
        destination: 'http://www.whxy.club:5004/:path*',
        permanent: false,
      },
      {
        source: '/contract/:path*',
        destination: 'http://www.whxy.club:5002/:path*',
        permanent: false,
      },
    ]
  }
}
