const Page = require('../commons/page');

/**
 * Q4L Success Page object file containing specific selectors and methods for Success page
 */

 class Q4LSuccessPage extends Page {
   
    get successMsg () { return $("//h1") }
    get q4lSurveyGetStartedBtn() { return $("a.button-primary") }

    async validateSuccess()
    {
        this.validatePageLoadByUrl("complete")
        await expect(this.successMsg).toHaveTextContaining("Congrats")
        await browser.takeScreenshot()
        console.log("User is able to successfully complete the Q4l program enrollment.")
    }

    async clickGetStarted()
    {
        await this.waitAndClick(this.q4lSurveyGetStartedBtn)
    }
}

module.exports = new Q4LSuccessPage();