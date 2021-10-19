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

    createRun(project_id, suiteId, name, case_ids) {

        // for request body syntax: 
        // https://www.gurock.com/testrail/docs/api/reference/results#addresult
        let body = {
            suite_id: suiteId,
            name: name,
            include_all: false,
            case_ids: case_ids
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
            `https://rally.testrail.com/index.php?/api/v2/add_run/${project_id}`,
            options
        );

        result = JSON.parse(result.getBody('utf8'));

        console.log("new test run is created" + JSON.stringify(result));
        return result;

    }

    addResults(runId, results) {
        console.log(results)

        // for request body syntax: 
        // https://www.gurock.com/testrail/docs/api/reference/results#addresult
        let body = {
            results: results,
        }

        console.log(body)

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
            `https://rally.testrail.com/index.php?/api/v2/add_results_for_cases/${runId}`,
            options
        );

        result = JSON.parse(result.getBody('utf8'));

        console.log("executed test run" + JSON.stringify(result));
        return result;

    }
}