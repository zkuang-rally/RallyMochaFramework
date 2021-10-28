const page = require("../pages/page");
const action = require("../helpers/actionHelpers");
const SFPage = require("../pages/rof.page");

class requirements {
  getCustomerSupportNumber(username, password, impName) {
    page.open("https://rallyhealth.my.salesforce.com/");
    action.doSetValue($(SFPage.username), username);
    action.doSetValue($(SFPage.password), password);
    action.doClick($(SFPage.login));
    action.doWaitForElement($(SFPage.alert));
    action.doClick($(SFPage.alert));
    action.doSetValue($(SFPage.search), impName);
    action.doClick($(SFPage.searchBtn));

    browser.setTimeout({ implicit: 2000 });
    let impElement = $("=" + impName).isExisting();
    console.log("Implementation Status : " + impElement);
    assert.equal(impElement, true, "Implementation Name format mismatch");
    if (impElement) {
      action.doClick($("=" + impName));
    }
  }
}
module.exports = new requirements();
