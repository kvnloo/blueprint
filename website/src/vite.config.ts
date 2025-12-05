import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { createHtmlPlugin } from 'vite-plugin-html';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [
        createHtmlPlugin({
          minify: true,
          inject: {
            data: {
              meticulousScript:
                `<script
                  data-recording-token="UBZxdxK9jcB2WFbzX2TSxvpFAzfTj6cOW6Gm1ZNO"
                  data-is-production-environment="true"
                  src="https://snippet.meticulous.ai/v1/meticulous.js"
                ></script>`,
            },
          },
        }),
        react()
      ],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
