# Redmine and Telnyx Cypress E2E Tests
[Telnyx Test cases](https://docs.google.com/spreadsheets/d/1eNaDr4WTsBuC0JEtp6ykBSierkGl94C5CFpRU_oxSCc/edit?usp=sharing) 

## Summary of repo
This repository contains automated End-to-End (E2E) tests for Telnyx website. The automation framework is built using **Cypress** and **TypeScript**. It utilizes the Page Object Model (POM) design pattern for better maintainability, code reusability, and clean test structure.

## Requirements
Before running this project, make sure you have the following installed on your machine:
* **Node.js** (v20.x or higher is recommended)
* **npm** (comes with Node.js)
* **Git**
* **Bash terminal** (Mac/Linux users have this by default. Windows users should use Git Bash or WSL)

## Steps to install
1. Clone this repository to your local machine:
    ```bash
    git clone https://github.com/rcorded/Task3-Cypress-framework.git
    ```

2. Navigate to the project root directory:
    ```Bash
    cd Task3-Cypress-framework
    ```
    
3. Make the runner script executable:

   ```Bash
   chmod +x cypress_runner.sh
   ```

4. Install all necessary dependencies using the runner script:

   ```Bash
   ./cypress_runner.sh install
   ``` 

## How to Run Tests
You can execute tests using the provided ./cypress_runner.sh script. It supports various commands and arguments to fit your testing needs.

To open the Cypress Test Runner (Interactive UI mode):

```Bash
./cypress_runner.sh open
```

To run all tests in headless mode (default Electron browser):

```Bash
./cypress_runner.sh run
```

To run all tests in headed mode (visible browser window):

```Bash
./cypress_runner.sh headed
```

To run tests in a specific browser (e.g., chrome, edge, electron):

```Bash
./cypress_runner.sh browser chrome
```

To run a specific test file:

```Bash
./cypress_runner.sh spec cypress/e2e/solutions.cy.ts
```

To run a specific test file in a specific browser:

```Bash
./cypress_runner.sh spec cypress/e2e/solutions.cy.ts chrome
```

Note: For a full list of available commands at any time, run 

```Bash
./cypress_runner.sh help
```   

## Steps to creating the report

This project uses `cypress-mochawesome-reporter` to generate beautiful and readable HTML reports with embedded screenshots for failed tests.

1. To execute tests and automatically generate a report, run:
    
    ```Bash
    ./cypress_runner.sh report
    ```
    
2. Wait for the test execution to finish.
    
3. Navigate to the newly created `cypress/reports/html` directory.
    
4. Open the **`index.html`** file in any web browser to view your test results dashboard.
