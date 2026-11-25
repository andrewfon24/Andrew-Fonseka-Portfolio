// Builds public/documents/Andrew_Fonseka_Resume.pdf and Andrew_Fonseka_Portfolio.pdf
// from documents/*.mjs and src/content/v3.js. Run `npm run build` first: the
// portfolio reuses the Aegon CRM diagram exactly as the built site renders it.
import { chromium } from '@playwright/test';
import { mkdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL, fileURLToPath } from 'node:url';
import resume from '../documents/resume.mjs';
import portfolio from '../documents/portfolio.mjs';

const root = fileURLToPath(new URL('..', import.meta.url));
const built = resolve(root, 'dist/case-studies/aegon/index.html');
if (!existsSync(built)) throw new Error('Run `npm run build` first: the portfolio reuses the built CRM diagram.');
const crmSvg = readFileSync(built, 'utf8').match(/<svg class="arch-svg"[\s\S]*?<\/svg>/)?.[0];
if (!crmSvg) throw new Error('CRM diagram not found in the built Aegon page.');

const out = resolve(root, 'documents/.build');
mkdirSync(out, { recursive: true });
const executablePath = process.env.CHROMIUM_PATH || (existsSync('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome') ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' : undefined);
const browser = await chromium.launch({ executablePath, args: ['--allow-file-access-from-files'] });
const page = await browser.newPage();

for (const [name, html, opts] of [
  ['Andrew_Fonseka_Resume', resume(), { width: '8.5in', height: '11in' }],
  ['Andrew_Fonseka_Portfolio', portfolio({ crmSvg }), { width: '11in', height: '8.5in' }],
]) {
  const src = resolve(out, `${name}.html`);
  writeFileSync(src, html);
  await page.goto(pathToFileURL(src).href, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  const overflow = await page.evaluate(() => [...document.querySelectorAll('.page')].map((p, i) => ({ page: i + 1, over: p.scrollHeight - p.clientHeight })).filter((x) => x.over > 1));
  if (overflow.length) console.warn(`${name}: content overflows`, overflow);
  await page.pdf({ path: resolve(root, `public/documents/${name}.pdf`), ...opts, printBackground: true, preferCSSPageSize: true });
  await page.screenshot({ path: resolve(out, `${name}.png`), fullPage: true });
  console.log('built', name);
}
await browser.close();
