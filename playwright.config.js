const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  use: {
    viewport: { width: 1280, height: 720 },
    video: 'on', // Record video for all tests
    screenshot: 'only-on-failure',
  },
  reporter: [['line'], ['allure-playwright']],
});