import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserLoginService } from './user-login.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {


  userUpdateForm!: FormGroup;
  userworkitem!: boolean;
  userviewprofile!: boolean;
  user_id!: number;
  errorMessage!: string;
  userDetails!: UserProfile;
  updateUserProfile!: boolean;
  submitted!:boolean;
  isErrorDisplay!:boolean;

  constructor(private userHomeService: UserLoginService, private router: Router, private formBuilder: FormBuilder) {
    this.router.events.subscribe((val) => {
      this.userworkitem = false;
      this.userviewprofile = false;

      if (this.router.url == "/userhome") {
        this.router.navigate(["/userworkitem"])
      }
      if (this.router.url == "/userworkitem") {
        this.userworkitem = true;
        this.userviewprofile = false;
      }
      if (this.router.url == "/userviewprofile") {
        this.userworkitem = false;
        this.userviewprofile = true;
      }
    })
  }

  ngOnInit(): void {
    this.user_id = Number.parseInt(localStorage.getItem('userId') || '');
    this.viewDetails();
    this.userUpdateForm = this.formBuilder.group({
      mobileNumber: ['', [Validators.required, Validators.pattern("[0-9]{10}")]],
      pAddress: ['', [Validators.required, Validators.maxLength(200)]],
      oAddress: ['', [Validators.required, Validators.maxLength(200)]]
    });
  }

  viewDetails() {
    this.userHomeService.getProfileByUserId().subscribe(
      (response: UserProfile) => {
        this.userDetails = response;
        console.log(this.userDetails);
      },
      (error: any) => this.errorMessage = <any>error);
    this.userviewprofile = true;
    this.updateUserProfile=false;
  }

  updateProfile(mobile: any, pAddress: any, oAddress: any) {    
    this.userHomeService.updateProfileByUserId({'mobileNumber':mobile, 'permanentAddress':pAddress, 'officeAddress': oAddress}).subscribe(
      (response) => {
        console.log("response----" + response);
      },
      (error) => this.errorMessage = <any>error);
      this.viewDetails();
      alert("User details are updated successfully for UserId:"+localStorage.getItem('userId'));
      this.userviewprofile = true;    
      this.updateUserProfile=false;
      this.userUpdateForm.reset();
  }



  deleteProfile() {
    if (confirm("Are you sure you want to delete your profile?")) {
      if (confirm("Once your profile is deleted you will be Logged out. Are you sure?")) {
        this.userHomeService.deleteProfileByUserId().subscribe(
          (          response: string) => {
            console.log("this.userDetails -- Response--" + response);
          }, (error) => this.errorMessage = <any>error);
        let id: any = localStorage.getItem('userId');
        alert("User removed successfully with UserId:" + id);
        localStorage.removeItem('userId');
        this.router.navigate(['/home']);
      }
    }
  }

  backToProfile() {
    this.updateUserProfile = false;
  }
}


interface UserProfile {
  userId: number;
  firstName: string;
  lastName: string;
  emailId: string;
  mobileNumber: number;
  password: string;
  nationality: string;
  passportNumber: string;
  permanentAddress: string;
  officeAddress: string;
  personalIdentificationNumber: number;
}


