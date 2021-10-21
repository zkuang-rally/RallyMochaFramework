const clientData = require("../client.data");
const rof = require("../main/rof");
const src = require("../main/sourse");
const constants = require("../constants");
const action = require("../helpers/actionHelpers");
const SFPage = require("../pages/rof.page");
const loginPage = require("../pages/login.page");
const supportPage = require("../pages/support.page");
const launchDate = require("../testdata/generic.json");
const rofPage = require("../pages/rof.page");
const XLSX = require("xlsx");
const fs = require("fs");
const path = require("path");

describe("Implementation", () => {
  const out = "./../testdata/expected/sso.json";
  const outPath = path.resolve(__dirname, out);
  let Json1 = fs.readFileSync(outPath);
  let objectJson = JSON.parse(Json1);
  console.log("Some value: " + objectJson);
  for (let key in objectJson) {
    const ImplementationName =
      JSON.stringify(key).replace(/["]/g, "") + " - " + launchDate.launchDate;
    console.log(ImplementationName);
    before(function () {
      rof.loginSalesforce(constants.username, constants.password);
      action.doSetValue($(SFPage.search), ImplementationName);
      action.doClick($(SFPage.searchBtn));
      $("=" + ImplementationName).click();
    });
    describe(ImplementationName, () => {
      it("SSO Validation", () => {
        for (arrCount = 1; arrCount < objectJson[key].length; arrCount++) {
          userName = objectJson[key][arrCount].username;
          password = objectJson[key][arrCount].password;
          RewardPlanName = objectJson[key][arrCount].rewardPlanName;
          console.log("Reward Plan Name: " + RewardPlanName);
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
            $("#" + RewardPlanDesignsBody)
              .$("a*=Show 4 more »")
              .click();
          }

          $("=" + RewardPlanName).click();
          console.log("we are in reward plan details page ");
          const planDetailsPage = browser.getUrl();
          const ActivitiesBody = planDetailsPage.split("/").pop();
          const Activities = $$(
            "#" + ActivitiesBody + "_00NE0000006Km81_body" + " th:nth-child(2)"
          );
          const b_xpath =
            '//*[@id="' +
            ActivitiesBody +
            '_00NE0000006Km81_body"]/table/tbody/tr[';
          const a_xpath = "]/th/a";
          for (let j = 2; j <= Activities.length; j++) {
            const rewardActivityNumber = $(b_xpath + j + a_xpath).getText();
            console.log(rewardActivityNumber);
            $("=" + rewardActivityNumber).click();
            const CTA = $("//*[@id='00N2R000007NnZL_ileinner']").getText();
            console.log(CTA);

            $("=" + RewardPlanName).click();
          }
          $("=" + ImplementationName).click();
        }
      });
    });
  }
});

//     action.doWaitForElement($("="+planNames));
//     $("="+planNames).click();
//     const planDetailsPage = browser.getUrl();
// const AffiliationsBody = planDetailsPage.split('/').pop();
//   //console.log(AffiliationsBody)
// const Affiliations = $$(
//   "#"+AffiliationsBody + "_00NE0000006Km0q"+" th:nth-child(2)"
// );
// // const Affiliations = $$("#a0n2R00000k7fmO_00NE0000006Km0q th:nth-child(2)")
// const b_xpath = '//*[@id="'+AffiliationsBody+'_00NE0000006Km0q_body"]/table/tbody/tr['
// const a_xpath = ']/th/a'

//*[@id="a0n2R00000k7fmO_00NE0000006Km0q_body"]/table/tbody/tr[2]/th/a

// for (let j = 2; j <= Affiliations.length; j++) {
//   const clientAffiliation = $(b_xpath+j+a_xpath).getText();
//   console.log(clientAffiliation)

// }
// action.doClick($(rofPage.implementationLink));
//$("="+ImplementationName).click();
//   $("//a[normalize-space()="+ImplementationName+"]").click();
//   action.doWaitForElement($(rofPage.rewardPlanDesignsHeaderLink));
//   action.doClick($(rofPage.rewardPlanDesignsHeaderLink));
//   const url = browser.getUrl();
//   const RewardPlanDesignsBody = url
//     .replace(/(.*)#/, "")
//     .replace("target", "body");
//   const RewardPlanNames = $$(
//     "#" + RewardPlanDesignsBody + " th:nth-child(2)"
//   );
//   browser.setTimeout({ implicit: 2000 });
//   if (RewardPlanNames.length > 5) {
//     $("#"+RewardPlanDesignsBody).$("a*=Go to list").click();
//   }
// }
// } else {
//   for (let i = 1; i < RewardPlanNames.length; i++) {
//     const element = RewardPlanNames[i].getText();
//     console.log(element);
// $("="+element).click();
// const planDesignDetailsPage = browser.getUrl();
// console.log(planDesignDetailsPage)
// $("#CF00NE0000006Km0h_ileinner a").click();
// browser.pause(6000)
// }
