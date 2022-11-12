/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  images: {
    domains: [
      "i.imgur.com",
      "image.cnbcfm.com",
    ],
  },
}
