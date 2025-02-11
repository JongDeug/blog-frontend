/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        domains: ["jongdeug.port0.org", "localhost"]
    },
    experimental: {
        optimizeCss: true,
    }
};

export default nextConfig;
