const TestRailApi = require("./util/TestRailApi");

describe("Test Rail Api Test", () => {


    console.log("executing test api fetch")

    new TestRailApi().updateRun(447585402, 1, 'Ran via automation 10/4/2021 1:35 PM')
    new TestRailApi().updateRun(447585401, 5, 'Ran via automation')


    console.log("successfully executed test rail api fetch")

})