const clientData = require("../client.data");
const rof = require("../main/rof");
const src = require("../main/sourse");
const constants = require("../constants");
const action = require("../helpers/actionHelpers");
const SFPage = require("../pages/rof.page");
const rallyUtil = require("../helpers/rallyHelpers");
const loginPage = require("../pages/login.page");
const supportPage = require("../pages/support.page");
const launchDate = require("../testdata/generic.json");
const rofPage = require("../pages/rof.page");
const XLSX = require("xlsx");
const fs = require("fs");
const path = require("path");
const ssoObjectJson = require("../testdata/ssoInternalLinks.json");
const ssoMapingObjectJson = require("../testdata/ssoMapping.json");

describe("Implementation", () => {
  try {
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
        rallyUtil.saveClientDetailsFromSF("reward");
      });
      describe(ImplementationName, () => {
        it("SSO Validation", () => {
          if (rallyUtil.isArray(objectJson[key])) {
            for (let arrCount = 0; arrCount < objectJson[key].length; arrCount++) {
              let userName = objectJson[key][arrCount].username;
              let password = objectJson[key][arrCount].password;
              let RewardPlanName = objectJson[key][arrCount].rewardPlanName;
              console.log("Reward Plan Name: " + RewardPlanName);
              if (
                RewardPlanName === undefined ||
                userName === undefined ||
                password === undefined
              ) { 
                console.log("No Reward affiliation user");
              } else {
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
                  action.doClick($("#" + RewardPlanDesignsBody).$("a*=Show"));
                }

                action.doClick($("=" + RewardPlanName));
                console.log("we are in reward plan details page ");
                const planDetailsPage = browser.getUrl();
                const ActivitiesBody =
                  planDetailsPage.split("/").pop() + "_00NE0000006Km81_body";
                let Activities = $$("#" + ActivitiesBody + " th:nth-child(2)");
                browser.setTimeout({ implicit: 2000 });
                let intActCount;
                let b_xpath;
                let a_xpath;

                let actLength = Activities.length;
                if (actLength > 5) {
                  action.doClick($("#" + ActivitiesBody).$("a*=Go to list"));
                  Activities = $$(
                    ".bPageBlock.brandSecondaryBrd.secondaryPalette th:nth-child(2)"
                  );
                  b_xpath = "//a[normalize-space()='0";
                  a_xpath = "']";
                  intActCount = 1;
                }
                else {
                  intActCount = 2;
                  b_xpath =
                    '//*[@id="' + ActivitiesBody + '"]/table/tbody/tr[';
                  a_xpath = "]/th/a";
                }

                for (let intCount = intActCount; intCount <= Activities.length; intCount++) {
                  const rewardActivityNumber = action.doGetText(
                    $(b_xpath + intCount + a_xpath)
                  );

                  console.log("Activity Number : " + rewardActivityNumber);
                  action.doClick($("=" + rewardActivityNumber));
                  expect($(rofPage.CTA)).toExist();

                  // let chkCopyTemp = $(rofPage.checkboxCopyTemplate).getAttribute("title").toLowerCase();

                  const CTA = action.doGetText($(rofPage.CTA));
                  let CTAValue;

                  expect($(rofPage.RewardActivityID)).toExist();
                  const RewardActivityID = action.doGetText(
                    $(rofPage.RewardActivityID)
                  );

                  // if (CTA.toLowerCase() != 'rally internal details page')
                  // {
                    expect($(rofPage.CTAValue)).toExist();
                    CTAValue = action.doGetText($(rofPage.CTAValue));
                  // }
                  // else
                  // {
                  //   CTAValue = null;
                  // }

                  console.log("Call to Action : " + CTA);
                  console.log("CTA Value : " + CTAValue);
                  console.log("Reward Activity Id : " + RewardActivityID);

                  switch (CTA) {
                    case "Rally Internal Link":
                      let urlValue = ssoObjectJson[CTAValue];
                      console.log("Rally Internal Link is : " + urlValue);
                      break;
                    case "SSO":
                      let ssoUrlValue = ssoMapingObjectJson[CTAValue];
                      console.log("SSO to Quest link is : " + ssoUrlValue);
                      break;
                    default:
                      break;
                  }

                  const activities = 'activities';
                  const ctaAction = 'ctaAction';
                  const ctaValue = 'ctaValue';
                  const rewardActID = 'rewardActID';
                  const chkCT = 'chkCT';

                  if (actLength > 1)
                  {
                    if (!objectJson[key][activities]) {
                      objectJson[key][activities] = [];
                    }
          
                    objectJson[key][activities].push({ [ctaAction]: CTA, [ctaValue]: CTAValue, [rewardActID]: RewardActivityID });

                  }
                  else
                  {
                    if (!objectJson[key][activities]) {
                      objectJson[key][activities] = {};
                    }
          
                    objectJson[key][activities] = { [ctaAction]: CTA, [ctaValue]: CTAValue, [rewardActID]: RewardActivityID };
                  }

                  console.log("The new object is: " + JSON.stringify(objectJson[key][activities]));
                  

                  if (actLength > 5) {
                    browser.back();
                  }
                  else {
                    action.doClick($("=" + RewardPlanName));
                  }

                }
                action.doClick($("=" + ImplementationName));
              }
            }
          }

        });
      });
    }

    rallyUtil.writeToFile(outPath, objectJson);

  } catch (exception) {
    throw exception;
  }
});
