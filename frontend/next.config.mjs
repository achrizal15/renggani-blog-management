/** @type {import('next').NextConfig} */
const nextConfig = {
        env: {
                API_BACKEND_URL: process.env.API_BACKEND_URL,
        },
        images: {
                formats: ['image/avif', 'image/webp'],
        }
};

export default nextConfig;
