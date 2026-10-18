import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  trailingSlash: true,
  poweredByHeader: false,
  async redirects() {
    return [{ source: "/", destination: "/en/", permanent: false }];
  },
};
export default nextConfig;
