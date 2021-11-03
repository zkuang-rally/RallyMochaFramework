const Page = require('../commons/page');
const content=require('../clientTestData/content');

/**
 * Address Page object file containing specific selectors and methods for Address page
 */

 class AddressPage extends Page {
   
    get nrtKitAddressPageHeading () { return $("//h1") }
    get streetAddressLine () { return $("//*[contains(@name,'ship-address')]") }
    get city () { return $("//*[contains(@name,'ship-city')]") }
    get state () { return $("//*[contains(@name,'ship-state')]") }
    get zipCode () { return $("//*[contains(@name,'ship-zip')]") }
    get continueBtn() { return $("button.button-primary")}


    async validateAddressPageHeading()
    {
        await expect(this.nrtKitAddressPageHeading).toHaveTextContaining(content.nrtKitQuestion)
    }

    async validateStreetAddress()
    {
        await expect(this.streetAddressLine).toBeDisplayed()
    } 

    async validateCity()
    {
        await expect(this.city).toBeDisplayed()
    } 

    async validateState()
    {
        await expect(this.state).toBeDisplayed()
    } 

    async validateZipCode()
    {
        await expect(this.zipCode).toBeDisplayed()
    } 

    async clickContinue()
    {
        await this.continueBtn.click()
    }   

    async validateAddressPage()
    {
        await this.validateAddressPageHeading()
        await this.validateStreetAddress()
        await this.validateCity()
        await this.validateState()
        await this.validateZipCode()
        await browser.takeScreenshot()
        console.log("User verifies/fills the NRT Kit Shipping address details and continues.")
    }

    
}

module.exports = new AddressPage();