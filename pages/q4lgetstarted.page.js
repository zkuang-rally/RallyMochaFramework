const Page = require('../commons/page');
const content=require('../clientTestData/content');

/**
 * Q4L program get started Page object file containing specific selectors and methods for Q4L program get started page and pragram welcome page
 */

 class Q4LGetStartedPage extends Page {
   
    get quitForLifeProgramHeading () { return $("//h1") }
    get quitForLifeRewardText () { return $("div.reward-text") }
    get quitForLifeGetStartedBtn() { return $("//*[contains(text(),'Get Started')]/../..//*[@type='button']") } 

    get programLengthBenifitTitle() { return $("(//div[contains(@class,'benefits')])[1]//*[@class='benefits-title']") } 
    get programLengthBenifitDesc() { return $("(//div[contains(@class,'benefits')])[1]//*[@class='benefits-description']") } 

    get timeCommitmentBenifitTitle() { return $("(//div[contains(@class,'benefits')])[2]//*[@class='benefits-title']") }  
    get timeCommitmentBenifitDesc() { return $("(//div[contains(@class,'benefits')])[2]//*[@class='benefits-description']") } 

    get coachSupportBenifitTitle() { return $("(//div[contains(@class,'benefits')])[3]//*[@class='benefits-title']") } 
    get coachSupportBenifitDesc() { return $("(//div[contains(@class,'benefits')])[3]//*[@class='benefits-description']") }
 
    // add validation for url - already there in common page just to add in test it block
    
    async validateProgramLengthBenifit()
    {
        await expect(this.programLengthBenifitTitle).toHaveTextContaining(content.q4lBenifit1Title)
        await expect(this.programLengthBenifitDesc).toHaveTextContaining(content.q4lBenifit1Desc)
    }

    async validateTimeCommitmentBenifit()
    {
        await expect(this.timeCommitmentBenifitTitle).toHaveTextContaining(content.q4lBenifit2Title)
        await expect(this.timeCommitmentBenifitDesc).toHaveTextContaining(content.q4lBenifit2Desc)
    }

    async validateCoachBenifit()
    {
        await expect(this.coachSupportBenifitTitle).toHaveTextContaining(content.q4lBenifit3Title)
        await expect(this.coachSupportBenifitDesc).toHaveTextContaining(content.q4lBenifit3Desc)
    }

    async validateQuitForLifeProgramElementsAreDisplayed()
    {
        await expect(this.quitForLifeProgramHeading).toHaveTextContaining(content.q4lGetStartedPageHeading)
        // reward text not displayed for some existing users, hence below is commented
        //await expect(this.quitForLifeRewardText).toBeDisplayed()

        await expect(this.quitForLifeGetStartedBtn).toBeDisplayed()
        await this.validateProgramLengthBenifit()
        await this.validateTimeCommitmentBenifit()
        await this.validateCoachBenifit()      
        await browser.takeScreenshot()
    }   

    async clickQ4LGetStartedBtn()
    {
        console.log("User lands at starting page of Quit For Life program page successfully")
        await this.waitAndClick(this.quitForLifeGetStartedBtn)
    }

    // Q4l Welcome page continue button

    get welcomePageContinueBtn() { return $("//*[contains(@href,'q4l')]") }
    get welcomePageHeading() { return $("//h1") }

    //check url contains welcome

    async validateWelcomePageHeading()
    {
        await expect(this.welcomePageHeading).toHaveTextContaining('Welcome')
        browser.takeScreenshot()
        console.log("User lands at welcome page of Quit For Life program.")
    }

    async clickWelcomePageContinue()
    {
        await this.waitAndClick(this.welcomePageContinueBtn)
    }    

}

module.exports = new Q4LGetStartedPage();