# Redmine and Telnyx Cypress E2E Tests
[Telnyx Test cases](https://docs.google.com/spreadsheets/d/1_JJTsVmNk-eWUP4K1xs9kRK0rm0OYyAG-T1ErtvM3_w/edit?usp=sharing) and [Redmine Test cases](https://docs.google.com/spreadsheets/d/1A6c_5Q1lrHuyC2I5ZRUfOlX3KjRopusODnLUszHinXw/edit?usp=sharing)

## Summary of repo
This repository contains automated End-to-End (E2E) tests for the Redmine and Telnyx websites. The automation framework is built using **Cypress** and **TypeScript**. It utilizes the Page Object Model (POM) design pattern for better maintainability, code reusability, and clean test structure.

## Requirements
Before running this project, make sure you have the following installed on your machine:
* **Node.js** (v20.x or higher is recommended)
* **npm** (comes with Node.js)
* Git

## Steps to install
1. Clone this repository to your local machine:
    ```bash
    git clone https://github.com/rcorded/Task3-Cypress-framework.git
    ```

2. Navigate to the project root directory:
    ```Bash
    cd Task3-Cypress-framework
    ```
    
3. Install all necessary dependencies (Cypress, TypeScript, and reporters): 
    ```Bash
    npm install
    ```
    
## Steps to launch

You can run the tests using the custom scripts defined in `package.json`.

- **To open the Cypress Test Runner (Interactive UI mode):**
    
    ```Bash
    npm run cy:open
    ```
    
- **To run all tests in headless mode (terminal only):**
    
    ```Bash
    npm run test:headless
    ```
    
- **To run tests in headed mode (visible browser window):**
  
    ```Bash
    npm run test:headed
    ```
    
- **To run tests specifically in the Chrome browser:**
  
    ```Bash
    npm run test:chrome
    ```
    
## Steps to creating the report

This project uses `cypress-mochawesome-reporter` to generate beautiful and readable HTML reports with embedded screenshots for failed tests.

1. To execute tests and automatically generate a report, run:
    
    ```Bash
    npm run test:report
    ```
    
2. Wait for the test execution to finish.
    
3. Navigate to the newly created `cypress/reports/html` directory.
    
4. Open the **`index.html`** file in any web browser to view your test results dashboard.
