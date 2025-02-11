/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        domains: ["jongdeug.port0.org", "localhost"]
    },
    images: {
        remotePatterns: process.env.NODE_ENV === "production" ?
            [
                {
                    protocol: 'https',
                    hostname: 'jongdeug.port0.org',
                },
            ] :
            [
                {
                    protocol: "http",
                    hostname: 'localhost',
                }
            ]
    },
    // experimental: {
    //     optimizeCss: true,
    // }
};

export default nextConfig;
