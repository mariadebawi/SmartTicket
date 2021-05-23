import { Routes } from '@angular/router';
import { DriversComponent } from 'src/app/pages/drivers/drivers.component';
import { CarsComponent } from '../../pages/cars/cars.component';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';


export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'cars',      component: CarsComponent },
    { path: 'drivers',      component: DriversComponent },

];

 