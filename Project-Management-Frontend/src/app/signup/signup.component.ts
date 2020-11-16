import { Component, OnInit } from "@angular/core";
import { HttpResponse } from "@angular/common/http";
import { AuthService } from "../services/auth.services";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalContent } from '../modal-popup/modal.component';

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"]
})
export class SignupComponent implements OnInit {
  roles = ['Manager', 'Employee'];
  userData = {
    username: '',
    pwd: '',
    role: ''
  };
  submitted = false;
  constructor(private authService: AuthService,
    private modalService: NgbModal) { }

  ngOnInit() {

  }

  onSignupButtonClick(formData, userData) {
    const modalRef = this.modalService.open(ModalContent);
    this.authService
      .signup(userData.username, userData.pwd, userData.role)
      .subscribe(
        (res: HttpResponse<any>) => {
          modalRef.componentInstance.message = res.body.message;
        },
        error => {
          modalRef.componentInstance.message = error.error.message;
        });

  }
}
