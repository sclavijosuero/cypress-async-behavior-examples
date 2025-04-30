const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportWidth: 1920,
  viewportHeight: 1080,
  screenshotsFolder: 'cypress/screenshots',
  videosFolder: 'cypress/videos',
  downloadsFolder: 'cypress/downloads',

  watchForFileChanges: false,

  experimentalStudio: true,
  experimentalMemoryManagement: true,
  experimentalWebKitSupport: true,
  chromeWebSecurity: false,
  retries: { "openMode": 0, "runMode": 1 },

  pageLoadTimeout: 20000,
  defaultCommandTimeout: 5000,

  defaultBrowser: 'chrome',

  e2e: {
    setupNodeEvents(on, config) {
      return config;
    },

    baseUrl: 'https://google.com',
    environment: "environment: dev",
  },
});
