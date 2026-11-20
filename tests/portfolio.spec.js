import {test,expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import {readFileSync,mkdirSync} from 'node:fs';
import {createHash} from 'node:crypto';
const slugs=['aegon','university','panasia','petmart','dats'];
const hash=x=>createHash('sha256').update(x).digest('hex');
mkdirSync('test-results/review',{recursive:true});

test('homepage positioning, header, actions and production metadata',async({page})=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto('/');
 await expect(page.locator('h1')).toContainText('what happens next.');
 await expect(page.locator('#work')).toContainText('259 funded loans');
 await expect(page.locator('.nav-email')).toHaveAttribute('href',/^mailto:andrew@andrewfonseka.com/);
 await expect(page.locator('.monogram')).toHaveText('AF');
 await expect(page.locator('.proof-strip a')).toHaveCount(4);
 for(const slug of slugs) expect(await page.locator('main a[href="/case-studies/' + slug + '/"]').count()).toBeGreaterThan(0);
 await expect(page.locator('.hero img[fetchpriority="high"]')).toHaveAttribute('src','/images/andrew-fonseka-480.webp');
 await expect(page.locator('.print-spread .campaign-figure')).toHaveCount(2);
 await expect(page.locator('.recommendation-card')).toHaveCount(3);
 await expect(page.locator('.preview-bar')).toHaveCount(0);
 await expect(page.locator('meta[name=robots]')).toHaveCount(0);
 await expect(page.locator('link[rel=canonical]')).toHaveAttribute('href','https://andrewfonseka.com/');
 await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content',/^https:\/\/andrewfonseka.com\//);
 expect(JSON.parse(await page.locator('script[type="application/ld+json"]').textContent())['@type']).toBe('Person');
 expect(errors).toEqual([]);
});

for(const width of [1440,1024,768,390,320])test(`responsive navigation, no overflow and accessibility at ${width}px`,async({page})=>{
 await page.setViewportSize({width,height:1000});await page.goto('/');await page.evaluate(()=>document.fonts.ready);
 expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBeLessThanOrEqual(width+1);
 const header=await page.locator('.site-header').boundingBox();const identity=await page.locator('.identity').boundingBox();const nav=await page.locator('.site-header nav').boundingBox();const email=await page.locator('.nav-email').boundingBox();
 if(width>1000){expect(Math.abs(nav.x+nav.width/2-width/2)).toBeLessThan(1);expect(identity.x+identity.width).toBeLessThan(nav.x);expect(email.x).toBeGreaterThan(nav.x+nav.width);}
 else expect(identity.x+identity.width).toBeLessThan(email.x);
 await page.emulateMedia({reducedMotion:'reduce'});await page.evaluate(()=>scrollTo(0,600));
 await expect(page.locator('.site-header')).toHaveClass(/is-scrolled/);
 expect((await page.locator('.site-header').boundingBox()).y).toBe(0);expect((await page.locator('.site-header').boundingBox()).height).toBe(header.height);
 for(const [name,id] of [['Results','work'],['Approach','capabilities'],['About','about'],['Contact','contact']]){
  await page.locator('.site-header nav').getByRole('link',{name,exact:true}).click();
  expect(new URL(page.url()).hash).toBe('#'+id);
  expect((await page.locator('#'+id).boundingBox()).y).toBeGreaterThanOrEqual(header.height);
 }
 const axe=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();expect(axe.violations).toEqual([]);
 for(const img of await page.locator('img').all()){
  await img.scrollIntoViewIfNeeded();await img.evaluate(i=>i.decode());
  expect(await img.evaluate(i=>i.naturalWidth)).toBeGreaterThan(0);
 }
 if([1440,390].includes(width)){
  await page.goto('/');await page.screenshot({path:`test-results/review/home-${width}.png`});await page.screenshot({path:`test-results/review/home-full-${width}.png`,fullPage:true});
  for(const id of ['about','toolkit','contact'])await page.locator('#'+id).screenshot({path:`test-results/review/${id}-${width}.png`});
 }
});

