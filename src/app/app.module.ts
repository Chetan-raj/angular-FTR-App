import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { HttpClientModule } from '@angular/common/http';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminComponent } from './admin/admin.component';
import { AdminLoginService } from './admin-login/admin-login.service';
import { VehicleComponent } from './vehicle/vehicle.component';
import { VehicleService } from './vehicle/vehicle.service';
import { UserHomeComponent } from './user-home/user-home.component';
import { UserLoginService } from './user-home/user-login.service';
import { TerminalComponent } from './terminal/terminal.component';
import { TerminalService } from './terminal/terminal.service';
import { WorkitemComponent } from './workitem/workitem.component';
import { WorkitemService } from './workitem/workitem.service';
import { UserLoginComponent } from './user-login/user-login.component';
import { RegisterComponent } from './register/register.component';
import { RegisterService } from './register/register.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdminLoginComponent,
    AdminComponent,
    RegisterComponent,
    VehicleComponent,
    UserHomeComponent,
    UserLoginComponent,
    TerminalComponent,
    WorkitemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [UserLoginService,AdminLoginService,VehicleService,TerminalService,RegisterService,WorkitemService],
  bootstrap: [AppComponent]
})
export class AppModule { }
