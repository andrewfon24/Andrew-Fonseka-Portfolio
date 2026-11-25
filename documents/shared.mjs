// Shared styles and helpers for the PDF documents. Fonts and images load from
// the local checkout, so the PDFs match the site without any network access.
import { pathToFileURL, fileURLToPath } from 'node:url';
import { resolve } from 'node:path';

const root = fileURLToPath(new URL('..', import.meta.url));
export const file = (p) => pathToFileURL(resolve(root, p)).href;
export const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const font = (family, weight, path) => `@font-face{font-family:'${family}';font-weight:${weight};font-style:normal;src:url('${file(path)}') format('woff2');}`;

export const baseCss = `
${font('Inter', 400, 'node_modules/@fontsource/inter/files/inter-latin-400-normal.woff2')}
${font('Inter', 500, 'node_modules/@fontsource/inter/files/inter-latin-500-normal.woff2')}
${font('Inter', 600, 'node_modules/@fontsource/inter/files/inter-latin-600-normal.woff2')}
${font('Archivo', 600, 'node_modules/@fontsource/archivo/files/archivo-latin-600-normal.woff2')}
${font('Archivo', 700, 'node_modules/@fontsource/archivo/files/archivo-latin-700-normal.woff2')}
:root{--ink:#0c2037;--body:#3d4f63;--muted:#5b6b7d;--blue:#2164a9;--blue-ink:#1b548f;--blue-2:#4f8fd1;--blue-soft:#9db8d3;--blue-tint:#d7e6f6;--pale:#eef5fc;--pale-2:#e3eefa;--rule:#d6e0ea;--ground:#f7faff;--on-navy:#c4d2e1;--slate:#7f93a8;--display:'Archivo',sans-serif;--text:'Inter',sans-serif}
*{box-sizing:border-box}
html,body{margin:0;padding:0}
body{font-family:var(--text);color:var(--body);-webkit-print-color-adjust:exact;print-color-adjust:exact}
h1,h2,h3,h4{font-family:var(--display);color:var(--ink);font-weight:600;margin:0}
p{margin:0}
a{color:var(--blue-ink);text-decoration:none}
.num{font-variant-numeric:tabular-nums lining-nums}
.eyebrow{font-size:10px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:var(--blue-ink)}
.stat{font-family:var(--display);font-weight:700;color:var(--blue);letter-spacing:-.02em;line-height:1}
.note{font-size:9px;line-height:1.45;color:var(--muted);border-left:2px solid var(--blue-soft);padding-left:7px}
`;

// Zero-baseline bars, same rule as the site's MiniBars component.
export function bars(title, rows, highlight = rows.length - 1) {
  const max = Math.max(...rows.map((r) => r[1]));
  return `<figure class="bars"><figcaption>${esc(title)}</figcaption>${rows
    .map(([label, v, display], i) => `<div class="bar-row"><span class="bl">${esc(label)}</span><span class="bt"><span class="bb${i === highlight ? ' is-blue' : ''}" style="width:${((v / max) * 100).toFixed(1)}%"></span></span><b class="num">${esc(display)}</b></div>`)
    .join('')}</figure>`;
}

export function evidence(items) {
  return `<div class="evidence"><b>Evidence note</b><dl>${items.map(([k, v]) => `<dt>${esc(k)}</dt><dd>${esc(v)}</dd>`).join('')}</dl></div>`;
}
