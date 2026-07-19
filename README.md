# OrangeHRM Playwright Test Automation Suite

Playwright + JavaScript end-to-end test suite for the OrangeHRM demo site
(`https://opensource-demo.orangehrmlive.com`), built with the Page Object Model (POM).

## Tech stack
- Playwright Test runner (`@playwright/test`)
- JavaScript (CommonJS)
- Page Object Model

## Project structure
```
orangehrm-playwright-tests/
├── playwright.config.js
├── package.json
├── pages/                  # Page Objects
│   ├── BasePage.js         # shared sidebar/topbar/logout
│   ├── LoginPage.js
│   ├── DashboardPage.js
│   ├── AdminPage.js
│   ├── PimPage.js
│   ├── MyInfoPage.js
│   └── RecruitmentPage.js
├── tests/                  # Specs (29 test cases total)
│   ├── login.spec.js       # TC01-TC06
│   ├── dashboard.spec.js   # TC07-TC09
│   ├── admin.spec.js       # TC10-TC15
│   ├── pim.spec.js         # TC16-TC22
│   ├── myInfo.spec.js      # TC23-TC25
│   ├── recruitment.spec.js # TC26-TC28
│   └── navigation.spec.js  # TC29
└── utils/
    └── testData.js         # credentials / test data
```

## Setup
```bash
npm install
npx playwright install --with-deps chromium
```

## Run tests
```bash
npm test                 
npm run test:headed      
npm run test:ui         
npm run test:login       
npm run report           
```

## Credentials used
Standard OrangeHRM demo login: `Admin` / `admin123` (`utils/testData.js`).
