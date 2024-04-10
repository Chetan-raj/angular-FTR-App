import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminLoginService } from './admin-login.service';
import { AdminLogin } from './AdminLogin';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  login = new AdminLogin();
  users: AdminLogin[] = [];

  errorMsg!: string;
  loginForm!: FormGroup;
  errorif!: boolean;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: AdminLoginService
  ) {}

  onSubmit(): void {
    
    this.login = this.loginForm.getRawValue();
        const name = this.login.adminName;
        this.loginService.adminName = this.login.adminName;
        console.log("login service aname: ", this.loginService.adminName);
        console.log(this.users);

        const password = this.login.password;
       // console.log("login service pass: ", this.loginService.password)
        const user = this.users.filter(currUser => currUser.adminName === name && currUser.password === password)[0];
        if (user) {
            this.router.navigate(['/admin']);
        } else {
          this.errorif=true;
          this.errorMsg = "Invalid user ID/password";
        }
  }

  ngOnInit(): void {

    this.loginService.adminlogin()
            .subscribe((users: AdminLogin[]) => this.users = users);
    this.loginForm = this.formBuilder.group({
      adminName: ["", [Validators.required]],
      password: ["", [Validators.required]],
    });
  }

}
