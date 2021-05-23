import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarsService } from '../services/cars.service';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import Driver from '../models/driver';
import { DriversService } from '../services/drivers.service';

@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.scss']
})
export class DriversComponent implements OnInit {
  closeResult = '';
  url;
  driversList : Driver[];
  selecetdFile: File;
  imagePreview: string;
  chaffeurForm: FormGroup;
  submitted = false;
  driver: Driver = new Driver();
  driverUpdated: Driver;
  constructor(private modalService: NgbModal , private formBuilder: FormBuilder , private driverService : DriversService) { }

  ngOnInit() {
    this.chaffeurForm = this.formBuilder.group({
      matricule: ['', Validators.required],
      marque: ['', Validators.required],
      status: ['', Validators.required]?['', Validators.required]:this.driverUpdated,
      chauffeur: ['', Validators.required],

  });

  this.retrieveDrivers();
  }

  retrieveDrivers() {
    this.driverService.getAlDrivers().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.driversList = data;
      console.log(this.driversList) 
  
    });
  }



















  getDate(date){
    return moment(date).format('Do MMMM YYYY')
  }
}
