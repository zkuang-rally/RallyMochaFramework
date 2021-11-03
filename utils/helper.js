var fs = require('fs');
const configVal = require('../lib/config')
var XLSX = require("xlsx");

class Helper {

    // changeFormattedDate(value)
    // {
    //     var initial = value.split("-"); // yyyy-mm-dd
    //     var formattedDate= [ initial[2], initial[1], initial[0] ].join("/") //=> 'dd/mm/yyyy'

    //     return formattedDate
    // }

    writeToFile(filepath, content) {
        try {
            fs.writeFileSync(filepath, content, { flag: "a+" })
        } catch (error) {
            console.error(error)
        }
    }

    createNewEmailId() {
        var newEmailId = (this.getCurrentTimestamp().split(" ")[2]).toString() + this.randomNumberGenerator(1, 1000) + "abhinayem@mailinator.com"
        return newEmailId
    }

    randomNumberGenerator(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    getCurrentTimestamp() {
        let current_datetime = new Date()
        return current_datetime.toString().split("(")[0].trimEnd()
    }

    returnJsonData(sheetpath, sheetnum) {
        var workbook = XLSX.readFile(sheetpath);
        var sheetList = workbook.SheetNames
        var worksheet = workbook.Sheets[sheetList[sheetnum]];
        var data = XLSX.utils.sheet_to_json(worksheet, { raw: false })
        return data
    }
}

module.exports = new Helper();