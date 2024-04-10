import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserLoginService } from './user-login.service';


@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  message: string = "Logged in successfully.";
  submit!: boolean;
  errorMsg!: string;
  loginForm!: FormGroup;
  errorif!: boolean;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: UserLoginService
  ) {}

  login(): void {
    // console.log(this.loginForm.value);
    // let resp= this.loginService.login(this.loginForm.value);
    // resp.subscribe((data)=>this.message=data);

    this.submit = true;
    this.loginService.login(this.loginForm.value).subscribe(
      (data) => {
        if (data==this.message) {
          this.errorif=false;
          //localStorage.setItem('userId', username);
          this.router.navigate(["/user"]);
        }
      },
      (error) => {
        this.errorif=true;
        console.log(error.status);
        this.errorMsg = "Invalid user ID/password";
        this.submit = false;
      }
    );
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      userId: ["", [Validators.required, Validators.pattern("[0-9]+")]],
      password: ["", [Validators.required]],
    });
  }

}
