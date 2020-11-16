import { Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
    providedIn: "root"
  })
  
  export class SharedService{
  constructor(){}
  private user = new BehaviorSubject<object>(null);
  Userdata = this.user.asObservable();
  
  UserDetails(newUser){
    this.user.next(newUser); 
  }
}