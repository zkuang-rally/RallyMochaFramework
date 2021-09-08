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
    browser.pause(2000);
    const alert = $(loginPage.alertBanner).isDisplayed();
    assert.equal(
      alert,
      false,
      "The email/password combination you entered is not valid. Please try again."
    );
  }

  ResourcePage() {
    action.doWaitForElement($(homePage.notNow));
    action.doClick($(homePage.notNow));
    action.doWaitForElement($(homePage.benefit));
    action.doClick($(homePage.benefit));
    action.doWaitForElement($(benefitPage.headline));
    }

  SupportPage() {
    $(homePage.myprofile).moveTo();
    action.doClick($(homePage.helpcenter));
    page.moveToTab("helpcenter.werally.com/rally/s/");
    const dp = $(supportPage.carrierDropdown).isDisplayed();
    if(dp === true){
      $(supportPage.carrierDropdown).selectByIndex(1);
    }
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

  CustomSupportPage() {
    $(homePage.myprofile).moveTo();
    action.doClick($(homePage.helpcenter));
    page.moveToTab("helpcenter.werally.com/rally/s/");
    $(supportPage.carrierDropdown).selectByIndex(1);
    action.doWaitForElement($(supportPage.contactSupportBtn));
    action.doClick($(supportPage.contactSupportBtn));
  }
}
module.exports = new buildPage();
