import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { TaskService } from "../services/tasks.service";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { SharedService } from "../services/shared.service";


@Component({
  selector: "app-new-task",
  templateUrl: "./new-task.component.html",
  styleUrls: ["./new-task.component.scss"],
})
export class NewTaskComponent implements OnInit {
  taskId: string = '';
  edit: boolean;
  time = new Date();
  dropdownSettings: any = {};
  employees_list: Array<any> = [];
  selectedItems: Array<any> = [];
  minDate = new Date().toISOString().split('T')[0];
  userData = {
    title: '',
    description: '',
    dueDate: '',
    employees: [],
    managerId: ''
  };
  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private SharedService: SharedService,
    private router: Router
  ) { }

  ngOnInit() {
    this.SharedService.Userdata.subscribe((res: any) => {
      this.userData.managerId = res._id
    });
    this.taskService.getEmployees().subscribe((res: any) => {
      this.employees_list = res.message;
    })
    this.route.params.subscribe((params: Params) => {
      if (Object.keys(params).length > 0) {
        this.taskId = params.taskId;
        this.edit = params.edit;
        this.taskService.getTaskDetails(params.taskId).subscribe((res: any) => {
          res.message.dueDate = res.message.dueDate.split('.')[0];
          let emp = this.employees_list.find(element => element._id == res.message.employee_id);
          this.userData = res.message;
          this.userData.employees = [emp];
        })
      }
    });

    this.dropdownSettings = {
      singleSelection: false,
      defaultOpen: false,
      idField: "_id",
      textField: "userName",
      selectAllText: "Select All",
      unSelectAllText: "UnSelect All",
      itemsShowLimit: 6
    };


  }


  getState() {
    let url: any = this.router.url;
    url = url.split("edit=");
    if (url[0] == "/new-task") {
      return false
    } else if (url[1] == "true") {
      return false
    } else if (url[1] == "false") {
      return true
    }

  }

  showbtn() {
    let url: any = this.router.url;
    url = url.split("edit=");
    if (url[1] == "true") {
      return true
    }
    return false

  }

  createTask(form, userData) {
    this.taskService.createTask(userData).subscribe((newTask) => {
      this.router.navigate(["../tasks"], { relativeTo: this.route });
    });
  }

  SaveTask(form, userData) {
    this.taskService.UpdateTask(userData, this.taskId).subscribe((newTask) => {
      this.router.navigate(["../tasks"], { relativeTo: this.route });
    });
  }


}
