//const testData = require("../clientTestData/expectedData.json");
const rof = require("../main/rof");
const src = require("../main/sourse");
const constants = require("../constants");
const action = require("../helpers/actionHelpers");
const SFPage = require("../pages/rof.page");
const ResourcePage = require("../pages/benefit.page");
const clientData = require('../client.data')
const launchDate = require("../launchDate");
const XLSX = require("xlsx");
const fs = require("fs");
let objectJson = JSON.parse(fs.readFileSync('/Users/ulaxmira/Documents/RallyMochaFramework/clientTestData/expectedData.json'));
for (key in objectJson) {
  console.log("The client name is : " + JSON.stringify(key));
  if (action.isArray(objectJson[key])) {
    for (arrCount = 0; arrCount < objectJson[key].length; arrCount++) {
      userName = objectJson[key][arrCount].username;
      password = objectJson[key][arrCount].password;
      contactNumber = objectJson[key][arrCount].contactNumber;
      resourceHeadline = objectJson[key][arrCount].resourceHeadline;
      resourceBody = objectJson[key][arrCount].resourceBody;
      console.log("The client details are : " + userName + " " + password + " " + contactNumber);
    }
  }
  else {
    userName = objectJson[key].username;
    password = objectJson[key].password;
    contactNumber = objectJson[key].contactNumber;
    resourceHeadline = objectJson[key].resourceHeadline;
    resourceHeadline = objectJson[key].resourceHeadline;
    resourceBody = objectJson[key].resourceBody;
    console.log("The client details are : " + userName + " " + password + " " + contactNumber + " " + resourceHeadline);
  }
}
  
  describe("Implementation", () => {
 //testData.forEach(({ cust_leg_name, username, password, resourceHeadline, resourceBody }) => {
    let clientName =
      JSON.stringify(key) + " - " + launchDate.launchDate;
    describe(clientName, () => {
      it("Benefits Page", () => {
        try {
          if (resourceHeadline === "null") {
            //Rally UI Validation
            src.Login(
              clientData.LoginURL,
              userName,
              password
            );
            src.ResourcePage();
            browser.takeScreenshot();
            console.log(
              clientName + " Benefits Page Validation Completed Successfully"
            );
            browser.reloadSession();
          }
          else {
            console.log("custom resource Page")
            src.Login(
              clientData.LoginURL,
              userName,
              password
            );
            src.ResourcePage();
            action.doWaitForElement($(ResourcePage.headline));
            const ResourcePageHeadline = action.doGetText(
              $(ResourcePage.headline)
            );
            const ResourcePageBodyText = action.doGetText(
              $(ResourcePage.bodytext)
            );
            browser.takeScreenshot();
            assert.equal(
              resourceHeadline,
              ResourcePageHeadline,
              "Invalid page Headline"
            );
            assert.equal(
              resourceBody,
              ResourcePageBodyText,
              "Invalid page Body Text"
            );
            console.log(
              clientName + " Benefits Page Validation Completed Successfully"
            );
            browser.reloadSession();
          }
        

        } catch (exception) {
          browser.reloadSession();
          throw exception;
        }
      });
    });
  });


