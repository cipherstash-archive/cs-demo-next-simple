/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    if (isServer) {
      return {
        ...config,
        entry() {
          return config.entry().then((entry) => {
            return Object.assign({}, entry, {
              migrate: "migrate.ts",
            })
          })
        }
      }
    }

    return config;
  }
}

module.exports = nextConfig