test('keyboard disclosures, evidence controls and tool groups',async({page})=>{
 await page.goto('/');await page.keyboard.press('Tab');await expect(page.locator('.skip')).toBeFocused();
 const entries=page.locator('.timeline-entry');await expect(entries).toHaveCount(6);await expect(page.locator('.timeline-entry[open]')).toHaveCount(0);
 for(const entry of await entries.all()){await entry.locator('summary').focus();await page.keyboard.press('Enter');await expect(entry.locator('.timeline-content')).toBeVisible();await page.keyboard.press('Enter');await expect(entry.locator('.timeline-content')).not.toBeVisible();}
 await page.locator('.recommendation-card details').first().locator('summary').click();await expect(page.locator('.recommendation-card details').first().locator('p')).toBeVisible();
 await page.locator('.decision > summary').click();
 for(const name of ['Priority colleges','Broad undergraduate','All campaigns']){const button=page.getByRole('button',{name,exact:true});await button.click();await expect(button).toHaveAttribute('aria-pressed','true');}
 await expect(page.locator('#toolkit .stack-column li img')).toHaveCount(26);
 await expect(page.locator('.recommendation-featured')).toContainText('Don Chanaka Perera');
 await expect(page.locator('#toolkit')).toContainText('Google Ads Search');

});

for(const slug of slugs)test(`case ${slug}: direct route, return pill spacing, mobile and accessibility`,async({page})=>{
 await page.goto(`/case-studies/${slug}/`);await page.reload();await expect(page.locator('h1')).toBeVisible();
 await expect(page.locator('link[rel=canonical]')).toHaveAttribute('href',`https://andrewfonseka.com/case-studies/${slug}/`);
 for(const width of [1440,390,320]){
  await page.setViewportSize({width,height:1000});expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBeLessThanOrEqual(width+1);
  const pill=await page.locator('.case-next a').boundingBox();const contact=await page.locator('.contact-band').boundingBox();expect(contact.y-pill.y-pill.height).toBeGreaterThanOrEqual(47);
 }
 await expect(page.getByRole('heading',{name:'My contribution'})).toBeVisible();
 await expect(page.locator('.case-visual')).toBeVisible();
 if(slug==='university'){
  await page.locator('.source-image > summary').click();const img=page.locator('.source-image img');await img.evaluate(i=>i.decode());
  const size=await img.evaluate(i=>({w:i.width,h:i.height,nw:i.naturalWidth,nh:i.naturalHeight}));expect(Math.abs(size.w/size.h-size.nw/size.nh)).toBeLessThan(.05);
 }
 if(slug==='aegon')await expect(page.locator('.case-page')).not.toContainText('$50');
 const axe=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();expect(axe.violations).toEqual([]);
 if(slug==='aegon'){await page.setViewportSize({width:1440,height:1000});await page.locator('.case-next').screenshot({path:'test-results/review/case-return.png'});}
 await page.locator('.case-next a').click();await expect(page).toHaveURL('/#work');
});

test('all local links, downloads, search files, images and 404 recovery',async({page,request})=>{
 const paths=new Set();
 for(const path of ['/',...slugs.map(s=>`/case-studies/${s}/`)]){
  await page.goto(path);
  for(const href of await page.locator('a[href^="/"]').evaluateAll(els=>els.map(el=>el.getAttribute('href').split('#')[0]||'/')))paths.add(href);
 }
 for(const path of paths)expect((await request.get(path)).status(),path).toBe(200);
 for(const kind of ['Resume','Portfolio']){const path=`/documents/Andrew_Fonseka_${kind}.pdf`;const res=await request.get(path);expect(hash(await res.body())).toBe(hash(readFileSync('public'+path)));expect(res.headers()['content-type']).toContain('application/pdf');}
 const sitemap=await request.get('/sitemap.xml');expect(await sitemap.text()).toContain('https://andrewfonseka.com/case-studies/university/');
 expect(await (await request.get('/robots.txt')).text()).toContain('Sitemap: https://andrewfonseka.com/sitemap.xml');
 const response=await page.goto('/missing-page/');expect(response.status()).toBe(404);await expect(page.locator('meta[name=robots]')).toHaveAttribute('content','noindex');await page.getByRole('link',{name:'See the case studies'}).click();await expect(page).toHaveURL('/#work');
});

test('essential content and navigation work without JavaScript',async({browser})=>{
 const context=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});const page=await context.newPage();await page.goto('http://127.0.0.1:4326/');await expect(page.locator('h1')).toBeVisible();await page.locator('.timeline-entry summary').first().click();await expect(page.locator('.timeline-content').first()).toBeVisible();await page.getByRole('link',{name:'See how admissions counted enrolments',exact:true}).click();await expect(page.locator('h1')).toBeVisible();await context.close();
});
