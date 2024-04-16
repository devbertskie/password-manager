/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    saltKey: process.env.SALT_KEY,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'files.edgestore.dev',
      },
    ],
  },
};

export default nextConfig;
