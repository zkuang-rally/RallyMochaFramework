module.exports={
    baseUrl:'https://accounts.werally.com/',
    waitForTimeout: 45000,
    mochaTimeout: 120000,
    salesforceurl: 'https://rallyhealth.my.salesforce.com/',
    salesforce_username: 'abhinay.marapaka@rallyhealth.com',
    salesforce_password: 'Ruby123456$',
    existingUserTestDataPath:'test/testdata/ExistingTestData.xlsx',
    existingUserSheetNum: 0,
    newUserTestDataPath:'clientTestData/NewUserRegisterationTestData.xlsx',
    newUserSheetNum: 0,
    clientTestDataPath:'clientTestData/ClientNames.xlsx',
    clientSheetNum: 0,
    newUserListFile:'clientTestData/NewUserRegistered.txt',    
    userPassword:'Testing123!',
    productSpecificRegistrationUrl:'https://accounts.werally.com/partner/optum/optum_default/register?redirect=https://coach.werally.com/programs/q4l',
    wellnessCoachingQ4LUrl:'https://www.rallyhealth.com/quitforlife',
    logLevel: 'info'      // Level of logging verbosity: trace | debug | info | warn | error | silent
}