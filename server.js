import express from 'express';
import { createServer } from 'node:http';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { server as wisp } from '@mercuryworkshop/wisp-js';
import { createServer as createViteServer } from 'vite';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3000;
const isProd = process.env.NODE_ENV === 'production';

async function startServer() {
  const app = express();
  const server = createServer(app);

  server.on('upgrade', (req, socket, head) => {
    if (req.url?.startsWith('/wisp/')) {
      wisp.routeRequest(req, socket, head);
    } else {
      socket.end();
    }
  });

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(join(__dirname, 'build')));
    app.get('*', (req, res) => {
      res.sendFile(join(__dirname, 'build', 'index.html'));
    });
  }

  server.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
    console.log(`Wisp server ready at ws://localhost:${PORT}/wisp/`);
  });
}

startServer().catch((err) => {
  console.error('Error starting server:', err);
  process.exit(1);
});
