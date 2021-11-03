const Page = require('../commons/page');
const content=require('../clientTestData/content');

/**
 * Q4LSurvey Page object file containing specific selectors and methods for all Q4LSurvey pages
 */

 class Q4LSurveyPageReadyToQuitQuestion extends Page {
   
    // common element
    get continueBtn() { return $("button.button-primary")}

    async clickContinue()
    {
        await browser.takeScreenshot()
        await this.continueBtn.scrollIntoView()
        await this.waitAndClick(this.continueBtn)
    }    

    
    // Ready or not to quit

    get readyToQuitChoice1 () { return $("//*[contains(text(),'already quit')]/../..") }
    get notReadyToQuitChoice2 () { return $("//*[contains(text(),'not sure')]/../..") }
    get readyToQuitQuestionPageHeading() { return $("//h1")}

    async validateReadyToQuitQuestionPageHeading()
    {
        await this.readyToQuitQuestionPageHeading.waitForDisplayed
        await expect(this.readyToQuitQuestionPageHeading).toHaveTextContaining(content.q4lSurverQuestion1)
    }

    async clickReadyToQuitChoice1()
    {
        await this.waitAndClick(this.readyToQuitChoice1)
        await browser.takeScreenshot()
        console.log("User lands at Quit For Life Survey page and start filling the survey.")
        console.log("User fills ready to quit or not question in the Q4l Survey")
    }    

    async clickNotReadyToQuitChoice2()
    {
        await this.waitAndClick(this.notReadyToQuitChoice2)
    }    

    // Select quit date

    get quitDateTextbox () { return $(".mat-datepicker-input") }
    get notNowBtn () { return $("//*[contains(text(),'Not Now')]") }
    get keepGoingBtn () { return $("//*[contains(text(),'Keep Going')]") }
    get quitDatePageHeading(){ return $("//h1")}

    async validateQuitDatePageHeading()
    {
        await expect(this.quitDatePageHeading).toHaveTextContaining(content.q4lSurverQuestion2)
    }

    async validateQuitDate()
    {
        await expect(this.quitDateTextbox).toBeDisplayed()
        console.log("User fills the quit date question")
    }

    async clickSkipBtn()
    {
        await this.waitAndClick(this.notNowBtn)
    }

    async clickKeepGoingBtn()
    {
        await browser.takeScreenshot()
        await this.waitAndClick(this.keepGoingBtn)
    }

    // How coaches help you quit

    get coachesSection1 () { return $("//*[contains(text(),'Coach Check-Ins')]/../..") }
    get coachesSection2 () { return $("//*[contains(text(),'Virtual Group Sessions')]/../..") }
    get quitCoachesPageHeading(){ return $("//h1")}

    async validateCoachesPageHeading()
    {
        await expect(this.quitCoachesPageHeading).toHaveTextContaining(content.q4lSurverQuestion3)
    }

    async validateCoachesSectionsDisplay()
    {
       await expect(this.coachesSection1).toBeDisplayed()
       await expect(this.coachesSection2).toBeDisplayed()
       await browser.takeScreenshot()
       console.log("User validates the coaches details in the Q4L survey")
    }

    // good weekdays and weekends timing to call you

    get weekdaysChoice1 () { return $("#a1") }
    get weekdaysChoice2 () { return $("#a2") }
    get weekdaysChoice3 () { return $("#a3") }
    get quitweekdaysPageHeading(){ return $("//h1")}

    get weekendsChoice1 () { return $("#a1") }
    get weekendsChoice2 () { return $("#a2") }
    get weekendsChoice3 () { return $("#a3") }
    get quitweekendsPageHeading(){ return $("//h1")}

    async validateWeekdaysPageHeading()
    {
        await expect(this.quitweekdaysPageHeading).toHaveTextContaining(content.q4lSurverQuestion4)
        console.log("User fills the call timing question for weekdays")
    }

    async validateWeekendsPageHeading()
    {
        await expect(this.quitweekendsPageHeading).toHaveTextContaining(content.q4lSurverQuestion5)
        console.log("User fills the call timing question for weekends")
    }

    async selectWeekdaysTimingChoice1()
    {
        await this.waitAndClick(this.weekdaysChoice1)
    }

    async selectWeekdaysTimingChoice2()
    {
        await this.waitAndClick(this.weekdaysChoice2)
    }

    async selectWeekdaysTimingChoice3()
    {
        await this.waitAndClick(this.weekdaysChoice3)
    }

    async selectWeekendsTimingChoice1()
    {
        await this.waitAndClick(this.weekendsChoice1)
    }

    async selectWeekendsTimingChoice2()
    {
        await this.waitAndClick(this.weekendsChoice2)
    }

    async selectWeekendsTimingChoice3()
    {
        await this.waitAndClick(this.weekendsChoice3)
    }


    // Enter phone number

    get phoneNumberTextbox () { return $("(//input)[1]") }
    get phoneNumberPageHeading () { return $("//h1") }

    async validatePhoneNumberPageHeading()
    {
        await expect(this.phoneNumberPageHeading).toHaveTextContaining(content.q4lSurverQuestion6)
        console.log("User fills the phone number details")
    }

    async fillPhoneNumber()
    {
       await this.waitAndType(this.phoneNumberTextbox,"222-222-2222")
    }

    // Next steps page

    get nextStepsHeading () { return $("//h1") }

    get nextSteps1Desc(){ return $("//*[contains(text(),'Before Quit Date')]/../..//*[contains(text(),'Step 1:')]/..")}
    get nextSteps2Desc(){ return $("//*[contains(text(),'Before Quit Date')]/../..//*[contains(text(),'Step 2:')]/..")}
    get nextSteps3Desc(){ return $("//*[contains(text(),'Before Quit Date')]/../..//*[contains(text(),'Step 3:')]/..")}
    get nextSteps4Desc(){ return $("//*[contains(text(),'After Quit Date')]/../..//*[contains(text(),'Step 4:')]/..")}
    get nextSteps5Desc(){ return $("//*[contains(text(),'After Quit Date')]/../..//*[contains(text(),'Step 5:')]/..")}
    get nextSteps6Desc(){ return $("//*[contains(text(),'After Quit Date')]/../..//*[contains(text(),'Step 6:')]/..")}

    get letsGoBtn () { return $("//*[contains(text(),'Go')]") }

    async validateSurveyCompletionHeading()
    {
        await expect(this.nextStepsHeading).toHaveTextContaining(content.q4lSurveySubimissionSuccess)
        console.log("User success fills all preferences and lands on Q4L survey completion page")
    }

    async validateAllNextStepsDisplayed()
    {
        await expect(this.nextSteps1Desc).toHaveTextContaining('Getting Ready to Quit')
        await expect(this.nextSteps2Desc).toHaveTextContaining('Making Your Quit Plan')
        await expect(this.nextSteps3Desc).toHaveTextContaining('Managing Urges With Mini Quits')
        await expect(this.nextSteps4Desc).toHaveTextContaining('Quitting With Confidence')
        await expect(this.nextSteps5Desc).toHaveTextContaining('Feeling Healthier')
        await expect(this.nextSteps6Desc).toHaveTextContaining('Making This Quit Last')
        console.log("User is able to see all next steps")
    }

    async clickLetsGoBtn()
    {
        await browser.takeScreenshot()
        await this.waitAndClick(this.letsGoBtn)
    }
    
}

module.exports = new Q4LSurveyPageReadyToQuitQuestion();