const page = require("../pages/page");
const action = require("../helpers/actionHelpers");
const SFPage = require("../pages/rof.page");

class requirements {
  getCustomerSupportNumber(SupportPage, username, password) {
    page.open("https://rallyhealth.my.salesforce.com/"+SupportPage);
    action.doSetValue($(SFPage.username), username);
    action.doSetValue($(SFPage.password), password);
    action.doClick($(SFPage.login));
  }
}
module.exports = new requirements();
