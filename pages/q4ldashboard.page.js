const Page = require('../commons/page');
const content=require('../clientTestData/content');

/**
 * Q4L Dashboard Page object file containing specific selectors and methods for Q4L Dashboard page
 */

 class Q4LDashboardPage extends Page {

    // Next Steps popup
    get nextStepsPopUp () { return $("div.feature1")}
    get nextStepsPopUpHeading1 () { return $("//h1[contains(text(),'Welcome to Your Dashboard')]")}
    get nextBtn1 () { return $("//*[@id='cdk-step-content-0-0']/div/div[2]/button")}
    get nextStepsPopUpHeading2 () { return $("//h1[contains(text(),'Check in With a Coach')]")}
    get nextBtn2 () { return $("//*[@id='cdk-step-content-0-1']/div/div[2]/button")}
    get nextStepsPopUpHeading3 () { return $("//h1[contains(text(),'Take Action')]")}
    get letsGoBtn () { return $("//*[@id='cdk-step-content-0-2']/div/div[2]/button")}
   
    // Next Steps popup
    async validateNextStepPopUpDisplay()
    {
        await expect(this.nextStepsPopUp).toBeDisplayed()
        console.log("User lands at Dashboard page and sees another window displaying next steps. User can click next to move forward and arrive at dashboard.")
    }

    async validateNextStepPopUpFirstHeadingDisplay()
    {
        await expect(this.nextStepsPopUpHeading1).toBeDisplayed()
    }

    async clickNextBtn1()
    {
        await browser.takeScreenshot()
        await this.waitAndClick(this.nextBtn1)
    }

    async validateNextStepPopUpSecondHeadingDisplay()
    {
        await expect(this.nextStepsPopUpHeading2).toBeDisplayed()
    }

    async clickNextBtn2()
    {
        await browser.takeScreenshot()
        await this.waitAndClick(this.nextBtn2)
    }

    async validateNextStepPopUpThirdHeadingDisplay()
    {
        await expect(this.nextStepsPopUpHeading3).toBeDisplayed()
    }

    async clickLetsGoBtn()
    {
        await browser.takeScreenshot()
        await this.waitAndClick(this.letsGoBtn)
    }

    async validateStep1HeadingIsDisplayed()
    {
        await expect(this.step1heading).toBeDisplayed()
    }



    // Main Dashboard

    get step1heading () { return $("//*[contains(text(),'Step 1')]/../..") }
    get updateQuitDateLink () { return $("//a[contains(text(),'Update Quit Date')]") }
    get card1CoachMessage () { return $("div.coach-message") }
    get card2SurveyCard () { return $("//*[contains(@aria-label,'Survey Card')]") }
    get card2SurverCTA () { return $("//*[contains(text(),'Get Started')]/../..//*[contains(@href,'coaching_q4l_nrtAssessment')]")}
    get card3MediaCard () { return $("//*[contains(@aria-label,'Media card')]/..//*[contains(text(),'TEXT A COACH')]/../..") }
    get card3SignUpCTA () { return $("//button[contains(text(),'Sign Up')]")}
    get card4BonusAction () { return $("//*[contains(@aria-label,'Bonus action')]") }
    get card5MobileApp () { return $("//*[contains(@aria-label,'Media card')]/..//*[contains(text(),'Mobile App')]/../..") }
    get card6Article () { return $("(//*[contains(@aria-label,'Media card')]/..//*[contains(text(),'ARTICLE')]/../..)[1]") }
    get card7Video () { return $("(//*[contains(@aria-label,'Media card')])[4]") }
    get dashboardMiniTrackers() {return $(".mini-trackers-container.ng-star-inserted")}

    async validateStep1HeadingDisplayed()
    {
        await expect(this.step1heading).toHaveTextContaining(content.dashboardStep1)
    }

    async validateQuitDateLinkDisplayed()
    {
        await expect(this.updateQuitDateLink).toBeDisplayed()
    }

    async validateCard1CoachMessageDisplay()
    {
        await expect(this.card1CoachMessage).toBeDisplayed()
        await expect(this.card1CoachMessage).toHaveTextContaining("Hi")
        await expect(this.card1CoachMessage).toHaveTextContaining(content.card1CoachMessage)
    }

    async validateCard2SurveyCardDisplay()
    {
        await expect(this.card2SurveyCard).toBeDisplayed()
        await expect(this.card2SurverCTA).toBeDisplayed()
    }

    async validateCard3MediaCardDisplay()
    {
        await expect(this.card3MediaCard).toHaveTextContaining(content.card3TextACoachMediaCard)
        await expect(this.card3SignUpCTA).toBeDisplayed()
    }

    async validateCard4BonusActionDisplay()
    {
        await expect(this.card4BonusAction).toHaveTextContaining(content.card4BonusAction)
    }

    async validatecard5MobileAppDisplay()
    {
        await expect(this.card5MobileApp).toBeDisplayed()
    }

    async validateCard6ArticleDisplay()
    {
        this.card6Article.scrollIntoView()
        await expect(this.card6Article).toBeDisplayed()
    }

    async validateCard7VideoDisplay()
    {
        this.card7Video.scrollIntoView()
        await expect(this.card7Video).toBeDisplayed()
    }

    async validateDashboardMintrackerSectionDisplay()
    {
        await expect(this.dashboardMiniTrackers).toBeDisplayed()
    }

    async validateDashboardLookAndFeel()
    {
        await browser.takeScreenshot()
        await this.validateStep1HeadingDisplayed()
        await this.validateQuitDateLinkDisplayed()
        await this.validateCard1CoachMessageDisplay()
        await this.validateCard2SurveyCardDisplay()
        await this.validateCard3MediaCardDisplay()
        await this.validateCard4BonusActionDisplay()
        await this.validatecard5MobileAppDisplay()
        await this.validateCard6ArticleDisplay()
        await this.validateCard7VideoDisplay()
        await this.validateDashboardMintrackerSectionDisplay()
        await browser.takeScreenshot()
        console.log("User is able to view Dashboard (overall look and feel is as expected).")
    }

}

module.exports = new Q4LDashboardPage();