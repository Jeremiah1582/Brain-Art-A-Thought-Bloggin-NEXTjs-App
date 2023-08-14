/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      appDir: true,
      serverComponentsExternalPackages: ["mongoose"],
    },
    images: {
      domains: ['lh3.googleusercontent.com'],
    },
    webpack(config) {
      config.experiments = {
        ...config.experiments,
        topLevelAwait: true,
      }
      return config
    }
  }
  
  module.exports = nextConfig

//   this code is from the next auth documentation and it allows us to sign in using next auth

// /** @type {import('next').NextConfig} */
// const nextConfig = {}

// module.exports = nextConfig


// module.exports = {
//   env: {
//     PUBLIC_VARIABLE: process.env.PUBLIC_TEST_VARIABLE,// this is how we declare public variable that can be accessed via the browser in the front end
//   },
// };
// 

