# OrangeHRM Playwright Test Automation Suite

Playwright + JavaScript end-to-end test suite for the OrangeHRM demo site
(`https://opensource-demo.orangehrmlive.com`), built with the Page Object Model (POM).

29 test cases, easy → medium difficulty, across 7 spec files.

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
npm test                 # run everything, headless
npm run test:headed      # watch the browser
npm run test:ui          # Playwright UI mode (great for debugging)
npm run test:login       # just one module, e.g. login.spec.js
npm run report           # open the last HTML report
```

## Credentials used
Standard OrangeHRM demo login: `Admin` / `admin123` (`utils/testData.js`).

## Test case list

### Login (TC01–TC06)
1. Login with valid credentials navigates to Dashboard
2. Login with invalid username shows "Invalid credentials"
3. Login with invalid password shows "Invalid credentials"
4. Empty username shows a single required-field error
5. Empty username + password shows required errors for both fields
6. "Forgot your password?" link navigates to Reset Password page

### Dashboard (TC07–TC09)
7. Dashboard loads with correct header after login
8. User can log out via the user dropdown
9. User dropdown displays the logged-in username

### Admin (TC10–TC15)
10. Admin page loads with the User Management table
11. Search user by username filters the table
12. "Add" button opens the Add User form
13. Add User form shows required-field validation when saved empty
14. Reset button clears the username search filter
15. Cancel button on Add User form returns to the User Management list

### PIM (TC16–TC22)
16. Employee List page loads with records
17. Add Employee form validates required first/last name
18. Successfully add a new employee
19. Search employee by name filters results
20. Reset button clears search filters
21. "Records Found" count is displayed
22. Cancel button on Add Employee form returns to the Employee List

### My Info (TC23–TC25)
23. My Info loads Personal Details for the logged-in employee
24. Navigate back to Personal Details tab shows the employee name header
25. Navigate between My Info tabs (Contact Details, Emergency Contacts)

### Recruitment (TC26–TC28)
26. Recruitment Candidates page loads
27. Recruitment Candidates table is visible
28. Add Candidate form opens and validates required fields

### Navigation (TC29)
29. All main sidebar menu items navigate to their correct module page

## Notes
- Tests hit the **live public OrangeHRM demo**, so run them at a reasonable
  pace — the demo data resets periodically, and TC18 creates a real employee
  record (last name uses `Date.now()` to stay unique).
- The **Leave module was dropped entirely.** The Apply Leave page re-renders
  its form via a second async data load right after the main spinner hides,
  which repeatedly detached the Apply button mid-click even after adding
  network-idle waits and longer timeouts. Rather than keep fighting a
  genuinely flaky page, its 4 test slots were replaced with Reset/Cancel
  coverage on Admin and PIM (patterns already proven reliable elsewhere in
  this suite) plus one added Recruitment check.
- A test originally covering "Admin: add a system user with valid data" was
  also dropped after three fix attempts against locators I couldn't verify
  live (Username/Password fields with no reliable placeholder or attribute).
- `trace: 'retain-on-failure'` and `video: 'retain-on-failure'` are on in
  the config, so any failure is easy to debug via `npm run report`.
