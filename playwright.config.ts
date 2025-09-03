import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

require('dotenv').config();

dotenv.config({ path: path.resolve(__dirname, './secrets.env') });

export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  retries: 0,
  use: {
    baseURL: 'https://stage.4shipper.transportly.eu',
    trace: 'on-first-retry',
    video: 'retain-on-failure',    
    screenshot: 'only-on-failure',    
    headless: false,
    viewport: { width: 1920, height: 1080 }
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});