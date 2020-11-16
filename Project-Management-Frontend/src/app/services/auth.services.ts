import { Injectable } from "@angular/core";
import { HttpService } from "./http.service";
import { Router } from "@angular/router";
import {  catchError, tap } from "rxjs/operators";
import { Observable,throwError } from "rxjs";
import { HttpResponse, HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(
    private httpService: HttpService
  ) {}

  login(name: string, password: string) {
    return this.httpService.login(name, password).pipe(
      tap((res: HttpResponse<any>) => res),
      catchError((err) => {
        return throwError(err);
      })
    );
  }

  signup(name: string, password: string, role:string):Observable<any> {
    return this.httpService.signup(name, password, role).pipe(
      tap((res: HttpResponse<any>) => res),
      catchError((err) => {
        return throwError(err);
      })
    );
  }

}
