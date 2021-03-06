import { normalize } from 'normalizr';
import { browser, element, by } from 'protractor';

import { ApplicationsPage } from '../applications/applications.po';
import { e2e } from '../e2e';
import { ConsoleUserType } from '../helpers/e2e-helpers';
import { SideNavigation, SideNavMenuItem } from '../po/side-nav.po';
import { ApplicationE2eHelper } from './application-e2e-helpers';
import { ApplicationBasePage } from './po/application-page.po';
import { CFPage } from '../po/cf-page.po';
import * as path from 'path';

let nav: SideNavigation;
let appWall: ApplicationsPage;
let applicationE2eHelper: ApplicationE2eHelper;

const cfName = e2e.secrets.getDefaultCFEndpoint().name;
const orgName = e2e.secrets.getDefaultCFEndpoint().testOrg;
const spaceName = e2e.secrets.getDefaultCFEndpoint().testSpace;

let applicationZipFile;

describe('Application Deploy - ', function () {
  const testAppName = ApplicationE2eHelper.createApplicationName();
  const appDetails = {
    cfGuid: '',
    appGuid: ''
  };

  beforeAll(() => {
    applicationZipFile = path.normalize(path.join(__dirname, '../resources/go-env.zip'));
    nav = new SideNavigation();
    appWall = new ApplicationsPage();
    const setup = e2e.setup(ConsoleUserType.user)
      .clearAllEndpoints()
      .registerDefaultCloudFoundry()
      .connectAllEndpoints(ConsoleUserType.user)
      .connectAllEndpoints(ConsoleUserType.admin)
      .getInfo(ConsoleUserType.admin);
    applicationE2eHelper = new ApplicationE2eHelper(setup);
  });

  afterAll(() => {
    browser.waitForAngularEnabled(true);
  });

  let originalTimeout = 40000;
  beforeAll(() => nav.goto(SideNavMenuItem.Applications));

  // Might take a bit longer to deploy the app than the global default timeout allows
  beforeEach(function() {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 120000;
  });

  afterEach(function() {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });

  // Allow up to 2 minutes for the application to be deployed
  describe('Should deploy app from local archive file', () => {

    let deployApp;

    beforeAll(() => {
      // File input box needs to be visible for testing
      const script = 'var style = document.createElement("style");' +
      'style.innerHTML = "#localPathSelectFile { height: auto !important; visibility: visible !important; width: auto !important; }";' +
      'document.head.appendChild(style);';
      browser.executeScript(script);

      // Should be on deploy app modal
      appWall.waitForPage();
      expect(appWall.isActivePage()).toBeTruthy();
      deployApp = appWall.clickDeployApp();
    });

    it('Should deploy app', () => {

      expect(deployApp.header.getTitleText()).toBe('Deploy');
      // Fill in form
      deployApp.stepper.getStepperForm().fill({ 'cf': cfName });
      deployApp.stepper.getStepperForm().fill({ 'org': orgName });
      deployApp.stepper.getStepperForm().fill({ 'space': spaceName });
      expect(deployApp.stepper.canNext()).toBeTruthy();

      // Press next to get to source step
      deployApp.stepper.next();

      // Select 'Local Archive file'
      deployApp.stepper.getStepperForm().fill({ 'sourcetype': 'Application Archive File' });
      e2e.sleep(1000);

      const fileInputElement = element(by.id('localPathSelectFile'));
      fileInputElement.sendKeys(applicationZipFile);

      // Source upload
      deployApp.stepper.waitUntilCanNext('Next');
      deployApp.stepper.next();

      // App overrides
      deployApp.stepper.waitUntilCanNext('Next');
      deployApp.stepper.next();

      expect(deployApp.stepper.canNext()).toBeTruthy();
      const overrides = deployApp.getOverridesForm();
      overrides.waitUntilShown();
      overrides.fill({ name: testAppName, random_route: true });

      // Turn off waiting for Angular - the web socket connection is kept open which means the tests will timeout
      // waiting for angular if we don't turn off.
      browser.waitForAngularEnabled(false);

      // Press next to deploy the app
      deployApp.stepper.next();

      // Wait for the application to be fully deployed - so we see any errors that occur
      deployApp.waitUntilDeployed();

      // Wait until app summary button can be pressed
      deployApp.stepper.waitUntilCanNext('Go to App Summary');

    }, 120000);

    it('Should go to App Summary Page', () => {
      // Click next
      deployApp.stepper.next();

      e2e.sleep(1000);
      // Should be app summary
      const appSummaryPage = new CFPage('/applications/');
      appSummaryPage.waitForPageOrChildPage();
      appSummaryPage.header.waitForTitleText(testAppName);
      browser.wait(ApplicationBasePage.detect()
        .then(appSummary => {
          appDetails.cfGuid = appSummary.cfGuid;
          appDetails.appGuid = appSummary.appGuid;
        }), 10000, 'Failed to wait for Application Summary page after deploying application'
      );
    });
  });

  afterAll(() => applicationE2eHelper.deleteApplication(null, { appName: testAppName }));

});
