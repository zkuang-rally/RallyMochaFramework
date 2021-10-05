const TestRailApi = require("./util/TestRailApi");

describe("Test Rail Api Test", () => {


    console.log("executing test api fetch")

    new TestRailApi().updateRun(447585402, 1, 'Ran via automation 10/5/2021 9:55 AM')
    new TestRailApi().updateRun(447585401, 5, 'Ran via automation 10/5/2021 9:55 AM')


    console.log("successfully executed test rail api fetch")

})