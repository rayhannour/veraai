/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ['192.168.160.64'],
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        crypto: false,
      };
    }
    config.ignoreWarnings = [
      ...(config.ignoreWarnings || []),
      { module: /@paddleocr\/paddleocr-js/ },
      { module: /onnxruntime-web/ },
      { module: /@techstark\/opencv-js/ }
    ];
    return config;
  },
  turbopack: {
    resolveAlias: {
      fs: './src/lib/stub-fs.ts',
      path: './src/lib/stub-path.ts',
      'ort.bundle.min.mjs': './src/lib/empty.ts'
    }
  }
};

export default nextConfig;
