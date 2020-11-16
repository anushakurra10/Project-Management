import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { TaskService } from "../services/tasks.service";
import { SharedService } from "../services/shared.service";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalContent } from '../modal-popup/modal.component';

@Component({
  selector: "app-employee-task",
  templateUrl: "./employee-task.component.html",
  styleUrls: ["./employee-task.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class EmployeeTaskComponent implements OnInit {
  emp_tasks: Array<any> = [];
  statuses: Array<any> = [0, 15, 30, 45, 60, 75, 100];
  userData = {
    title: '',
    description: '',
    dueDate: '',
    employees: [],
    empId: '',
    notes: ''
  };
  name: string;

  constructor(
    private taskService: TaskService,
    private SharedService: SharedService,
    private modalService: NgbModal,
  ) { }

  ngOnInit() {
    this.SharedService.Userdata.subscribe((res: any) => {
      this.userData.empId = res._id;
      this.name = res.userName;
    });

    this.taskService.getemployeesTasks(this.userData.empId).subscribe((res: any) => {
      this.emp_tasks = res.message
    });


  }
  save() {
    this.taskService.UpdateEmployeeTask(this.emp_tasks, this.userData.empId).subscribe((newTask) => {
      const modalRef = this.modalService.open(ModalContent);
      modalRef.componentInstance.message = "Saved Successfully";
    });
  }

  calcDue(task) {
    if (new Date(task.dueDate) < new Date() && task.status < 100) {
      return true;
    }
    return false;
  }


}
