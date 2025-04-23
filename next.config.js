/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  images: {
    domains: ['localhost'],
    unoptimized: true,
  },
  typescript: {
    // 프로덕션 빌드 시 타입 체크 오류를 경고로 처리
    ignoreBuildErrors: true,
  },
  eslint: {
    // 프로덕션 빌드 시 linting 오류를 경고로 처리
    ignoreDuringBuilds: true,
  },
  experimental: {
    // 애플리케이션 디렉토리 사용
    appDir: true,
  },
  webpack: (config) => {
    // 웹팩 설정 커스터마이징
    config.externals = [...config.externals, { canvas: 'canvas' }];
    return config;
  },
}

module.exports = nextConfig 