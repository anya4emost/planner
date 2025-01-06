import type { NextConfig } from "next";
import { API_BASE_URL } from "./api/urls";

const nextConfig: NextConfig = {
  // проксирование запросов через свой сервер, чтобы избежать cors ошибок
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${API_BASE_URL}/:path*`,
      },
    ];
  },
};

export default nextConfig;
