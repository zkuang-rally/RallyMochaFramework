const Page = require('../commons/page');

/**
 * CheckEligibility Page object file containing specific selectors and methods for CheckEligibility page
 */

 class CheckEligibilityPage extends Page {
   
    get unitedHealthCareMemberId () { return $("#search_id") }
    get unitedHealthCareGroupNumber () { return $("#contract_number") }
  

    async fillUnitedHealthCareMemberId(searchId)
    {
        await this.waitAndType(this.unitedHealthCareMemberId,searchId)
    }

    async fillUnitedHealthCareGroupNumber(contractNumber)
    {
        await this.waitAndType(this.unitedHealthCareGroupNumber,contractNumber)
    }
   
    async checkEligibilityAndContinue(searchId,contractNumber)
    {
        await this.fillUnitedHealthCareMemberId(searchId)
        await this.fillUnitedHealthCareGroupNumber(contractNumber)
        await browser.takeScreenshot()
        await this.clickSubmit()
        console.log("User successfully entered Member id, group number and clicked continue")
    }

    async logEligilityFailureDueToDuplication()
    {
        console.log("User registeration failed due to duplicate registration attempt")
        await browser.takeScreenshot()
    }
}

module.exports = new CheckEligibilityPage();