import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import Driver from '../models/driver';
@Injectable({
  providedIn: 'root'
})
export class DriversService {
  private dbPath = '/drivers';

  DriverRef: AngularFireList<Driver> = null;

  constructor(private db: AngularFireDatabase) {
    this.DriverRef = db.list(this.dbPath);
  }

  getAlDrivers(): AngularFireList<Driver> {
    return this.DriverRef;
  }

  createDriver(driver: Driver): any {
   return this.DriverRef.push(driver);
  }

  deleteDriver(key: string): Promise<void> {
    return this.DriverRef.remove(key);
  }

  updateDriver(key: string, value: any): Promise<void> {
    return this.DriverRef.update(key, value);
  }
  
  /*
  deleteAllCars(): Promise<void> {
    return this.CarsRef.remove();
  }
  */

}
