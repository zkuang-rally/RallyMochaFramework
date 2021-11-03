const Page = require('../commons/page');
const content = require('../clientTestData/content');

/**
 * FinalizeAccount Page object file containing specific selectors and methods for FinalizeAccount and account registration success page
 */

class FinalizeAccountPage extends Page {

    get password() { return $("#password") }
    get confirmPassword() { return $("#confirmPassword") }
    get termsAndCondition() { return $("#accept_legal_documents-display-icon") }
    get registrationSuccessheading() { return $("//h1") }
    get continueBtn() { return $("#continue-button") }
    get errorCode() { return $(".error-code") }
    get finalizeAccountPageHeading() { return $("//h1") }

    async validateFinalizeAccountPageHeading() {
        await expect(this.finalizeAccountPageHeading).toHaveTextContaining(content.q4lFinalizeAccountPageHeading)
    }

    async fillPassword(password) {
        await this.waitAndType(this.password, password)
    }

    async fillConfirmPassword(password) {
        await this.waitAndType(this.confirmPassword, password)
    }

    async checkTermsAndCondition() {
        await this.waitAndClick(this.termsAndCondition)
    }

    async finalizeAccountAndContinue(password) {
        await this.fillPassword(password)
        await this.fillConfirmPassword(password)
        await this.checkTermsAndCondition()
        await this.clickSubmit()
        console.log("User successfully filled finalize account detail page and clicked continue")
    }

    async validateAccountRegistration(successMsg) {
        await expect(this.registrationSuccessheading).toHaveTextContaining(content.accountRegistrationSuccessMsg)
    }

    async clickContinue() {
        await this.waitAndClick(this.continueBtn)
    }

    async validateSuccessAndContinue(successMsg, email) {
        await this.validateAccountRegistration(successMsg)
        await browser.takeScreenshot()
        await this.clickContinue()
        console.log("User registration was successfull and login id:" + email + " was created")
    }

    async getErrorCodeForReference() {
        var errorCodeTxt = await this.errorCode.getText()
        return errorCodeTxt
    }
}

module.exports = new FinalizeAccountPage();