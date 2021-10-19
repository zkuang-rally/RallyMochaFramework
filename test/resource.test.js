const src = require("../main/sourse");
const action = require("../helpers/actionHelpers");
const ResourcePage = require("../pages/benefit.page");
const clientData = require("../client.data");
const fs = require("fs");
const path = require("path");
const rallyUtil = require("../helpers/rallyHelpers");
const rof = require("../main/rof");
const constants = require("../constants");
const launchDate = require("../testdata/generic.json");

describe("Implementation", () => {
  try {
    const out = "./../testdata/expected/resource.json";
    const outPath = path.resolve(__dirname, out);
    describe("clientName", () => {
      it("Support Details Page", () => {
        rof.loginSalesforce(constants.username, constants.password);
        rallyUtil.saveClientDetailsFromSF("resource");
        let Json1 = fs.readFileSync(outPath)
        let objectJson = JSON.parse(Json1)
        console.log("Some value: " + objectJson);

        //Validation
        for (let key in objectJson) {
        if (action.isArray(objectJson[key])) {
          for (arrCount = 0; arrCount < objectJson[key].length; arrCount++) {
            userName = objectJson[key][arrCount].username;
            password = objectJson[key][arrCount].password;
            contactNumber = objectJson[key][arrCount].contactNumber;
            resourceHeadline = objectJson[key][arrCount].resourceHeadline;
            resourceBody = objectJson[key][arrCount].resourceBody;
            try {
              if (resourceHeadline == null) {
                //Rally UI Validation
                src.Login(clientData.LoginURL, userName, password);
                src.ResourcePage();
                browser.takeScreenshot();
                console.log(
                  clientName +
                    " Benefits Page Validation Completed Successfully"
                );
                browser.reloadSession();
              } else {
                console.log("Client has Custom resource Page");
                src.Login(clientData.LoginURL, userName, password);
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
                  clientName +
                    " Benefits Page Validation Completed Successfully"
                );
                browser.reloadSession();
              }
            } catch (exception) {
              browser.reloadSession();
              throw exception;
            }
          }
        } else {
          var userName = objectJson[key].username;
          var password = objectJson[key].password;
          var resourceHeadline = objectJson[key].resourceHeadline;
          var resourceBody = objectJson[key].resourceBody;
          try {
            if (resourceHeadline == null) {
              //Rally UI Validation
              console.log(userName)
              src.Login(clientData.LoginURL, userName, password);
              src.ResourcePage();
              browser.takeScreenshot();
              console.log(
                " Benefits Page Validation Completed Successfully"
              );
              browser.reloadSession();
            } else {
              console.log("custom resource Page");
              src.Login(clientData.LoginURL, userName, password);
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
                " Benefits Page Validation Completed Successfully"
              );
              browser.reloadSession();
            }
          } catch (exception) {
            browser.reloadSession();
            throw exception;
          }
        }
      }
      });
    });
  } catch (exception) {
    browser.reloadSession();
    throw exception;
  }
});
