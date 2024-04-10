import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { TerminalComponent } from './terminal/terminal.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { VehicleComponent } from './vehicle/vehicle.component';
import { WorkitemComponent } from './workitem/workitem.component';

const appRoutes: Routes = [
  { path: "admin-login", component: AdminLoginComponent},
  { path: "user-login", component: UserLoginComponent},
  { path: "register", component: RegisterComponent},
  { path: "home", component: HomeComponent },
  { path: "user", component: UserHomeComponent },
  { path: "admin", component: AdminComponent },
  { path: "vehicle", component: VehicleComponent },
  {path:"terminal" , component:TerminalComponent},
  {path:"workitem" , component:WorkitemComponent},
  { path: "**", redirectTo: "/home", pathMatch: "full" },
];
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
