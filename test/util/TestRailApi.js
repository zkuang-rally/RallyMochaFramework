const request = require('sync-request');
const base64 = require('base-64');


module.exports = class TestRailApi {

    constructor() {
        this.userName = 'clientactivation@rallyhealth.com'; //'abhinay.marapaka@rallyhealth.com';
        this.apiKey = 'caTesting1'; //'qT6pVb5sLf20TYSr8qjt-442nGhut8ziVQ2py04ms';
    }

    updateRun(testId = '', statusId = '', comment = '') {

        // for request body syntax: 
        // https://www.gurock.com/testrail/docs/api/reference/results#addresult
        let body = {
            status_id: statusId,
            comment: comment,
            elapsed: "123"
        }

        let options = {
            headers: {
                Authorization: 'Basic ' + new Buffer.from(this.userName + ':' + this.apiKey).toString('base64'),
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache',
                'Retry-Helper': '5',
                'x-api-ident': 'beta'
            },
            timeout: 10 * 60 * 1000 // 10 minute timeout
        };

        options['json'] = body;

        let result = request(
            'POST',
            `https://rally.testrail.com/index.php?/api/v2/add_result/${testId}`,
            options
        );

        result = JSON.parse(result.getBody('utf8'));

        console.log("testrail api response= " + JSON.stringify(result));
        return result;

    }
}