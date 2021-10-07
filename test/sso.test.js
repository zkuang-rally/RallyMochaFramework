const clientData = require("../client.data");
const rof = require("../main/rof");
const src = require("../main/sourse");
const constants = require("../constants");
const action = require("../helpers/actionHelpers");
const SFPage = require("../pages/rof.page");
const loginPage = require("../pages/login.page");
const supportPage = require("../pages/support.page");
const launchDate = require("../launchDate");
const XLSX = require("xlsx");
const fs = require("fs");
const path = require("path");

describe("Implementation", () => {
  const dataPath = path.resolve(__dirname, "./../clientTestData");
  const GTUPrimaryFiles = fs.readdirSync(dataPath, ["**.xlsx"]);
  for (let i = 0; i < GTUPrimaryFiles.length; i++) {
    const files = GTUPrimaryFiles[i];
    const workbook = XLSX.readFile("clientTestData/" + files);
    const workbookSheets = workbook.SheetNames;
    const sheet = workbookSheets[0];
    const testData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
    const clientName = "'" + testData[0]["CUST_LEG_NM"] + "'";
    describe(clientName, () => {
      it("SSO Validation", () => {
        // Taking Requirement from Salesforce
        rof.gotoRallyImplementation(
          constants.username,
          constants.password,
          clientName
        );
        const root = $("div[id='00N2R0000072Hz8_ileinner']").getText();
        const rootApi = root.replace(/(.*)=/,"");
        console.log(rootApi)

        action.doWaitForElement($("//div[@id='"+rootApi+"_00NE0000006Km0h_body'] //a[contains(text(),'Show 4 more »')]"));
        action.doClick($("//div[@id='"+rootApi+"_00NE0000006Km0h_body'] //a[contains(text(),'Show 4 more »')]"));
        browser.pause(5000);
        const rewardPlanDesigns = $$("#"+rootApi+"_00NE0000006Km0h_body th[class=' dataCell  ']");

        for (let i = 0; i < rewardPlanDesigns.length; i++) {
          var rewardPlan = rewardPlanDesigns[0].getText();
          console.log(rewardPlan);
        }


        //$("div[class='bRelatedList first'] th[class=' dataCell  ']")

        // Rally UI Validation
        // src.Login(
        //   clientData.LoginURL,
        //   testData[0]["RALLY_EMAIL"],
        //   testData[0]["RALLY_PASSWORD"]
        // );

        // Rally UI Validation
      });
    });
  }
});
