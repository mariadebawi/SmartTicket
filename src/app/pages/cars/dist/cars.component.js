"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CarsComponent = void 0;
var core_1 = require("@angular/core");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var forms_1 = require("@angular/forms");
var operators_1 = require("rxjs/operators");
var moment = require("moment");
var car_1 = require("./model/car");
var CarsComponent = /** @class */ (function () {
    function CarsComponent(modalService, formBuilder, carsService) {
        this.modalService = modalService;
        this.formBuilder = formBuilder;
        this.carsService = carsService;
        this.closeResult = '';
        this.submitted = false;
        this.car = new car_1["default"]();
    }
    CarsComponent.prototype.ngOnInit = function () {
        this.voitureForm = this.formBuilder.group({
            matricule: ['', forms_1.Validators.required],
            marque: ['', forms_1.Validators.required],
            status: ['', forms_1.Validators.required] ? ['', forms_1.Validators.required] : this.carUpdated,
            chauffeur: ['', forms_1.Validators.required]
        });
        this.retrieveCars();
    };
    CarsComponent.prototype.open = function (content, car) {
        var _this = this;
        this.modalService.open(content).result.then(function (result) {
            _this.closeResult = "Closed with: " + result;
        }, function (reason) {
            _this.closeResult = "Dismissed " + _this.getDismissReason(reason);
        });
        this.carUpdated = car;
    };
    CarsComponent.prototype.getDismissReason = function (reason) {
        this.onReset();
        if (reason === ng_bootstrap_1.ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        }
        else if (reason === ng_bootstrap_1.ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        }
        else {
            return "with: " + reason;
        }
    };
    CarsComponent.prototype.onChange = function (deviceValue) {
        console.log(deviceValue);
    };
    CarsComponent.prototype.retrieveCars = function () {
        var _this = this;
        this.carsService.getAllCars().snapshotChanges().pipe(operators_1.map(function (changes) {
            return changes.map(function (c) {
                return (__assign({ key: c.payload.key }, c.payload.val()));
            });
        })).subscribe(function (data) {
            _this.carsList = data;
            console.log(_this.carsList);
        });
    };
    CarsComponent.prototype.onSelectFile = function (event) {
        var _this = this;
        this.selecetdFile = event.target.files[0];
        var reader = new FileReader();
        reader.onload = function () {
            _this.url = reader.result;
        };
        reader.readAsDataURL(this.selecetdFile);
    };
    Object.defineProperty(CarsComponent.prototype, "f", {
        // convenience getter for easy access to form fields
        get: function () { return this.voitureForm.controls; },
        enumerable: false,
        configurable: true
    });
    CarsComponent.prototype.onSubmit = function () {
        var _this = this;
        this.submitted = true;
        if (this.voitureForm.invalid) {
            return;
        }
        this.car = ({
            marque: this.voitureForm.value.marque,
            matricule: this.voitureForm.value.matricule,
            status: this.voitureForm.value.status,
            chauffeur: this.voitureForm.value.chauffeur,
            deleted: false,
            image: this.url ? this.url : '',
            createdAt: Date.now(),
            updatedAt: Date.now()
        });
        this.carsService.createCar(this.car).then(function () {
            console.log('Created new item successfully!');
            _this.submitted = true;
        });
    };
    CarsComponent.prototype.onReset = function () {
        this.submitted = false;
        this.voitureForm.reset();
    };
    CarsComponent.prototype.getDate = function (date) {
        return moment(date).format('Do MMMM YYYY');
    };
    CarsComponent.prototype.supprimerCar = function (car) {
        this.carsService.deleteCar(car.key)
            .then(function () {
            // this.refreshList.emit();
            console.log('The tutorial was updated successfully!');
        })["catch"](function (err) { return console.log(err); });
    };
    CarsComponent.prototype.onSubmitUpdated = function () {
        var _this = this;
        this.submitted = true;
        if (this.voitureForm.invalid) {
            return;
        }
        this.car = ({
            marque: this.voitureForm.value.marque,
            matricule: this.voitureForm.value.matricule,
            status: this.voitureForm.value.status ? this.voitureForm.value.status : this.carUpdated.status,
            chauffeur: this.voitureForm.value.chauffeur,
            deleted: false,
            image: this.url ? this.url : '',
            //createdAt : Date.now(),
            updatedAt: Date.now()
        });
        this.carsService.updateCar(this.carUpdated.key, this.car).then(function () {
            console.log('Created new item successfully!');
            _this.submitted = true;
        });
    };
    CarsComponent = __decorate([
        core_1.Component({
            selector: 'app-cars',
            templateUrl: './cars.component.html',
            styleUrls: ['./cars.component.scss']
        })
    ], CarsComponent);
    return CarsComponent;
}());
exports.CarsComponent = CarsComponent;
