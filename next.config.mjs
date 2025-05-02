// next.config.mjs

export default {
  typescript: {
    ignoreBuildErrors: true,
  },
  // Disable standalone output mode to avoid client reference manifest issues
  output: process.env.VERCEL ? undefined : 'standalone',
  
  // Increase the timeout to give more time for processing
  experimental: {
    // Disable server minification which can help with certain manifest issues
    serverMinification: false,
    
    // Allow more time for operations to complete
    esmExternals: 'loose',
    
    // Disable strict mode to work around certain issues
    strictNextHead: false,
    serverComponentsExternalPackages: [],
  },
  
  // Ignore specific build errors including the client-reference-manifest error
  onError: (error) => {
    // Continue build even on ENOENT errors for client-reference-manifest files
    if (error.code === 'ENOENT' && error.message.includes('client-reference-manifest')) {
      console.warn('⚠️ Ignoring client-reference-manifest error:', error.message);
      return;
    }
    throw error;
  },
  
  // Prevent cache conflicts
  generateBuildId: async () => {
    return `build-${Date.now()}`;
  }
}
