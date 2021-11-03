const Page = require('../commons/page');
const content=require('../clientTestData/content');

/**
 * Q4L Preference Page object file containing specific selectors and methods for Preference/Terms page
 */

 class Q4LPrefPage extends Page {
   
    get privacyTermsText() { return $("#privacy-label") }
    get privacyTermsSection() { return $("//*[@id='privacy-label']/..") }
    get privacyTermsCheckBox() { return $("//*[@id='privacy-label']/../..//input/..") }

    get rallyCoachProgramParticipationTermsText() { return $("#privacy-label-gina") }
    get rallyCoachProgramParticipationTermsSection() { return $("//*[@id='privacy-label-gina']/..") }
    get rallyCoachProgramParticipationTermsCheckBox() { return $("//*[@id='privacy-label-gina']/../..//input/..") }

    get sendMeEmailText() { return $("#emails-label") }
    get sendMeEmailSection() { return $("//*[@id='emails-label']/..") }
    get sendMeEmailYesOption() { return $("//*[@id='emails-label']/../..//*[contains(text(),'Yes')]") }
    get sendMeEmailNoOption() { return $("//*[@id='emails-label']/../..//*[contains(text(),'No')]") }

    get sendMeSMSText() { return $("#request-sms-label") }
    get sendMeSMSSection() { return $("//*[@id='request-sms-label']/..") }
    get sendMeSMSYesOption() { return $("//*[@id='request-sms-label']/../..//*[contains(text(),'Yes')]") }
    get sendMeSMSNoOption() { return $("//*[@id='request-sms-label']/../..//*[contains(text(),'No')]") }
    get sendMeSMSMobileNumber() { return $("//input[@data-placeholder='Mobile Number']") }

    get backToAuthorizeBtn() { return $("//*[contains(text(),'Back to Authorize')]")}

    get tncSubmitBtn() { return $("button.button-primary")}

    // validate url contains terms

    async clickBackToAuthorize()
    {
        await this.waitAndClick(this.backToAuthorizeBtn)
    }

    //PrivacyTerms

    async validateQ4LPrivacyTermsDisplayed()
    {
        await expect(this.privacyTermsText).toBeDisplayed()
        await expect(this.privacyTermsCheckBox).toBeDisplayed()
    }

    async clickPrivacyTermsCheckbox()
    {
        await this.privacyTermsCheckBox.scrollIntoView()
        await this.waitAndClick(this.privacyTermsCheckBox)
    }

    //Rally coach program participation terms- not displayed for some users so commented now

    async validateRallyCoachProgramParticipationTermsDisplayed()
    {
        await expect(this.rallyCoachProgramParticipationTermsText).toBeDisplayed()
        await expect(this.rallyCoachProgramParticipationTermsCheckBox).toBeDisplayed()
    }

    async clickRallyCoachProgramTermsCheckbox()
    {
        await this.rallyCoachProgramParticipationTermsCheckBox.scrollIntoView()
        await this.waitAndClick(this.rallyCoachProgramParticipationTermsCheckBox)
    }

    // email question

    async validateSendMeEmailSectionDisplayed()
    {
        await expect(this.sendMeEmailSection).toBeDisplayed()
    }

    async clickSendMeEmailYesOption()
    {
        await this.sendMeEmailYesOption.scrollIntoView()
        await this.waitAndClick(this.sendMeEmailYesOption)
    }

    // sms question

    async validateSendMeSMSSectionDisplayed()
    {
        await expect(this.sendMeSMSSection).toBeDisplayed()
        await expect(this.sendMeSMSMobileNumber).toBeDisplayed()
    }

    async clicksendMeSMSYesOption()
    {
        await this.sendMeSMSYesOption.scrollIntoView()
        await this.waitAndClick(this.sendMeSMSYesOption)
    }

    async clicksendMeSMSNoOption()
    {
        await this.sendMeSMSNoOption.scrollIntoView()
        await this.waitAndClick(this.sendMeSMSNoOption)
    }

    async fillMobileNumber(mobileNumber)
    {
        await this.sendMeSMSMobileNumber.scrollIntoView()
        await this.waitAndType(this.sendMeSMSMobileNumber,mobileNumber)
    }

    async validateTermsPageElementsAreDisplayed()
    {
        await this.validateQ4LPrivacyTermsDisplayed()
        //Rally coach program participation terms- not displayed for some users so commented
        //await this.validateRallyCoachProgramParticipationTermsDisplayed()
        await this.validateSendMeEmailSectionDisplayed()
        await this.validateSendMeSMSSectionDisplayed()
    }

    async fillPreferencesAndContinue()
    {
        await this.clickPrivacyTermsCheckbox()
        //Rally coach program participation terms- not displayed for some users so added in try catch
        try{
            await this.rallyCoachProgramParticipationTermsCheckBox.isDisplayed()
        await this.clickRallyCoachProgramTermsCheckbox()
        }
        catch(error)
        {
            console.error(error)
        }
        await this.clickSendMeEmailYesOption()
        await this.clicksendMeSMSYesOption()
        await this.fillMobileNumber("2222222222")
        await browser.takeScreenshot()
        console.log("User selects terms and condition and fills preferences.")
        await this.tncSubmitBtn.scrollIntoView()
        await this.waitAndClick(this.tncSubmitBtn)
    }

    // this method can be used to check if the fields are mandatory or not- not used in the main test case

    async attemptClickingSubmitWithoutSelectingPreferences()
    {
        await this.tncSubmitBtn.scrollIntoView()
        await this.waitAndClick(this.tncSubmitBtn)

        if(this.backToAuthorizeBtn.isDisplayed==true)
        await this.waitAndClick(this.backToAuthorizeBtn)

        await this.validateQ4LPrivacyTermsIsMandatory()
        await this.validateSendMeEmailQuestionIsMandatory()
        await this.validateSendMeSMSQuestionIsMandatory()
    }

    async validateQ4LPrivacyTermsIsMandatory()
    {
        await expect(this.privacyTermsSection).toHaveTextContaining(content.enterMandatoryFieldsError)
    }

    async validateSendMeEmailQuestionIsMandatory()
    {
        await expect(this.sendMeEmailSection).toHaveTextContaining(content.enterMandatoryFieldsError)
    }
    
    async validateSendMeSMSQuestionIsMandatory()
    {
        await expect(this.sendMeSMSSection).toHaveTextContaining(content.enterMandatoryFieldsError)
    }
}

module.exports = new Q4LPrefPage();