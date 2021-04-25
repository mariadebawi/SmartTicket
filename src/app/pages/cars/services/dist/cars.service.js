"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CarsService = void 0;
var core_1 = require("@angular/core");
var CarsService = /** @class */ (function () {
    function CarsService(db) {
        this.db = db;
        this.dbPath = '/cars';
        this.CarsRef = null;
        this.CarsRef = db.list(this.dbPath);
    }
    CarsService.prototype.getAllCars = function () {
        return this.CarsRef;
    };
    CarsService.prototype.createCar = function (car) {
        console.log(car);
        return this.CarsRef.push(car);
    };
    CarsService.prototype.deleteCar = function (key) {
        return this.CarsRef.remove(key);
    };
    CarsService.prototype.updateCar = function (key, value) {
        return this.CarsRef.update(key, value);
    };
    CarsService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], CarsService);
    return CarsService;
}());
exports.CarsService = CarsService;
