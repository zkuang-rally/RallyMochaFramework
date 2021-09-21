const src = require("../main/sourse");
const action = require("../helpers/actionHelpers");
const ResourcePage = require("../pages/benefit.page");
const clientData = require("../client.data");
const launchDate = require("../launchDate");
const fs = require("fs");
describe("Implementation", () => {
  try {
    let objectJson = JSON.parse(
      fs.readFileSync("./clientTestData/expectedData.json")
    );
    for (let key in objectJson) {
      const clientName = JSON.stringify(key) + " - " + launchDate.launchDate;
      describe(clientName, () => {
        it("Benefits Page", () => {
          console.log("Implementation : " + clientName);
          if (action.isArray(objectJson[key])) {
            for (arrCount = 0; arrCount < objectJson[key].length; arrCount++) {
              userName = objectJson[key][arrCount].username;
              password = objectJson[key][arrCount].password;
              contactNumber = objectJson[key][arrCount].contactNumber;
              resourceHeadline = objectJson[key][arrCount].resourceHeadline;
              resourceBody = objectJson[key][arrCount].resourceBody;
              try {
                if (resourceHeadline === "null") {
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
            userName = objectJson[key].username;
            password = objectJson[key].password;
            contactNumber = objectJson[key].contactNumber;
            resourceHeadline = objectJson[key].resourceHeadline;
            resourceHeadline = objectJson[key].resourceHeadline;
            resourceBody = objectJson[key].resourceBody;
            try {
              if (resourceHeadline === "null") {
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
        });
      });
    }
  } catch (exception) {
    browser.reloadSession();
    throw exception;
  }
});
