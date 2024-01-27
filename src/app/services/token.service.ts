import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  isAuthenticated:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor() { 
    const token = this.getToken();
    if(token){
      this.updateStatus(true);
    }
  }

  updateStatus(status:boolean){
    this.isAuthenticated.next(status);
  }

  setToken(token:string){
    localStorage.setItem("auth-token",token);
    this.updateStatus(true);
  }

  getToken():string | null {
    return localStorage.getItem("auth-token");
  }

  removeToken(){
    localStorage.removeItem("auth-token");
    this.updateStatus(false);
  }
}
