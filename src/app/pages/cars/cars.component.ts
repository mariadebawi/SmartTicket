import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarsService } from './services/cars.service';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import Car from './model/car';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss']
})
export class CarsComponent implements OnInit {
  closeResult = '';
  url;
  carsList : Car[];
  selecetdFile: File;
  imagePreview: string;
  voitureForm: FormGroup;
  submitted = false;
  car: Car = new Car();
  carUpdated: Car;

  constructor(private modalService: NgbModal , private formBuilder: FormBuilder , private carsService : CarsService) { }

  ngOnInit(): void {
    this.voitureForm = this.formBuilder.group({
      matricule: ['', Validators.required],
      marque: ['', Validators.required],
      status: ['', Validators.required]?['', Validators.required]:this.carUpdated,
      chauffeur: ['', Validators.required],

  });

  this.retrieveCars();
  }

  open(content , car?:Car) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

    this.carUpdated= car ;
  }

  private getDismissReason(reason: any): string {
    this.onReset();
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


  onChange(deviceValue) {
    console.log(deviceValue);
}

retrieveCars() {
  this.carsService.getAllCars().snapshotChanges().pipe(
    map(changes =>
      changes.map(c =>
        ({ key: c.payload.key, ...c.payload.val() })
      )
    )
  ).subscribe(data => {
    this.carsList = data;
    console.log(this.carsList) 

  });
}
  onSelectFile(event) {
    this.selecetdFile = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.url = reader.result;
    };
    reader.readAsDataURL(this.selecetdFile);
  }

    // convenience getter for easy access to form fields
    get f() { return this.voitureForm.controls; }



    onSubmit() {
        this.submitted = true;
        if (this.voitureForm.invalid) {
            return;
        }
        
        this.car = ({
        marque: this.voitureForm.value.marque,
        matricule: this.voitureForm.value.matricule,
        status: this.voitureForm.value.status,
        chauffeur: this.voitureForm.value.chauffeur,
        deleted : false,
        image:this.url?this.url:'',
        createdAt : Date.now(),
        updatedAt:Date.now()
        })

        this.carsService.createCar(this.car).then(() => {
          console.log('Created new item successfully!');
          this.submitted = true;
        });
    }

    onReset() {
        this.submitted = false;
        this.voitureForm.reset();
    }


    getDate(date){
      return moment(date).format('Do MMMM YYYY')
    }

    supprimerCar(car){
        this.carsService.deleteCar(car.key)
          .then(() => {
           // this.refreshList.emit();
           console.log('The tutorial was updated successfully!');
          })
          .catch(err => console.log(err));
      
    }

    onSubmitUpdated(){
      this.submitted = true;
      if (this.voitureForm.invalid) {
          return;
      }
      
      this.car = ({
      marque: this.voitureForm.value.marque,
      matricule: this.voitureForm.value.matricule,
      status: this.voitureForm.value.status?this.voitureForm.value.status:this.carUpdated.status,
      chauffeur: this.voitureForm.value.chauffeur,
      deleted : false,
      image:this.url?this.url:'',
      //createdAt : Date.now(),
      updatedAt:Date.now()
      })

      this.carsService.updateCar(this.carUpdated.key , this.car).then(() => {
        console.log('Created new item successfully!');
        this.submitted = true;
      });
    }

}
