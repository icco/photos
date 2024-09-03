// @ts-check

/* eslint-disable @typescript-eslint/no-var-requires, @typescript-eslint/no-require-imports */
const { createSecureHeaders } = require("next-secure-headers");

const port = process.env.PORT || "8080";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  poweredByHeader: false,
  trailingSlash: false,
  productionBrowserSourceMaps: true,
  swcMinify: true,
  reactStrictMode: true,
  env: {
    PORT: port,
  },
  eslint: {
    dirs: ["src", "."],
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  async redirects() {
    return [
      {
        source: "/about",
        destination: "https://natwelch.com/wiki/about",
        permanent: true,
      },
      {
        source: "/privacy",
        destination: "https://natwelch.com/wiki/privacy-policy",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "NEL",
            value: JSON.stringify({ report_to: "default", max_age: 2592000 }),
          },
          {
            key: "Report-To",
            value: JSON.stringify({
              group: "default",
              max_age: 10886400,
              endpoints: [
                { url: `https://reportd.natwelch.com/report/photos` },
              ],
            }),
          },
        ],
      },
      {
        source: "/(.*)",
        headers: createSecureHeaders({
          referrerPolicy: "strict-origin-when-cross-origin",
          expectCT: true,
        }),
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'icco.imgix.net',
        port: '',
        pathname: '/photos/**',
      },
    ],
  },
  experimental: {},
};

module.exports = nextConfig;
