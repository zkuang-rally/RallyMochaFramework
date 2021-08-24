const clientData = require("../client.data");
const rof = require("../main/rof");
const src = require("../main/sourse");
const constants = require("../constants");
const action = require("../helpers/actionHelpers");
const SFPage = require("../pages/rof.page");
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
      it("Resource Page Validation of client " + files.slice(0, -5), () => {
        try {
          //Taking requirement from Salesforce
          rof.getCustomerSupportNumber(
            constants.username,
            constants.password,
            clientName
          );
          const CustomResoucePageChkBox = SFPage.customResoursePage;
          action.doWaitForElement($(CustomResoucePageChkBox));
          $(CustomResoucePageChkBox).scrollIntoView();
          const Element = $(CustomResoucePageChkBox).isSelected();
          browser.takeScreenshot();
          assert.equal(Element, false, "Client has Custom Resource Page");

          //Rally UI Validation
          src.Login(
            clientData.LoginURL,
            testData[2]["RALLY_EMAIL"],
            testData[2]["RALLY_PASSWORD"]
          );
          src.ResourcePage();
          browser.takeScreenshot();
          console.log(
            files.slice(0, -5) +
              " Benefits Page Validation Completed Successfully"
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
