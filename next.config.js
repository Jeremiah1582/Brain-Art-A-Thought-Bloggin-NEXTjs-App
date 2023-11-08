/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: { //experimental: This field is used to enable experimental features in Next.js. In your case, you’re enabling the appDir feature and adding “mongoose” to the serverComponentsExternalPackages array.
      appDir: true,
      serverComponentsExternalPackages: ["mongoose"],
    },
    images: {//images: This field is used to specify a list of image domains that you want to use with the Next.js Image component. You’ve specified ‘lh3.googleusercontent.com’ as an image domain.
      domains: ['lh3.googleusercontent.com'],
    },
    webpack(config) {//webpack: This field is used to customize the webpack configuration. You’re enabling the topLevelAwait feature in your webpack configuration.
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

