"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var animations_1 = require("@angular/platform-browser/animations");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/common/http");
var router_1 = require("@angular/router");
var app_component_1 = require("./app.component");
var admin_layout_component_1 = require("./layouts/admin-layout/admin-layout.component");
var auth_layout_component_1 = require("./layouts/auth-layout/auth-layout.component");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var app_routing_1 = require("./app.routing");
var components_module_1 = require("./components/components.module");
var fire_1 = require("@angular/fire");
var database_1 = require("@angular/fire/database");
var environment_1 = require("../environments/environment");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                animations_1.BrowserAnimationsModule,
                forms_1.FormsModule,
                http_1.HttpClientModule,
                components_module_1.ComponentsModule,
                ng_bootstrap_1.NgbModule,
                router_1.RouterModule,
                app_routing_1.AppRoutingModule,
                fire_1.AngularFireModule.initializeApp(environment_1.environment.firebaseConfig),
                database_1.AngularFireDatabaseModule
            ],
            declarations: [
                app_component_1.AppComponent,
                admin_layout_component_1.AdminLayoutComponent,
                auth_layout_component_1.AuthLayoutComponent
            ],
            providers: [],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
