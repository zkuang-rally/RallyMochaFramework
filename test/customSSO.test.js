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
          action.doClick($("*=Custom Reward Activities["));
          const url = browser.getUrl();
          const customActivitiesBody = url
            .replace(/(.*)#/, "")
            .replace("target", "body");

          console.log(customActivitiesBody);

          const customActivityNames = $$(
            "#" + customActivitiesBody + " th:nth-child(2)"
          );

          if (customActivityNames.length > 5) {
            action.doClick($("#" + customActivitiesBody).$("a*=Go to list"));
            const customRewardActivities = $$(
              ".bPageBlock.brandSecondaryBrd.secondaryPalette th:nth-child(2)"
            );
            browser.setTimeout({ implicit: 1000 });
            let moreItems = $("=more").isExisting();
            console.log(moreItems);
            if (moreItems) {
              $("=more").click();
            }
            const b_xpath =
              ".bPageBlock.brandSecondaryBrd.secondaryPalette tbody tr:nth-child(";
            const a_xpath = ") th:nth-child(2) a";
            for (let j = 2; j <= customRewardActivities.length; j++) {
              const customActivityName = action.doGetText(
                $(b_xpath + j + a_xpath)
              );
              console.log("Custom Activity Name : " + customActivityName);
              action.doClick($(b_xpath + j + a_xpath));
              const RewardActivityID = action.doGetText(
                $("//div[@id='Name_ileinner']")
              );
              const CTA = action.doGetText(
                $("div[id='00NE0000006KqBg_ileinner']")
              );
              const CTAValue = action.doGetText(
                $("div[id='00NE0000006KqBh_ileinner']")
              );
              console.log("Reward Activity ID : " + RewardActivityID);
              console.log("CTA : " + CTA);
              console.log("CTA Value : " + CTAValue);
              browser.back();
            }
          } else {
            const b_xpath =
              '//*[@id="' + customActivitiesBody + '"]/table/tbody/tr[';
            const a_xpath = "]/th/a";
            for (let j = 2; j <= customActivityNames.length; j++) {
              const customActivityName = action.doGetText(
                $(b_xpath + j + a_xpath)
              );
              console.log("Custom Activity Name : " + customActivityName);
              action.doClick($(b_xpath + j + a_xpath));
              const RewardActivityID = action.doGetText(
                $("//div[@id='Name_ileinner']")
              );
              const CTA = action.doGetText(
                $("div[id='00NE0000006KqBg_ileinner']")
              );
              const CTAValue = action.doGetText(
                $("div[id='00NE0000006KqBh_ileinner']")
              );
              console.log("Reward Activity ID : " + RewardActivityID);
              console.log("CTA : " + CTA);
              console.log("CTA Value : " + CTAValue);
              browser.back();
            }
          }
        });
      });
    }
  } catch (exception) {
    throw exception;
  }
});
