/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    qualities: [75, 80, 85, 90],
    remotePatterns: [
      { protocol: "https", hostname: "lb-digital.de" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "plus.unsplash.com" },
    ],
  },
};

export default nextConfig;
