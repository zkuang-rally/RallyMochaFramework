const page = require("../pages/page");
const action = require("../helpers/actionHelpers");
const SFPage = require("../pages/rof.page");
const { waitforTimeout } = require("../config");

class requirements {
  getCustomerSupportNumber(username, password, impName) {
    page.open("https://rallyhealth.my.salesforce.com/");
    action.doSetValue($(SFPage.username), username);
    action.doSetValue($(SFPage.password), password);
    action.doClick($(SFPage.login));
    action.doWaitForElement($(SFPage.alert));
    action.doClick($(SFPage.alert));
   // page.open("https://rallyhealth.lightning.force.com/ltng/switcher?destination=classic&referrer=%2Flightning%2Fpage%2Fhome");
    action.doSetValue($(SFPage.search), impName);
    action.doClick($(SFPage.searchBtn));
    $("//a[normalize-space()="+impName+"]").click();
  }
}
module.exports = new requirements();
