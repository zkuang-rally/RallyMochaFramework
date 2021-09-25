const clientData = require("../client.data");
const src = require("../main/sourse");
const action = require("../helpers/actionHelpers");
const supportPage = require("../pages/support.page");
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
        it("Support Details Page", () => {
          try {
          console.log("Implementation : " + clientName);
          if (action.isArray(objectJson[key])) {
            for (arrCount = 0; arrCount < objectJson[key].length; arrCount++) {
              userName = objectJson[key][arrCount].username;
              password = objectJson[key][arrCount].password;
              contactNumber = objectJson[key][arrCount].contactNumber.replace(
                /[^a-zA-Z0-9]/g,
                ""
              );
              // Rally UI Validation
              src.Login(clientData.LoginURL, userName, password);
              src.SupportPage();
              const RSupportNumber = action
                .doGetText($(supportPage.contactSupportNumber))
                .replace(/[^a-zA-Z0-9]/g, "");
              browser.takeScreenshot();
              assert.equal(
                contactNumber,
                RSupportNumber,
                "Invalid Customer Support Number"
              );
              console.log(
                clientName +
                  " Support Details Validation Completed Successfully"
              );
              browser.reloadSession();
            }
          } else {
            userName = objectJson[key].username;
            password = objectJson[key].password;
            contactNumber = objectJson[key].contactNumber.replace(
              /[^a-zA-Z0-9]/g,
              ""
            );
            src.Login(clientData.LoginURL, userName, password);
            src.SupportPage();
            const RSupportNumber = action
              .doGetText($(supportPage.contactSupportNumber))
              .replace(/[^a-zA-Z0-9]/g, "");
            browser.takeScreenshot();
            assert.equal(
              contactNumber,
              RSupportNumber,
              "Invalid Customer Support Number"
            );
            console.log(
              clientName + " Support Details Validation Completed Successfully"
            );
            browser.reloadSession();
          }
        }
        catch (exception){
          browser.reloadSession();
          throw exception;
        }
        });
      });
    }
  } catch (exception) {
    browser.reloadSession();
    throw exception;
  }
});
