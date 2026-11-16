import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname } from 'node:path';
const root=resolve('dist');
const types={'.html':'text/html; charset=utf-8','.css':'text/css','.js':'application/javascript','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.webp':'image/webp','.woff2':'font/woff2','.pdf':'application/pdf','.xml':'application/xml','.txt':'text/plain'};
http.createServer(async(req,res)=>{
 try {
  let path=resolve(root,'.'+decodeURIComponent(new URL(req.url,'http://localhost').pathname));
  if(!path.startsWith(root+'/')&&path!==root){res.writeHead(403);res.end();return;}
  try {if((await stat(path)).isDirectory())path+='/index.html';await stat(path);} catch {path=resolve(root,'404.html');res.statusCode=404;}
  const data=await readFile(path);res.setHeader('Content-Type',types[extname(path)]||'application/octet-stream');res.end(data);
 } catch {res.writeHead(500);res.end();}
}).listen(4326,'127.0.0.1');
