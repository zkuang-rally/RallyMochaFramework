const clientData = require("../client.data");
const src = require("../main/sourse");
const action = require("../helpers/actionHelpers");
const supportPage = require("../pages/support.page");
const fs = require("fs");
const rallyUtil = require("../helpers/rallyHelpers");
const rof = require("../main/rof");
const constants = require("../constants");


describe("Implementation", () => {
  try {
      describe("clientName", () => {
        it("Support Details Page", () => {
          rof.loginSalesforce(
            constants.username,
            constants.password,
          );
          rallyUtil.saveClientDetailsFromSF("support");

          // Validations

        });
      });
  } catch (exception) {
    browser.reloadSession();
    throw exception;
  }
});
