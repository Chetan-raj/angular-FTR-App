import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from 'node_modules/@angular/forms';
import { RegisterService } from './register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  coachregisterForm!: FormGroup;
  formDisplay: boolean = true;
  successMessage="";
  errorMessage: string =  "Error occured while trying to register";
  newArr=[3,4,5];
  
    constructor(private formBuilder: FormBuilder, private registerService: RegisterService) { }
  
    ngOnInit() {
      this.coachregisterForm =  this.formBuilder.group({
        firstName: ['', [Validators.required, Validators.maxLength(20)]],
        lastName: ['', [Validators.required,Validators.maxLength(20)]],
        emailId: ['', [Validators.required,Validators.email]],
        mobileNumber: ['',[Validators.required, Validators.minLength(10), 
          Validators.maxLength(10)]],
        password: ['', [Validators.required,Validators.minLength(7), 
        Validators.maxLength(15), Validators.pattern("[A-z0-9]*[!@#$%^&*()_+:;><]+[A-z0-9]*")]],
        nationality: ['',[Validators.required, Validators.maxLength(20)]],
        passportNumber: ['',[Validators.required, Validators.minLength(7), 
          Validators.maxLength(12)]],
        permanentAddress: ['',[Validators.required, Validators.maxLength(200)]],
        officeAddress: ['',[Validators.required, Validators.maxLength(200)]],
        personalIdentificationNumber: ['',[Validators.required, Validators.minLength(12), 
          Validators.maxLength(12)]]
      })
    }

    coachregister(){
      let userData = {"emailId": this.coachregisterForm.controls['emailId'].value,
      "firstName": this.coachregisterForm.controls['firstName'].value,
      "lastName": this.coachregisterForm.controls['lastName'].value,
      "mobileNumber": this.coachregisterForm.controls['mobileNumber'].value,
      "nationality": this.coachregisterForm.controls['nationality'].value,
      "officeAddress": this.coachregisterForm.controls['officeAddress'].value,
      "passportNumber": this.coachregisterForm.controls['passportNumber'].value,
      "password": this.coachregisterForm.controls['password'].value,
      "permanentAddress": this.coachregisterForm.controls['permanentAddress'].value,
      "personalIdentificationNumber": this.coachregisterForm.controls['personalIdentificationNumber'].value}

      this.registerService.register(userData).subscribe(data=>{
        console.log(data)
        this.successMessage = "User registered successfully with ID "+ data.userId;
        this.formDisplay=false;
        this.coachregisterForm.reset();
      },
      error=>{
        console.error(this.errorMessage)
      })
      }
}
