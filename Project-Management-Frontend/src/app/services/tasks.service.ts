import { Injectable } from "@angular/core";
import { HttpService } from "./http.service";

@Injectable({
  providedIn: "root"
})
export class TaskService {
  constructor(private httpService: HttpService,
  ) { }
  getEmployees() {
    return this.httpService.get("api/getEmployees");
  }
  createTask(userdata: any) {
    return this.httpService.post(`api/tasks/create`, { userdata });
  }
  getemployeesTasks(taskId: string) {
    return this.httpService.get(`api/EmployeeTask/${taskId}`);
  }
  UpdateEmployeeTask(userdata: any, empId: string) {
    return this.httpService.patch(`api/UpdateEmployeeTask/${empId}`, { userdata });
  }

  getTasks(ManagerID: string) {
    return this.httpService.get(`api/tasks/${ManagerID}`);
  }
  getTaskDetails(taskId: string) {
    return this.httpService.get(`api/taskDetails/${taskId}`);
  }

  UpdateTask(userdata: any, taskId: string) {
    return this.httpService.patch(`api/tasks/${taskId}`, { userdata });
  }


}
