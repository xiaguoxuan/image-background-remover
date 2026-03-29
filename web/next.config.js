/** @type {import('next').NextConfig} */
const nextConfig = {
   output: 'export', // 必须开启
  images: {
    unoptimized: true, // 静态导出必须开启这个
  },
  
  // 核心：允许公网 IP 访问开发资源 (Next.js 15/16)
  allowedDevOrigins: ['43.156.161.212', '43.156.161.212:3001'],
  
  experimental: {
    serverActions: {
      allowedOrigins: ['43.156.161.212:3001', 'localhost:3001'],
    },
  },

  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET,POST,OPTIONS" },
          { key: "Access-Control-Allow-Headers", value: "Content-Type, X-Api-Key" },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
