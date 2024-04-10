import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Vehicle } from './Vehicle';
import { VehicleService } from './vehicle.service';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent implements OnInit {

  nameif: boolean=false;
  insertif: boolean= false;
  numif: boolean= false;
  deleteif: boolean= false;
  showTable: boolean= false;
  showTable1: boolean= false;
  vehicles!: Vehicle[];
  vehicle!: Vehicle;
  message!:string;
  message1!:string;
  errorMsg!: string;
  insertForm!: FormGroup;
  nameForm!: FormGroup;
  numForm!: FormGroup;
  deleteForm!: FormGroup;
  errorif!: boolean;
  success!: boolean;
  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private vehicleService: VehicleService
  ) { }
  reset(): void {
    this.nameif=false;
    this.insertif = false;
    this.numif = false;
    this.deleteif= false;
    this.showTable= false;
    this.showTable1= false;
    this.errorif=false;
    this.success=false;
  }
  clickInsert(): void {
    this.reset();
    this.insertif = !this.insertif;
  }
  clickAll(): void {
    this.reset();
    this.vehicleService.getVehicles().subscribe(
      (data) => {
        this.vehicles = data;
        this.showTable = !this.showTable;
      },
      (error) => {
          this.message1 = "No vehicles found";
      }
    )
  }
  clickName(): void {
    this.reset();
    this.nameif = !this.nameif;
    this.success = false;
    this.errorif = false;
  }
  clickNumber(): void {
    this.reset();
    this.numif = !this.numif;
  }
  clickDelete(): void {
    this.reset();
    this.deleteif = !this.deleteif;
  }
  login(): void {
   // console.log(this.insertForm.value);
   this.vehicleService.insert(this.insertForm.value).subscribe(
     (data) => {
      this.message = "Inserted Successfully";
      this.success=true;
     },
     (error) => {
       this.errorif=true;
       this.message="Insertion Failed";
     }
   )
  }
  getByName() {
    this.vehicleService.getByName(this.nameForm.value).subscribe(
      (data) => {
        this.vehicles = data;
        this.showTable = !this.showTable;
      },
      (error) => {
        this.message1 = "No vehicles found";
    }
    );
  }
  getByNum() {
    this.vehicleService.getByNum(this.numForm.value).subscribe(
      (data) => {
        this.vehicle = data;
        console.log(this.vehicle);
        this.showTable1 = !this.showTable1;
      },
      (data) => {
        this.vehicle = data;
        console.log(this.vehicle);
        this.showTable1 = !this.showTable1;
      },
    );
  }
  delete() {
    this.vehicleService.delete(this.deleteForm.value).subscribe(
      (data) => {
        this.success=true;
        this.message = data;
      },
      (error) => {
        this.errorif=true;
        this.message="Delete Failed";
      }
    );
  }

  ngOnInit(): void {
    this.insertForm = this.formBuilder.group({
      vehicleNumber: ["", [Validators.required, Validators.pattern("[a-zA-Z]{2}[0-9]{4}")]],
      vehicleName: ["", [Validators.required]],
      maxLiftingCapacity: ["", [Validators.required, Validators.pattern("([0-9]+.?)+")]],
      retireDate: ["", [Validators.required]],
      vehicleStatus: ["", [Validators.required]],
      harborLocation: ["", [Validators.required]],
      country: ["", [Validators.required]],
    });

    this.nameForm = this.formBuilder.group({
      vehicleName: ["", [Validators.required]]
    });

    this.numForm = this.formBuilder.group({
      vehicleNumber: ["", [Validators.required, Validators.pattern("[a-zA-Z]{2}[0-9]{4}")]]
    });
    this.deleteForm= this.formBuilder.group({
      vehicleNumber: ["", [Validators.required, Validators.pattern("[a-zA-Z]{2}[0-9]{4}")]]
    });
  }

}
