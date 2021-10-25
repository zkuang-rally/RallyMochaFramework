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
          for (arrCount = 0; arrCount < objectJson[key].length; arrCount++) {
            userName = objectJson[key][arrCount].username;
            password = objectJson[key][arrCount].password;
            RewardPlanName = objectJson[key][arrCount].rewardPlanName;
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
              const Activities = $$("#" + ActivitiesBody + " th:nth-child(2)");
              browser.setTimeout({ implicit: 2000 });

              if (Activities.length > 5) {
                action.doClick($("#" + ActivitiesBody).$("a*=Go to list"));
                const rewardPlanActivitiesGoto = $$(
                  ".bPageBlock.brandSecondaryBrd.secondaryPalette th:nth-child(2)"
                );
                const b_xpath = "//a[normalize-space()='0";
                const a_xpath = "']";
                for (let j = 1; j <= rewardPlanActivitiesGoto.length; j++) {
                  const rewardActivityNumber = action.doGetText(
                    $(b_xpath + j + a_xpath)
                  );
                  console.log("Activity Number : " + rewardActivityNumber);
                  action.doClick($("=" + rewardActivityNumber));
                  expect($(rofPage.CTA)).toExist();
                  const CTA = action.doGetText($(rofPage.CTA));
                  expect($(rofPage.CTAValue)).toExist();
                  const CTAValue = action.doGetText($(rofPage.CTAValue));
                  expect($(rofPage.RewardActivityID)).toExist();
                  const RewardActivityID = action.doGetText(
                    $(rofPage.RewardActivityID)
                  );
                  console.log("Call to Action : " + CTA);
                  console.log("CTA Value : " + CTAValue);
                  console.log("Reward Activity Id : " + RewardActivityID);
                  if (CTA === "Rally Internal Link") {
                    let urlValue = ssoObjectJson[CTAValue];
                    console.log("Activity Link is : " + urlValue);
                  }

                  browser.back();
                }
                action.doClick($("=" + ImplementationName));
              } else {
                const b_xpath =
                  '//*[@id="' + ActivitiesBody + '"]/table/tbody/tr[';
                const a_xpath = "]/th/a";
                for (let j = 2; j <= Activities.length; j++) {
                  const rewardActivityNumber = action.doGetText(
                    $(b_xpath + j + a_xpath)
                  );
                  console.log("Activity Number : " + rewardActivityNumber);
                  action.doClick($("=" + rewardActivityNumber));
                  expect($(rofPage.CTA)).toExist();
                  const CTA = action.doGetText($(rofPage.CTA));
                  expect($(rofPage.CTAValue)).toExist();
                  const CTAValue = action.doGetText($(rofPage.CTAValue));
                  expect($(rofPage.RewardActivityID)).toExist();
                  const RewardActivityID = action.doGetText(
                    $(rofPage.RewardActivityID)
                  );
                  console.log("Call to Action : " + CTA);
                  console.log("CTA Value : " + CTAValue);
                  console.log("Reward Activity Id : " + RewardActivityID);

                  if (CTA === "Rally Internal Link") {
                    let urlValue = ssoObjectJson[CTAValue];
                    console.log("Activity Link is : " + urlValue);
                  }

                  action.doClick($("=" + RewardPlanName));
                }
                action.doClick($("=" + ImplementationName));
              }
            }
          }
        });
      });
    }
  } catch (exception) {
    throw exception;
  }
});
