import { Component, OnInit } from "@angular/core";
import { AuthService } from "../services/auth.services";
import { SharedService } from "../services/shared.service";
import { HttpResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalContent } from '../modal-popup/modal.component';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {  message:string;
  userData = {
    username: '',
    pwd:'',
  };
  submitted = false;
 constructor(private authService: AuthService, private router: Router,
  private modalService: NgbModal,
  private SharedService:SharedService) {}
  ngOnInit() {}
  
onSubmit(form,formData) {
  
  this.authService.login(formData.username, formData.pwd).subscribe(
        (res: HttpResponse<any>) => {
        if (res.status === 200) {
         if(res.body.message.role == "Manager"){
           this.SharedService.UserDetails(res.body.message);
          this.router.navigate(["/tasks"]);
         }else{
          this.SharedService.UserDetails(res.body.message);
          this.router.navigate(["/employee-task"]);
         }
        }
      },
      error => {
        const modalRef = this.modalService.open(ModalContent);
        modalRef.componentInstance.message = error.error.message;
      }
      )
  }

}
