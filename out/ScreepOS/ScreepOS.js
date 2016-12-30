"use strict";
var ScreepOS = (function () {
    function ScreepOS() {
        this.programs = [];
    }
    ScreepOS.prototype.Import = function (program) {
        this.programs.push(program);
    };
    ScreepOS.prototype.Loop = function () {
        for (var _i = 0, _a = this.programs; _i < _a.length; _i++) {
            var pro = _a[_i];
            pro.Execute();
        }
    };
    return ScreepOS;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ScreepOS;
module.exports = ScreepOS;
