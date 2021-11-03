const AccountRegistrationPage=require('../pages/registrationUserDetails.page')
const NiceToMeetYouPage=require('../pages/niceToMeetYou.page')
const CheckEligibilityPage=require('../pages/checkEligibility.page')
const FinalizeAccountSuccessPage=require('../pages/finalizeAccountAndSuccess.page')
const Q4lGetStartedPage = require('../pages/q4lgetstarted.page');
const Q4lPreferencesPage = require('../pages/q4lpreferences.page');
const Q4lAddressPage = require('../pages/q4laddress.page');
const Q4lSuccessPage = require('../pages/q4lsuccess.page');
const Q4lSurveyPage = require('../pages/q4lsurvey.page');
const Q4lDashboardPage = require('../pages/q4ldashboard.page');
const LoginPage = require('../pages/login.page');
const helperObj=require('../utils/helper')
const configval=require('../lib/config')
var newdata=helperObj.returnJsonData(configval.newUserTestDataPath, configval.newUserSheetNum)
const content=require('../clientTestData/content');


describe('RallyHealth application- New User', function() {

    newdata.forEach( async function({FirstName,LastName,DateOfBirth,SearchId,ContractNumber})
    {

    it('New User is able to register and enrol for Q4L program successfully-'+FirstName+"_"+LastName, async function()  
    {
        // ------------New user registration--------------------------------------------------------------
        var newUserData=[helperObj.getCurrentTimestamp(),FirstName,LastName,DateOfBirth,SearchId.toString(),ContractNumber.toString()].join(",")        

        // site launch
        await AccountRegistrationPage.openbrowser("registration/standard-collection")

        // user registeration
        await AccountRegistrationPage.validatePageLoadByUrl(content.accountRegistrationPagePartialUrl)
        let newEmail=helperObj.createNewEmailId()
        await AccountRegistrationPage.fillUserDetailsAndContinue(FirstName,LastName,DateOfBirth,newEmail)
        await NiceToMeetYouPage.validateNiceToMeetYouPageAndContinue(FirstName)
        await CheckEligibilityPage.checkEligibilityAndContinue(SearchId,ContractNumber)

        // conditionally checking is data is already used for account registeration

        if((await browser.getUrl()).includes('prior-user'))
        {
            CheckEligibilityPage.logEligilityFailureDueToDuplication()
            helperObj.writeToFile(configval.newUserListFile,
                newUserData+","+newEmail+",User registered failed-Errorcode:"+
                await FinalizeAccountSuccessPage.getErrorCodeForReference()+"\n")
        }

        // Filling Finalize account page and navigating to registeration success
        await FinalizeAccountSuccessPage.validateFinalizeAccountPageHeading()
        await FinalizeAccountSuccessPage.finalizeAccountAndContinue(configval.userPassword)
        await FinalizeAccountSuccessPage.validateSuccessAndContinue(content.accountRegistrationSuccessMsg,newEmail)
        helperObj.writeToFile(configval.newUserListFile,newUserData+","+newEmail+",User registered successfully\n")


       //------------Q4L enrolment starts-------------------------------------------------------------------------------------
        // Q4L get started page validation
        await Q4lGetStartedPage.validatePageLoadByUrl("q4l")
        await Q4lGetStartedPage.validateQuitForLifeProgramElementsAreDisplayed()
        await Q4lGetStartedPage.clickQ4LGetStartedBtn()

        // Q4L Enrolment - perferences page
        await Q4lGetStartedPage.validatePageLoadByUrl('welcome')
        await Q4lGetStartedPage.validateWelcomePageHeading()
        await Q4lGetStartedPage.clickWelcomePageContinue()
        await Q4lPreferencesPage.validateTermsPageElementsAreDisplayed()
        await Q4lPreferencesPage.fillPreferencesAndContinue()

        // Q4L Enrolment - NRT Kit address page
        await Q4lAddressPage.validateAddressPage() // check the elements once
        await Q4lAddressPage.clickContinue()

        // Q4L Enrolment - Q4L enrollment success
        await Q4lSuccessPage.validateSuccess()
        await Q4lSuccessPage.clickGetStarted()

        // Q4L Survey page
        await Q4lSurveyPage.validatePageLoadByUrl("survey")
        await Q4lSurveyPage.validateReadyToQuitQuestionPageHeading()
        await Q4lSurveyPage.clickReadyToQuitChoice1()
        await Q4lSurveyPage.clickContinue()

        await Q4lSurveyPage.validateQuitDatePageHeading()
        await Q4lSurveyPage.validateQuitDate()
        await Q4lSurveyPage.clickKeepGoingBtn()

        await Q4lSurveyPage.validateCoachesPageHeading()
        await Q4lSurveyPage.validateCoachesSectionsDisplay()
        await Q4lSurveyPage.clickContinue()

        await Q4lSurveyPage.validateWeekdaysPageHeading()
        await Q4lSurveyPage.selectWeekdaysTimingChoice1()
        await Q4lSurveyPage.clickContinue()

        await Q4lSurveyPage.validateWeekendsPageHeading()
        await Q4lSurveyPage.selectWeekendsTimingChoice1()
        await Q4lSurveyPage.clickContinue()     

        await Q4lSurveyPage.validatePhoneNumberPageHeading()
        await Q4lSurveyPage.fillPhoneNumber()
        await Q4lSurveyPage.clickContinue()      

        await Q4lSurveyPage.validateSurveyCompletionHeading()
        await Q4lSurveyPage.validateAllNextStepsDisplayed()
        await Q4lSurveyPage.clickLetsGoBtn()

        // Dashboard - Next steps popup
        await Q4lDashboardPage.validateNextStepPopUpDisplay()
        await Q4lDashboardPage.validateNextStepPopUpFirstHeadingDisplay()
        await Q4lDashboardPage.clickNextBtn1()
        await Q4lDashboardPage.validateNextStepPopUpSecondHeadingDisplay()
        await Q4lDashboardPage.clickNextBtn2()
        await Q4lDashboardPage.validateNextStepPopUpThirdHeadingDisplay()
        await Q4lDashboardPage.clickLetsGoBtn()

        //Main Dashboard
        await Q4lDashboardPage.validateDashboardLookAndFeel()      
        
        // User logs out
        await LoginPage.userLogout()

        await AccountRegistrationPage.openbrowser("https://accounts.werally.com/partner/optum/optum_default/register?redirect=https://coach.werally.com/programs/q4l")
        
    });
});
});


