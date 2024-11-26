Challenge 1 involved me writing a short automated test using Playwright with JavaScript. This test included writing code to progress various tasks on the TodoMVC application, including adding, verifying, completing, and deleting TODO items.

### Prerequisites

Before I got started, I ensured that I had the following installed required items installed and I have outlined my steps below:

1.  **Node.js**: Download and install Node.js

2.  **Playwright**: Install Playwright using npm:

    bash

    ```
    npm install playwright

    ```

3.  **Allure**: Install Allure for test reporting:

    bash

    ```
    npm install -g allure-commandline --save-dev

    ```

### Steps that are completed when running the Automated Test

1.  **Go to TodoMVC**:

    -   Navigate to the TodoMVC application.

2.  **Validate the URL**:

    -   Confirm that the current URL matches the expected URL of the TodoMVC application.

3.  **Add a TODO Item (Current Date)**:

    -   Add a TODO item with the text "TODO 1 - " concatenated with the current date.

4.  **Verify the New TODO Item**:

    -   Ensure that the new TODO item appears in the list.

5.  **Add a TODO Item (Next Day)**:

    -   Add a TODO item with the text "TODO 2 - " concatenated with the next day's date (tomorrow).

6.  **Mark Current Date TODO as Completed**:

    -   Mark the TODO item added with the current date as completed.

7.  **Verify Completion**:

    -   Verify that the TODO item is displayed as completed (e.g., struck-through text).

8.  **Delete TODO 2 Item**:

    -   Delete the TODO item with the text "TODO 2 - " (next day's date).

9.  **Verify Removal**:

    -   Ensure that the TODO 2 item is removed from the list.

I also ensured that there were images taken after every step, and there is a video recorded of the process (see items below)

### Test Reporting and Documentation

1.  **Test Report**:

    -   The user can then generate a test report summarizing the test results using Allure.

2.  **Screenshots**:

    -   The user can also include screenshots of the application at different stages of the test execution.

3.  **Video Recording**:

    -   Include a video recording of each execution.

### Running the Tests

To run the tests, the user can complete the following commands:

bash

```
# Run the Playwright tests
npx playwright test

# Generate and open the Allure report
allure generate --clean
allure open

```

### Conclusion

This automated test suite ensures that the steps outlined within the test are all completed and can be reviewed in a straightforward way, through checking the screenshots, video and the allure test summary.