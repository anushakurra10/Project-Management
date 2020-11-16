import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { TaskService } from "../services/tasks.service";
import { SharedService } from "../services/shared.service";


@Component({
  selector: "app-task-view",
  templateUrl: "./task-view.component.html",
  styleUrls: ["./task-view.component.scss"],
  encapsulation: ViewEncapsulation.None

})
export class TaskViewComponent implements OnInit {
  tasks_list: Array<any> = [];
  selectedListId: string;
  name: string;

  constructor(
    private taskService: TaskService,
    private SharedService: SharedService
  ) { }

  ngOnInit() {

    this.getTasks();
  }

  getTasks() {
    this.SharedService.Userdata.subscribe((res: any) => {
      let id = res._id;
      this.name = res.userName;
      this.taskService.getTasks(id).subscribe((result: any) => {
        this.tasks_list = result.message;
      });
    });
  }

  calcDue(task) {
    if (new Date(task.dueDate) < new Date() && task.status < 100) {
      return true;
    }
    return false;
  }
}
