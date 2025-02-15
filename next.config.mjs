/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        // remotePatterns: [
        //     {
        //         protocol: 'https',
        //         hostname: 'jongdeug.ddns.net',
        //     },
        // ],
        remotePatterns: process.env.NODE_ENV === "production" ?
            [
                {
                    protocol: 'https',
                    hostname: 'jongdeug.ddns.net',
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
