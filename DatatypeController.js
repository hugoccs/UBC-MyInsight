"use strict";
var DatatypeController = (function () {
    function DatatypeController() {
        this.courses_dept = null;
        this.courses_id = null;
        this.courses_avg = null;
        this.courses_instructor = null;
        this.courses_title = null;
        this.courses_pass = null;
        this.courses_fail = null;
        this.courses_audit = null;
    }
    DatatypeController.prototype.setcourses_dept = function (dept) {
        this.courses_dept = dept;
    };
    DatatypeController.prototype.setcourses_id = function (id) {
        this.courses_id = id;
    };
    DatatypeController.prototype.setcourses_avg = function (avg) {
        this.courses_avg = avg;
    };
    DatatypeController.prototype.setcourses_instructor = function (instructor) {
        this.courses_instructor = instructor;
    };
    DatatypeController.prototype.setcourses_title = function (title) {
        this.courses_title = title;
    };
    DatatypeController.prototype.setcourses_pass = function (pass) {
        this.courses_pass = pass;
    };
    DatatypeController.prototype.setcourses_fail = function (fail) {
        this.courses_fail = fail;
    };
    DatatypeController.prototype.setcourses_audit = function (audit) {
        this.courses_audit = audit;
    };
    DatatypeController.prototype.getcourses_dept = function () {
        return this.courses_dept;
    };
    DatatypeController.prototype.getcourses_id = function () {
        return this.courses_id;
    };
    DatatypeController.prototype.getcourses_avg = function () {
        return this.courses_avg;
    };
    DatatypeController.prototype.getcourses_instructor = function () {
        return this.courses_instructor;
    };
    DatatypeController.prototype.getcourses_title = function () {
        return this.courses_title;
    };
    DatatypeController.prototype.getcourses_pass = function () {
        return this.courses_pass;
    };
    DatatypeController.prototype.getcourses_fail = function () {
        return this.courses_fail;
    };
    DatatypeController.prototype.getcourses_audit = function () {
        return this.courses_audit;
    };
    return DatatypeController;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DatatypeController;
//# sourceMappingURL=DatatypeController.js.map