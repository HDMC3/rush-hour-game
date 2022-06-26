import { defineConfig } from 'vite';

export default defineConfig({
    root: 'src',
    publicDir: '../public',
    server: {
        host: '0.0.0.0'
    },
    build: {
        outDir: '../dist',
        assetsDir: './'
    }
})