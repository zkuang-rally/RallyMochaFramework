const src = require("../main/sourse");
const action = require("../helpers/actionHelpers");
const ResourcePage = require("../pages/benefit.page");
const clientData = require("../client.data");
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
          rallyUtil.saveClientDetailsFromSF("resource");

          //Validation
        });
      });
  } catch (exception) {
    browser.reloadSession();
    throw exception;
  }
});
