const page = require("../pages/page");
const action = require("../helpers/actionHelpers");
const loginPage = require("../pages/login.page");
const homePage = require("../pages/home.page");
const benefitPage = require("../pages/benefit.page");
const supportPage = require("../pages/support.page");
const rewardsPage = require("../pages/rewards.page");
class buildPage {
  Login(loginUrl, email, password) {
    page.open(loginUrl);
    action.doSetValue($(loginPage.email), email);
    action.doSetValue($(loginPage.password), password);
    action.doClick($(loginPage.loginBtn));
  }

  ResourcePage() {
    action.doWaitForElement($(homePage.notNow));
    action.doClick($(homePage.notNow));
    action.doWaitForElement($(homePage.benefit));
    action.doClick($(homePage.benefit));
    action.doWaitForElement($(benefitPage.headline));
    action.doGetText($(benefitPage.headline));
    action.doGetText($(benefitPage.bodytext));
  }

  SupportPage() {
    action.doClick($(homePage.myprofile));
    action.doClick($(homePage.helpcenter));
    page.moveToTab("helpcenter.werally.com/rally/s/");
    action.doWaitForElement($(supportPage.contactSupportBtn));
    action.doClick($(supportPage.contactSupportBtn));
  }

  RewardsPage() {
    action.doWaitForElement($(homePage.notNow));
    action.doClick($(homePage.notNow));
    action.doWaitForElement($(homePage.reward));
    action.doClick($(homePage.reward));
    action.doWaitForElement(rewardsPage.genericButton);
  }
}
module.exports = new buildPage();
