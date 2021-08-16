const clientData = require("../testData/client.data");
const testData = require("../testData/test.data.json");
const rof = require("../../../main/rof");
const src = require("../../../main/sourse");
const constants = require("../../../constants");
const action = require("../../../helpers/actionHelpers");
const SFPage = require("../../../pages/rof.page");
const supportPage = require("../../../pages/support.page");

describe("DeNoraTech Client Validation", () => {
  it("Verify Customer Support Number", () => {
    try {
      // Taking Requirement from Salesforce
      rof.getCustomerSupportNumber(
        clientData.CustomerSupportPage,
        constants.username,
        constants.password
      );
      action.doClick($(SFPage.alert));
      action.doWaitForElement($(SFPage.customerSupportNumber));
      $(SFPage.logo).scrollIntoView();
      const CustomerSupportNumber = action.doGetText(
        $(SFPage.customerSupportNumber)
      );
      browser.takeScreenshot();
      const SFsupportNumber = CustomerSupportNumber.slice(26, -1);
      console.log(SFsupportNumber);

      // Rally UI Validation
      src.Login(
        clientData.LoginURL,
        testData[0]["email"],
        testData[0]["password"]
      );
      src.SupportPage();
      const RSupportNumber = action.doGetText(
        $(supportPage.contactSupportNumber)
      );
      console.log(RSupportNumber);
      assert.equal(
        SFsupportNumber,
        RSupportNumber,
        "Invalid Customer Support Number"
      );
      browser.takeScreenshot();
    } catch (exception) {
      throw exception;
    }
  });
});
