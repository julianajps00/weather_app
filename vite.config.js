import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    test: {
        environment: "jsdom", // simula o browser
        globals: true, // permite usar describe/test/expect globalmente
        setupFiles: "./src/setupTests.js" // onde colocamos configs globais
    },
});