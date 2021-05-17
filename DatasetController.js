"use strict";
var DatatypeController_1 = require("./DatatypeController");
var Util_1 = require("../Util");
var JSZip = require('jszip');
var fs = require('fs');
var DatasetController = (function () {
    function DatasetController() {
        this.datasets = {};
        Util_1.default.trace('DatasetController::init()');
    }
    DatasetController.prototype.deleteDataset = function (id) {
        return new Promise(function (fulfill, reject) {
            try {
                fs.stat('data/' + id + '.json', function (err, stat) {
                    if (err == null) {
                        fs.unlinkSync('data/' + id + '.json');
                        fulfill();
                    }
                    else if (err.code == 'ENOENT') {
                        reject(err);
                    }
                    else {
                        console.log('Some other error: ', err.code);
                        reject(err);
                    }
                });
            }
            catch (err) {
                Util_1.default.trace('DatasetController::process(..) - ERROR: ' + err);
                reject(err);
            }
        });
    };
    DatasetController.prototype.getDataset = function (id) {
        if (this.datasets.hasOwnProperty(id))
            return this.datasets[id];
        this.getDatasets();
        if (this.datasets.hasOwnProperty(id))
            return this.datasets[id];
        return this.datasets;
    };
    DatasetController.prototype.getDatasets = function () {
        var files = fs.readdirSync('./data');
        for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
            var item = files_1[_i];
            if (item.includes('.json')) {
                this.datasets[item.split('.')[0]] = JSON.parse(fs.readFileSync('data/' + item).toString());
            }
        }
        return this.datasets;
    };
    DatasetController.prototype.process = function (id, data) {
        Util_1.default.trace('DatasetController::process( ' + id + '... )');
        var that = this;
        return new Promise(function (fulfill, reject) {
            try {
                var myZip = new JSZip();
                myZip.loadAsync(data, { base64: true }).then(function (zip) {
                    Util_1.default.trace('DatasetController::process(..) - unzipped');
                    var processedDataset = { "result": [JSON] };
                    var allCourseArray = new Array;
                    var allCourseArrayPlain = new Array;
                    var promiseArray = new Array;
                    zip.folder("courses").forEach(function (relativePath, file) {
                        var promiseValue = file.async("string");
                        promiseArray.push(promiseValue);
                    });
                    that.creatDir();
                    Promise.all(promiseArray).then(function (results) {
                        try {
                            for (var _i = 0, results_1 = results; _i < results_1.length; _i++) {
                                var element = results_1[_i];
                                var aCourse = JSON.parse(element);
                                if (aCourse.result.length != 0)
                                    allCourseArray.push(aCourse.result);
                            }
                        }
                        catch (err) {
                            Util_1.default.trace('DatasetController::process(promise.all) - ERROR: ' + err);
                            reject(err);
                        }
                        allCourseArrayPlain = that.mapToDataset(that.creatSimpleArray(allCourseArray));
                        if (allCourseArrayPlain.length < 1)
                            reject("xx");
                        processedDataset['result'] = allCourseArrayPlain;
                        that.save(id, processedDataset);
                        fulfill();
                    }, function (reason) {
                        console.log(reason);
                    });
                }).catch(function (err) {
                    Util_1.default.trace('DatasetController::process(..) - unzip ERROR: ' + err.message);
                    reject(err);
                });
            }
            catch (err) {
                Util_1.default.trace('DatasetController::process(..) - ERROR: ' + err);
                reject(err);
            }
        });
    };
    DatasetController.prototype.save = function (id, processedDataset) {
        this.datasets[id] = processedDataset;
        fs.writeFileSync('data/' + id + '.json', JSON.stringify(this.datasets[id]));
    };
    DatasetController.prototype.creatDir = function () {
        fs.stat('data', function (err, stat) {
            if (err == null) {
                console.log('dir exists');
            }
            else if (err.code == 'ENOENT') {
                fs.mkdirSync('data');
            }
            else {
                console.log('Some other error: ', err.code);
            }
        });
    };
    DatasetController.prototype.creatSimpleArray = function (complexArray) {
        var resultArray = new Array;
        complexArray.forEach(function (element, index) {
            if (element.length != 0) {
                element.forEach(function (item, sec) {
                    resultArray.push(item);
                });
            }
            else {
                resultArray.push(element);
            }
        });
        return resultArray;
    };
    DatasetController.prototype.mapToDataset = function (jsonArray) {
        var resultArray = new Array;
        for (var _i = 0, jsonArray_1 = jsonArray; _i < jsonArray_1.length; _i++) {
            var aCourse = jsonArray_1[_i];
            var myDataset = new DatatypeController_1.default;
            for (var key in aCourse) {
                switch (key) {
                    case 'Subject': {
                        myDataset.setcourses_dept(aCourse['Subject']);
                        break;
                    }
                    case 'Course': {
                        myDataset.setcourses_id(aCourse['Course']);
                        break;
                    }
                    case 'Professor': {
                        myDataset.setcourses_instructor(aCourse['Professor']);
                        break;
                    }
                    case 'Title': {
                        myDataset.setcourses_title(aCourse['Title']);
                        break;
                    }
                    case 'Avg': {
                        myDataset.setcourses_avg(aCourse['Avg']);
                        break;
                    }
                    case 'Pass': {
                        myDataset.setcourses_pass(aCourse['Pass']);
                        break;
                    }
                    case 'Fail': {
                        myDataset.setcourses_fail(aCourse['Fail']);
                        break;
                    }
                    case 'Audit': {
                        myDataset.setcourses_audit(aCourse['Audit']);
                        break;
                    }
                }
                ;
            }
            resultArray.push(myDataset);
        }
        return resultArray;
    };
    return DatasetController;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DatasetController;
//# sourceMappingURL=DatasetController.js.map