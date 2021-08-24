const clientData = require("../client.data");
const rof = require("../main/rof");
const src = require("../main/sourse");
const constants = require("../constants");
const action = require("../helpers/actionHelpers");
const SFPage = require("../pages/rof.page");
const supportPage = require("../pages/support.page");
const XLSX = require("xlsx");
const fs = require("fs");

describe("Rally Clients Validation", () => {
  try {
    const GTUPrimaryFiles = fs.readdirSync("./clientTestData", ["**.xlsx"]);
    for (let i = 1; i < GTUPrimaryFiles.length; i++) {
      const files = GTUPrimaryFiles[i];
      const workbook = XLSX.readFile("clientTestData/" + files);
      const workbookSheets = workbook.SheetNames;
      const sheet = workbookSheets[0];
      const testData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
      const clientName = "'" + testData[2]["CUST_LEG_NM"] + "'";

      it("Support Details Validation of client " + files.slice(0, -5), () => {
        try {
          // Taking Requirement from Salesforce
          rof.getCustomerSupportNumber(
            constants.username,
            constants.password,
            clientName
          );
          action.doWaitForElement($(SFPage.customerSupportNumber));
          $(SFPage.customerSupportNumber).scrollIntoView();
          const CustomerSupportNumber = action.doGetText(
            $(SFPage.customerSupportNumber)
          );
          browser.takeScreenshot();
          const SFsupportNumber = CustomerSupportNumber.slice(26, -1);

          // Rally UI Validation
          src.Login(
            clientData.LoginURL,
            testData[2]["RALLY_EMAIL"],
            testData[2]["RALLY_PASSWORD"]
          );
          src.SupportPage();
          const RSupportNumber = action.doGetText(
            $(supportPage.contactSupportNumber)
          );
          assert.equal(
            SFsupportNumber,
            RSupportNumber,
            "Invalid Customer Support Number"
          );
          browser.takeScreenshot();
          console.log(
            files.slice(0, -5) +
              " Support Details Validation Completed Successfully"
          );
          browser.reloadSession();
        } catch (exception) {
          browser.reloadSession();
          throw exception;
        }
      });
    }
  } catch (exception) {
    throw exception;
  }
});
