import createAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = createAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

export default withBundleAnalyzer(nextConfig);
