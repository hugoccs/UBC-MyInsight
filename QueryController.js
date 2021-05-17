"use strict";
var Util_1 = require("../Util");
var DatatypeController_1 = require("./DatatypeController");
var QueryController = (function () {
    function QueryController(datasets) {
        this.datasets = null;
        this.datasets = datasets;
    }
    QueryController.prototype.isValid = function (query) {
        if (typeof query !== 'undefined' && query !== null && Object.keys(query).length > 0) {
            return true;
        }
        return false;
    };
    QueryController.prototype.query = function (query) {
        Util_1.default.trace('QueryController::query( ' + JSON.stringify(query) + ' )');
        var resp = {};
        var a = this.getStr(query.GET);
        console.log(a);
        return { status: 'received', ts: new Date().getTime() };
    };
    QueryController.prototype.getData = function (str) {
        var resultArray = new Array;
        switch (str) {
            case 'courses_dept': {
                var result = new DatatypeController_1.default;
                for (var _i = 0, _a = this.datasets['courses'].result; _i < _a.length; _i++) {
                    var aCouse = _a[_i];
                    result.setcourses_dept(aCouse.courses_dept);
                    resultArray.push(result);
                }
                break;
            }
            case 'courses_id': {
                var result = new DatatypeController_1.default;
                for (var _b = 0, _c = this.datasets['courses'].result; _b < _c.length; _b++) {
                    var aCouse = _c[_b];
                    result.setcourses_id(aCouse.getcourses_id());
                    resultArray.push(result);
                }
                break;
            }
            case 'courses_avg': {
                var result = new DatatypeController_1.default;
                for (var _d = 0, _e = this.datasets['courses'].result; _d < _e.length; _d++) {
                    var aCouse = _e[_d];
                    result.setcourses_avg(aCouse.getcourses_avg());
                    resultArray.push(result);
                }
                break;
            }
            case 'courses_instructor': {
                var result = new DatatypeController_1.default;
                for (var _f = 0, _g = this.datasets['courses'].result; _f < _g.length; _f++) {
                    var aCouse = _g[_f];
                    result.setcourses_instructor(aCouse.getcourses_instructor());
                    resultArray.push(result);
                }
                break;
            }
            case 'courses_title': {
                var result = new DatatypeController_1.default;
                for (var _h = 0, _j = this.datasets['courses'].result; _h < _j.length; _h++) {
                    var aCouse = _j[_h];
                    result.setcourses_title(aCouse.getcourses_title());
                    resultArray.push(result);
                }
                break;
            }
            case 'courses_pass': {
                var result = new DatatypeController_1.default;
                for (var _k = 0, _l = this.datasets['courses'].result; _k < _l.length; _k++) {
                    var aCouse = _l[_k];
                    result.setcourses_pass(aCouse.getcourses_pass());
                    resultArray.push(result);
                }
                break;
            }
            case 'courses_fail': {
                var result = new DatatypeController_1.default;
                for (var _m = 0, _o = this.datasets['courses'].result; _m < _o.length; _m++) {
                    var aCouse = _o[_m];
                    result.setcourses_fail(aCouse.getcourses_fail());
                    resultArray.push(result);
                }
                break;
            }
            case 'courses_audit': {
                var result = new DatatypeController_1.default;
                for (var _p = 0, _q = this.datasets['courses'].result; _p < _q.length; _p++) {
                    var aCouse = _q[_p];
                    result.setcourses_audit(aCouse.getcourses_audit());
                    resultArray.push(result);
                }
                break;
            }
        }
        ;
        return resultArray;
    };
    QueryController.prototype.getDataArray = function (strArray) {
        var resultArray = new Array;
        for (var _i = 0, _a = this.datasets['courses'].result; _i < _a.length; _i++) {
            var aCouse = _a[_i];
            var result = new DatatypeController_1.default;
            for (var _b = 0, strArray_1 = strArray; _b < strArray_1.length; _b++) {
                var str = strArray_1[_b];
                switch (str) {
                    case 'courses_dept': {
                        for (var _c = 0, _d = this.datasets['courses'].result; _c < _d.length; _c++) {
                            var aCouse_1 = _d[_c];
                            result.setcourses_dept(aCouse_1.getcourses_dept());
                        }
                        break;
                    }
                    case 'courses_id': {
                        for (var _e = 0, _f = this.datasets['courses'].result; _e < _f.length; _e++) {
                            var aCouse_2 = _f[_e];
                            result.setcourses_id(aCouse_2.getcourses_id());
                        }
                        break;
                    }
                    case 'courses_avg': {
                        for (var _g = 0, _h = this.datasets['courses'].result; _g < _h.length; _g++) {
                            var aCouse_3 = _h[_g];
                            result.setcourses_avg(aCouse_3.getcourses_avg());
                        }
                        break;
                    }
                    case 'courses_instructor': {
                        for (var _j = 0, _k = this.datasets['courses'].result; _j < _k.length; _j++) {
                            var aCouse_4 = _k[_j];
                            result.setcourses_instructor(aCouse_4.getcourses_instructor());
                        }
                        break;
                    }
                    case 'courses_title': {
                        for (var _l = 0, _m = this.datasets['courses'].result; _l < _m.length; _l++) {
                            var aCouse_5 = _m[_l];
                            result.setcourses_title(aCouse_5.getcourses_title());
                        }
                        break;
                    }
                    case 'courses_pass': {
                        for (var _o = 0, _p = this.datasets['courses'].result; _o < _p.length; _o++) {
                            var aCouse_6 = _p[_o];
                            result.setcourses_pass(aCouse_6.getcourses_pass());
                        }
                        break;
                    }
                    case 'courses_fail': {
                        for (var _q = 0, _r = this.datasets['courses'].result; _q < _r.length; _q++) {
                            var aCouse_7 = _r[_q];
                            result.setcourses_fail(aCouse_7.getcourses_fail());
                        }
                        break;
                    }
                    case 'courses_audit': {
                        for (var _s = 0, _t = this.datasets['courses'].result; _s < _t.length; _s++) {
                            var aCouse_8 = _t[_s];
                            result.setcourses_audit(aCouse_8.getcourses_audit());
                        }
                        break;
                    }
                }
                ;
            }
            resultArray.push(result);
        }
        return resultArray;
    };
    QueryController.prototype.getStr = function (str) {
        if (typeof (str) === "string") {
            return this.getData(str.toString());
        }
        else if (str.constructor === Array) {
            var strArray = str;
            return this.getDataArray(strArray);
        }
        else
            return { status: 'Get error' };
    };
    return QueryController;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = QueryController;
//# sourceMappingURL=QueryController.js.map