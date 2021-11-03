const Page = require('../pageobjects/commons/page');
const content=require('../testdata/content');
const configval=require('../lib/config')

class ValidateSalesforce extends Page
{
    get userid () { return $("#username") }
    get password () { return $("#password") }
    get loginBtn () { return $("#Login") }
    get verificationcode () { return $(".formArea>input") }
    get continueBtn () { return $("#save") }

    get searchBtn() { return $("#phSearchButton")}
    get searchBox() { return $("#phSearchInput")}
    get relatedTab() {return $("(//*[@data-label='Related'])[1]/a")}
    get productLink() { return $("//*[contains(text(),'Quit For Life (Q4L)')]/..//a[contains(text(),'Partner Product')]")}
    get programUrl() { return $("//*[contains(text(),'Phone Number / URL')]/../..//a")}
    get accountRegistrationUrl() { return $("//*[contains(text(),'PIP Registration URL (PROD)')]/../..//a")}
    get alert() { return $('#tryLexDialogX')}

    get clientNameLink() {return $("//a[normalize-space()='q4l']")} 

    async launchSalesforceUrl(urlVal)
    {
        await browser.navigateTo(urlVal)
        await browser.pause(2000)
        console.log("User landed on -"+await browser.getTitle())
        await browser.maximizeWindow()
    }

    async userLogins(emailVal, pswdVal)
    {
        await this.waitAndType(this.userid,emailVal)
        await this.waitAndType(this.password,pswdVal)
        await this.waitAndClick(this.loginBtn)
        
        //await this.waitAndType(this.verificationcode,"356313")

        await this.continueBtn.click() //<<---------------Add debug at this statement to pause the exceution at verification screen to enter it manually-->>

        // Alert dailog box handling
        await this.waitAndClick(this.alert)
        // adding additional alert handling below as sometimes an additonal feedback dailog is also appearing
        try
        {
            await this.waitAndClick(this.alert)
        }
        catch(error)
        {
            console.error(error)
        }
    }

    async validationsInSalesforce(clientName)
    {
        browser.takeScreenshot()
        console.log("User is able to login to Salesforce successfully")
        await this.waitAndType(this.searchBox,clientName)
        await this.waitAndClick(this.searchBtn)
        await browser.takeScreenshot()
        await this.waitAndClick($("//a[contains(text(),'"+clientName+"')]"))
        await browser.takeScreenshot()
        await this.productLink.scrollIntoView()
        await this.waitAndClick(this.productLink)
        await expect(this.programUrl).toHaveTextContaining(configval.wellnessCoachingQ4LUrl)
        await expect(this.accountRegistrationUrl).toHaveTextContaining(configval.productSpecificRegistrationUrl)
        await browser.takeScreenshot()
        console.log("Correct Q4L urls are displayed for the client specified: "+clientName)
    }
}

module.exports = new ValidateSalesforce();