const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    //swagger
     baseUrl: 'https://raromdb-3c39614e42d4.herokuapp.com',
      
      //não limpa o estado de tela
      testIsolation: false
  },
});
