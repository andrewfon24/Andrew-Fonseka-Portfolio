import {defineConfig} from '@playwright/test';
export default defineConfig({
 testDir:'./tests',fullyParallel:false,workers:1,reporter:'list',timeout:60000,
 use:{baseURL:'http://127.0.0.1:4326',viewport:{width:1440,height:1000},launchOptions:{executablePath:process.env.CHROMIUM_PATH},trace:'retain-on-failure'},
 webServer:{command:`"${process.execPath}" scripts/serve.mjs`,url:'http://127.0.0.1:4326',reuseExistingServer:false}
});
