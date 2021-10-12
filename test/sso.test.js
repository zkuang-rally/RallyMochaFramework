const clientData = require("../client.data");
const rof = require("../main/rof");
const src = require("../main/sourse");
const constants = require("../constants");
const action = require("../helpers/actionHelpers");
const SFPage = require("../pages/rof.page");
const loginPage = require("../pages/login.page");
const supportPage = require("../pages/support.page");
const launchDate = require("../launchDate");
const rofPage = require("../pages/rof.page");
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
        action.doWaitForElement($(rofPage.rewardPlanDesignsHeaderLink));
        action.doClick($(rofPage.rewardPlanDesignsHeaderLink));
        const url = browser.getUrl();
        const RewardPlanDesignsBody = url
          .replace(/(.*)#/, "")
          .replace("target", "body");
          console.log(RewardPlanDesignsBody);
        const RewardPlanNames = $$(
          "#" + RewardPlanDesignsBody + " th:nth-child(2)"
        );
        browser.setTimeout({ implicit: 2000 });
        if (RewardPlanNames.length > 5) {
          $("//*[@id='" + RewardPlanDesignsBody + "']/div/a[2]").click();
          const RewardPlanNames = $$(".listRelatedObject th:nth-child(2)");
          for (let index = 1; index < RewardPlanNames.length; index++) {
            const element = RewardPlanNames[index].getText();
            console.log(element);
          }
        } else {
          for (let index = 1; index < RewardPlanNames.length; index++) {
            const element = RewardPlanNames[index].getText();
            console.log(element);
            $("="+element).click();
            const planDesignDetailsPage = browser.getUrl();
            console.log(planDesignDetailsPage)
            $("#CF00NE0000006Km0h_ileinner a").click();
            browser.pause(6000)
          }
        }
      });
    });
  }
});
