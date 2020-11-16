import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from "./login/login.component";
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { SignupComponent } from "./signup/signup.component";
import { TaskViewComponent } from "./task-view/task-view.component";
import { NewTaskComponent } from "./new-task/new-task.component";
import { EmployeeTaskComponent } from "./employee-task/employee-task.component";
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalContent } from './modal-popup/modal.component';


const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  { path: "signup", component: SignupComponent },
  { path: "tasks", component: TaskViewComponent },
  { path: "new-task", component: NewTaskComponent },
  { path: "employee-task", component: EmployeeTaskComponent },
];

@NgModule({
  declarations: [
    LoginComponent,SignupComponent,TaskViewComponent,NewTaskComponent,EmployeeTaskComponent,
    ModalContent
  ],
  imports: [RouterModule.forRoot(routes),BrowserModule,NgbModule,FormsModule,HttpClientModule,NgMultiSelectDropDownModule],
  entryComponents:[ModalContent],
  exports: [RouterModule]
})
export class AppRoutingModule { }
