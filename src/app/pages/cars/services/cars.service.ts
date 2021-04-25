import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import Car from '../model/car';
@Injectable({
  providedIn: 'root'
})
export class CarsService {
  private dbPath = '/cars';

  CarsRef: AngularFireList<Car> = null;

  constructor(private db: AngularFireDatabase) {
    this.CarsRef = db.list(this.dbPath);
  }

  getAllCars(): AngularFireList<Car> {
    return this.CarsRef;
  }

  createCar(car: Car): any {
    console.log(car)
   return this.CarsRef.push(car);
  }

  deleteCar(key: string): Promise<void> {
    return this.CarsRef.remove(key);
  }

  updateCar(key: string, value: any): Promise<void> {
    return this.CarsRef.update(key, value);
  }
  
  /*
  deleteAllCars(): Promise<void> {
    return this.CarsRef.remove();
  }
  */

}
