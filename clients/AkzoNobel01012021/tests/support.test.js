const clientData = require("../../../clients/AkzoNobel01012021/testData/client.data");
const testData = require("../../../clients/AkzoNobel01012021/testData/test.data.json");
const rof = require('../../../main/rof')
const src = require("../../../main/sourse");
const constants = require('../../../constants');

describe("DeNoraTech Client Validation", () => {
  it("Verify Customer Support Number", () => {
    try {
      src.Login(
        clientData.LoginURL,
        testData[0]["email"],
        testData[0]["password"]
      );
      src.SupportPage();
      browser.takeScreenshot();
    } catch (exception) {
      throw exception;
    }
  });
});
