const clientData = require("../../../clients/DeNoraTech01012021/testData/client.data");
const testData = require("../../../clients/DeNoraTech01012021/testData/test.data.json");
const src = require("../../../main/sourse");

describe("DeNoraTech Client Validation", () => {
  it("Verify BENEFITS page", () => {
    try {
      src.Login(
        clientData.LoginURL,
        testData[0]["email"],
        testData[0]["password"]
      );
      src.ResourcePage();
      browser.takeScreenshot();
    } catch (exception) {
      throw exception;
    }
  });
});
