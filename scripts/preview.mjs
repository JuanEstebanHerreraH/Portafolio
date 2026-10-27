import http from 'node:http';
import {readFile, stat} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const port = Number(process.argv[2] || 8080);
if (!Number.isInteger(port) || port < 1024 || port > 65535) throw new Error('Usa un puerto entre 1024 y 65535.');
const mime = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.woff2':'font/woff2','.md':'text/plain; charset=utf-8','.txt':'text/plain; charset=utf-8'};
const server = http.createServer(async (request, response) => {
  if (!['GET','HEAD'].includes(request.method)) { response.writeHead(405); response.end(); return; }
  try {
    const pathname = decodeURIComponent(new URL(request.url, 'http://127.0.0.1').pathname);
    const segments = pathname.split(/[\\/]+/);
    if (segments.some(segment=>segment.startsWith('.'))) { response.writeHead(403); response.end('Forbidden'); return; }
    const absolute = path.resolve(root, '.' + (pathname === '/' ? '/index.html' : pathname));
    if (!absolute.startsWith(root) || !(await stat(absolute)).isFile()) throw new Error('Not found');
    const body = await readFile(absolute);
    response.writeHead(200, {'Content-Type':mime[path.extname(absolute)] || 'application/octet-stream','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});
    response.end(request.method === 'HEAD' ? undefined : body);
  } catch {
    response.writeHead(404, {'Content-Type':'text/plain; charset=utf-8'});
    response.end('Archivo no encontrado');
  }
});
server.listen(port, '127.0.0.1', () => console.log('Portafolio: http://127.0.0.1:' + port + '\nDetener: Ctrl+C'));
server.on('error', error => { console.error(error.message); process.exitCode = 1; });
