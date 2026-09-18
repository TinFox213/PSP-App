import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, Plugin } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

// Vite plugin to emulate Vercel Serverless Functions (/api/*) in local development
function vercelApiDevPlugin(): Plugin {
  return {
    name: 'vercel-api-dev-middleware',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url?.startsWith('/api/')) {
          return next();
        }

        try {
          const url = new URL(req.url, `http://${req.headers.host || 'localhost:3000'}`);
          const route = url.pathname.replace('/api/', '').split('/')[0];

          let handlerModule: any = null;
          if (route === 'health') {
            handlerModule = await import('./api/health.ts');
          } else if (route === 'profile') {
            handlerModule = await import('./api/profile.ts');
          } else if (route === 'intake-math') {
            handlerModule = await import('./api/intake-math.ts');
          } else if (route === 'meals') {
            handlerModule = await import('./api/meals.ts');
          } else if (route === 'recommendations') {
            handlerModule = await import('./api/recommendations.ts');
          } else if (route === 'voice-parse') {
            handlerModule = await import('./api/voice-parse.ts');
          }

          if (handlerModule && typeof handlerModule.default === 'function') {
            const wrapRes = {
              setHeader: (k: string, v: string) => res.setHeader(k, v),
              status: (code: number) => {
                res.statusCode = code;
                return {
                  json: (data: any) => {
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify(data));
                  },
                  send: (data: any) => res.end(data),
                };
              },
            };

            if (req.method === 'POST' || req.method === 'PUT') {
              let bodyStr = '';
              req.on('data', (chunk) => {
                bodyStr += chunk;
              });
              req.on('end', () => {
                try {
                  (req as any).body = JSON.parse(bodyStr);
                } catch {
                  (req as any).body = bodyStr;
                }
                handlerModule.default(req, wrapRes);
              });
              return;
            } else {
              return handlerModule.default(req, wrapRes);
            }
          }

          next();
        } catch (error) {
          console.error('[API Dev Error]:', error);
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'Internal Server Error', details: String(error) }));
        }
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [
      vercelApiDevPlugin(),
      react(),
      tailwindcss(),
      VitePWA({
        registerType: 'autoUpdate',
        workbox: {
          cleanupOutdatedCaches: true,
          clientsClaim: true,
          skipWaiting: true,
        },
        devOptions: {
          enabled: true,
        },
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve('.'),
      },
    },
    server: {
      port: 3000,
      host: '0.0.0.0',
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
