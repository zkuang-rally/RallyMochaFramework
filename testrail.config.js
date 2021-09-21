// TESTRAIL_PROJECT_ID = The the project id in TestRail (required)
// name = The name of the test plan. If this filed is empty, we use the following format:
// "Automation_<current_timestamp_include_milliseconds>"
// description = The description of the test plan
// suite_id = The ID of the test suite for the test run(s) (required)
// entries = An array of objects describing the test runs of the plan, see the example below and add_plan_entry
 
"multiple_suites_project" :
{
"TESTRAIL_PROJECT_ID": P9,
"name": "Rally Engage Monthly Release",
"entries": [ { "suite_id": SS2304, "description": "",
"include_all": true, "case_ids": [] } ]
}