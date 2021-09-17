class elementUtil {
  doClick(element) {
    element.waitForDisplayed();
    element.click();
  }

  doDoubleClick(element) {
    element.waitForDisplayed();
    element.doubleClick();
  }

  doSetValue(element, value) {
    element.waitForDisplayed();
    element.setValue(value);
  }

  doGetText(element) {
    element.waitForDisplayed();
    return element.getText();
  }

  doGetPageTitle(pageTitle) {
    browser.waitUntil(
      () => {
        return browser.getTitle() === pageTitle;
      },
      15000,
      "title is not displayed after given time"
    );
    return browser.getTitle();
  }

  doIsExisting(element) {
    element.waitForDisplayed();
    return element.isExisting();
  }

  doIsDisplayed(element) {
    element.waitForDisplayed();
    return element.isDisplayed();
  }

  doIsClickable(element) {
    element.waitForDisplayed();
    return element.isClickable();
  }

  doWaitForExist(element) {
    return element.waitForExist();
  }

  doWaitForElement(element) {
    browser.waitUntil(
      function () {
        return element.isDisplayed() === true;
      },
      45000,
      "element is not displayed after given time"
    );
    return element;
  }

  isArray(o){
    return Object.prototype.toString.call(o) === '[object Array]'
  }
}
module.exports = new elementUtil();
