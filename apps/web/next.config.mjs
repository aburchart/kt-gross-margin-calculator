/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    '@kc-book-works/calculators',
    '@kc-book-works/calculator-ui',
  ],
  async redirects() {
    return [
      {
        source: '/gross-margin-calculator',
        destination: '/tools/gross-margin-calculator',
        permanent: true,
      },
      {
        source: '/door-crasher-calculator',
        destination: '/tools/door-crasher-calculator',
        permanent: true,
      },
      {
        source: '/discount-impact',
        destination: '/tools/discount-impact',
        permanent: true,
      },
      {
        source: '/dc-promotion',
        destination: '/tools/dc-promotion',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
