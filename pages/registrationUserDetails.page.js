const Page = require('../commons/page');

/**
 * RegistrationUserDetails Page object file containing specific selectors and methods for RegistrationUserDetails page
 */

 class RegistrationUserDetailsPage extends Page {
   
    get firstname () { return $("#first_name") }
    get lastname () { return $("#last_name") }
    get dob () { return $("#date_of_birth") }
    get email () { return $("#email") }
  

    async fillFirstName(fname)
    {
        await this.waitAndType(this.firstname,fname)
    }    

    async fillLastName(lname)
    {
        
        await this.waitAndType(this.lastname,lname)
    } 

    async fillDateOfBirth(dobVal)
    {
        await this.waitAndType(this.dob,dobVal)
    } 

    async fillEmail(emailVal)
    {
        await this.waitAndType(this.email,emailVal)
    } 

    async fillUserDetailsAndContinue(fname,lname,dobVal,emailVal)
    {
 
        await this.fillFirstName(fname);
        await this.fillLastName(lname);
        await this.fillDateOfBirth(dobVal);
        await this.fillEmail(emailVal);
        await browser.takeScreenshot();
        await this.clickSubmit();
        console.log("User successfully filled user details and clicked continue")
    }
   
}

module.exports = new RegistrationUserDetailsPage();