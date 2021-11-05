const Page = require('../commons/page');
const content=require('../clientTestData/content');

/**
 * NiceToMeetYou Page object file containing specific selectors and methods for NiceToMeetYou page
 */

 class NiceToMeetYouPage extends Page {
   
    get niceToMeetYouHeading () { return $("//h1") }
    get niceToMeetYouLink () { return $("#continue-button") } // changed as of 28th Oct
  

    async validateNiceToMeetYouHeading(fname)
    {
       await expect(this.niceToMeetYouHeading).toHaveTextContaining(''+content.niceToMeetYouuMsg+', '+fname+'!')
    }

    async clickNiceToMeetYouBtn()
    {
        await this.waitAndClick(this.niceToMeetYouLink);
    }    

    async validateNiceToMeetYouPageAndContinue(fname)
    {
        console.log("~~~~~~~~~~~~" + fname)
        browser.pause(5000);
        await this.validateNiceToMeetYouHeading(fname)
        await this.clickNiceToMeetYouBtn()
        console.log("User successfully landed on Nice to meet you page and clicked continue")
    }
   
}

module.exports = new NiceToMeetYouPage(); 