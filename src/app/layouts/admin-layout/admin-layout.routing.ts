import { Routes } from '@angular/router';
import { CarsComponent } from '../../pages/cars/cars.component';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';


export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'cars',      component: CarsComponent },
 
];

 