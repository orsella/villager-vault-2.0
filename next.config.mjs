/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dodo.ac",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
