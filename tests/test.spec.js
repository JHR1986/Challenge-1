const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

// Configure my test settings in respect of viewport, video & screenshot
test.use({
  viewport: { width: 1280, height: 720 },
  video: 'on', // Record video for all tests
  screenshot: 'only-on-failure',
});

test.describe('TodoMVC', () => {
  // Set global timeout to 60 seconds
  test.setTimeout(60000);

  // Helper function to take a screenshot
  const takeScreenshot = async (page, step) => {
    await page.screenshot({ path: `screenshots/${step}.png` });
  };

  // Define beforeEach hook - including confirming that the URL is correct 
  test.beforeEach(async ({ page }) => {
    await page.goto('https://todomvc.com/examples/react/dist/');
    expect(page.url()).toBe('https://todomvc.com/examples/react/dist/');
    await takeScreenshot(page, 'step-1-initial');
  });

  // Define the main test
  test('UI testing', async ({ page }) => {
    const currentDate = new Date().toISOString().split('T')[0];
    const tomorrowDate = new Date(Date.now() + 86400000).toISOString().split('T')[0];

    // Step 3: Add the TODO Item 1 & take a screenshot
    await page.fill('.new-todo', `TODO 1 - ${currentDate}`);
    await page.press('.new-todo', 'Enter');
    await page.waitForTimeout(1000); // Add a brief wait to ensure the action completes
    await takeScreenshot(page, 'step-3-add-todo-1');

    // Step 4: Verify the TODO Item 1 with "expect"
    const todo1 = await page.locator('.todo-list li').first();
    await expect(todo1).toContainText(`TODO 1 - ${currentDate}`);
    await takeScreenshot(page, 'step-4-verify-todo-1');

    // Step 5: Add TODO Item 2 for the next date (e.g. tomorrow)
    await page.fill('.new-todo', `TODO 2 - ${tomorrowDate}`);
    await page.press('.new-todo', 'Enter');
    await page.waitForTimeout(1000); // Add a brief wait to ensure the action completes
    await takeScreenshot(page, 'step-5-add-todo-2');

    // Step 6: Mark TODO Item 1 as complete
    const todo1Toggle = todo1.locator('.toggle');
    await todo1Toggle.click();
    await page.waitForTimeout(1000); // Add a brief wait to ensure the action completes
    await takeScreenshot(page, 'step-6-complete-todo-1');

    // Step 7: Verify that TODO Item 1 has been completed
    await expect(todo1).toHaveClass(/completed/);
    await takeScreenshot(page, 'step-7-verify-completed-todo-1');

    // Step 8: Delete TODO Item 2
    const todo2 = await page.locator('.todo-list li:nth-child(2)');
    await todo2.hover();
    await page.click('.todo-list li:nth-child(2) .destroy');
    await page.waitForTimeout(1000); // Add a brief wait to ensure the action completes
    await takeScreenshot(page, 'step-8-delete-todo-2');

    // Step 9: Verify TODO Item 2 has been removed
    await expect(page.locator('.todo-list li')).toHaveCount(1);
    await takeScreenshot(page, 'step-9-verify-removed-todo-2');

    // Take a screenshot of the final state
    await page.screenshot({ path: 'todo-final.png' });
  });

  // Define afterEach hook to save the video with increased timeout
  test.afterEach(async ({ page }, testInfo) => {
    testInfo.setTimeout(120000); // Increase timeout for afterEach hook
    const video = await page.video();
    if (video) {
      const videoPath = await video.path();
      const allureVideoPath = path.join(__dirname, 'allure-results', `video-${new Date().getTime()}.mp4`);
      fs.copyFileSync(videoPath, allureVideoPath);
    }
    await page.close(); // Ensure the page is closed after each test
  });
});