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
    //const ImplementationName = "'" + testData[0]["CUST_LEG_NM"] + "'";
    const ImplementationName = testData[0]["CUST_LEG_NM"];
    describe(ImplementationName, () => {
      it("SSO Validation", () => {
        // Taking Requirement from Salesforce
        rof.gotoRallyImplementation(
          constants.username,
          constants.password,
          ImplementationName
        );
        action.doWaitForElement($(rofPage.rewardPlanDesignsHeaderLink));
        action.doClick($(rofPage.rewardPlanDesignsHeaderLink));
        const url = browser.getUrl();
        const RewardPlanDesignsBody = url
          .replace(/(.*)#/, "")
          .replace("target", "body");
        const RewardPlanNames = $$(
          "#" + RewardPlanDesignsBody + " th:nth-child(2)"
        );
        browser.setTimeout({ implicit: 2000 });
        if (RewardPlanNames.length > 5) {
          $("#"+RewardPlanDesignsBody).$("a*=Go to list").click();
          const RewardPlanNames = $$(".listRelatedObject th:nth-child(2)");
          const before_xpath = '//*[@id="bodyCell"]/div[3]/div/div[2]/table/tbody/tr['
          const after_xpath = ']/th/a'
          for (let i = 2; i <= RewardPlanNames.length; i++) {
            //const element = RewardPlanNames[i].getText();
            const planNames = $(before_xpath+i+after_xpath).getText();
            console.log(planNames);
            action.doWaitForElement($("="+planNames));
            $("="+planNames).click();
            const planDetailsPage = browser.getUrl();
        const AffiliationsBody = planDetailsPage.split('/').pop();
          //console.log(AffiliationsBody)
        const Affiliations = $$(
          "#"+AffiliationsBody + "_00NE0000006Km0q"+" th:nth-child(2)"
        );
        // const Affiliations = $$("#a0n2R00000k7fmO_00NE0000006Km0q th:nth-child(2)")
        const b_xpath = '//*[@id="'+AffiliationsBody+'_00NE0000006Km0q_body"]/table/tbody/tr['
        const a_xpath = ']/th/a'

            //*[@id="a0n2R00000k7fmO_00NE0000006Km0q_body"]/table/tbody/tr[2]/th/a

          for (let j = 2; j <= Affiliations.length; j++) {
            const clientAffiliation = $(b_xpath+j+a_xpath).getText();
            console.log(clientAffiliation)
            
          }
          // action.doClick($(rofPage.implementationLink));
          $("="+ImplementationName).click();
          action.doWaitForElement($(rofPage.rewardPlanDesignsHeaderLink));
          action.doClick($(rofPage.rewardPlanDesignsHeaderLink));
          const url = browser.getUrl();
          const RewardPlanDesignsBody = url
            .replace(/(.*)#/, "")
            .replace("target", "body");
          const RewardPlanNames = $$(
            "#" + RewardPlanDesignsBody + " th:nth-child(2)"
          );
          browser.setTimeout({ implicit: 2000 });
          if (RewardPlanNames.length > 5) {
            $("#"+RewardPlanDesignsBody).$("a*=Go to list").click();
          }
        }
        } else {
          for (let i = 1; i < RewardPlanNames.length; i++) {
            const element = RewardPlanNames[i].getText();
            console.log(element);
            // $("="+element).click();
            // const planDesignDetailsPage = browser.getUrl();
            // console.log(planDesignDetailsPage)
            // $("#CF00NE0000006Km0h_ileinner a").click();
            // browser.pause(6000)
          }
        }
      });
    });
  }
});
