/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  images: {
    domains: [
      "day2daywholesale.com",
      "portal.day2daywholesale.com",
      "www.elementvape.com",
      "cdn.shopify.com",
      "firebasestorage.googleapis.com",
      "repziocdn.global.ssl.fastly.net",
      "images.junipercdn.com",
      "www.gomwi.com",
    ],
    unoptimized: true,
  },
  async rewrites() {
    return {
      fallback: [
        {
          source: "/:path*",
          destination: "https://day2daydash-seven.vercel.app/:path*",
        },
      ],
    };
  },
};

module.exports = nextConfig;
