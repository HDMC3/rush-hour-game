import { defineConfig, UserConfigExport } from 'vite';
import path from 'path';

export default defineConfig(({ mode }) => {
    const config: UserConfigExport = {
        root: 'src',
        publicDir: '../public',
        server: {
            host: '0.0.0.0'
        },
        build: {
            outDir: '../dist',
            assetsDir: './'
        }
    };

    config.base = mode === 'production' ? '/' + path.basename(process.cwd()) + '/' : '/';
    return config;
});
