import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testDir: './src/tests',
  timeout: 45000,
  use: {
    baseURL: 'https://api-v2.ziina.com',
    extraHTTPHeaders: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  },
  projects: [
    {
      name: 'Chrome',
      use: { browserName: 'chromium' },
    },
  ],
};

export default config;
