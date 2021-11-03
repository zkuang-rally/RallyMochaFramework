/**
* main page object containing common methods, selectors and functionality
* that is shared across all page objects
*/

module.exports = class Page {

    get submit () { return $("#submit-button") }

    async openbrowser(urlVal)
    {
        await browser.url(urlVal)
        await browser.maximizeWindow()
        console.log("User successfully launched the url:"+urlVal)
    }

    async launchRallyCoachLoginSite(urlVal)
    {
        await browser.navigateTo(urlVal)
        await browser.maximizeWindow()
        console.log("User successfully launched the url:"+urlVal)
    }

    async validatePageLoadByTitle(pageTitle)
    {
        await expect(browser).toHaveTitleContaining(pageTitle)
        console.log("User landed on -"+await browser.getTitle())
    }    
    
    async validatePageLoadByUrl(partialUrl)
    {
        await expect(browser).toHaveUrlContaining(partialUrl)
        console.log("User landed on -"+await partialUrl+" page")
        await browser.takeScreenshot()
    }    

    async waitAndClick(elementloc)
    {
        try{
        await elementloc.waitForDisplayed()
        await elementloc.click()
        }
        catch(error)
        {
            console.error(error)
        }
    }

    async waitAndType(elementloc,value)
    {
        try{
        await elementloc.waitForDisplayed()
        await elementloc.setValue(value)
        }
        catch(error)
        {
            console.error(error)
        }
    }

    async clickSubmit()
    {
        await this.waitAndClick(this.submit)
    }
}
