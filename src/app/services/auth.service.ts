import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Login, LoginResponse } from '../models/auth';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private tokenService:TokenService, private http:HttpClient) { }

  onLogin(loginData: Login):Observable<LoginResponse>{
    return this.http.post<LoginResponse>("https://dummyjson.com/auth/login",loginData)
    .pipe(map(response => {
      if(response && response.token){
        this.tokenService.setToken(response.token);
      }
      return response;
    }));
  }

  onLogout(){
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Authorization': `Bearer ${this.tokenService.getToken()}`
    });
    return this.http.get("https://dummyjson.com/auth/logout", {headers})
    .pipe(map(response=>{
      if(response){
        this.tokenService.removeToken();
      }
      return response;
    }));
  }
}
