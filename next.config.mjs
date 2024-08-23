import { withJuno } from '@junobuild/nextjs-plugin';

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    unoptimized: true,
  },
  // open env to client side
  webpack: (config, { webpack, isServer }) => {
    const envs = {};

    Object.keys(process.env).forEach(env => {
      if (env.startsWith('NEXT_PUBLIC_')) {
        envs[env] = process.env[env];
      }
    })

    if (!isServer) {
      config.plugins.push(new webpack.DefinePlugin({
        'process.env': JSON.stringify(envs),
      }))
    }

    return config
  },
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    config.externals.push('pino-pretty', 'encoding');
    return config;
  },
  output: 'export',
  distDir: 'dist',
};

export default withJuno({ nextConfig });
