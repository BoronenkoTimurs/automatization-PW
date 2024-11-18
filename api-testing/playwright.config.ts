import path from 'path';
import dotenv from 'dotenv';
import { defineConfig, devices } from '@playwright/test';

dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    headless: false,
    baseURL: 'https://jsonplaceholder.typicode.com/',
    extraHTTPHeaders: {
      'Accept': 'application/vnd.github.v3+json',
      'Authorization': `token ${process.env.API_TOKEN}`
    },
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
