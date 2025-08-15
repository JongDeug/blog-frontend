/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: process.env.NODE_ENV === "production" ?
            [
                {
                    protocol: 'https',
                    hostname: 'jongdeug.duckdns.org',
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
