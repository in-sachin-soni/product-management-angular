import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Login } from '../models/auth';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HeaderComponent, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  constructor(private authService:AuthService, private router:Router) {}
  
  onLogin(){
    if(this.loginForm.valid){
      const newLogin:Login = {
        username: this.loginForm.value.username || "",
        password: this.loginForm.value.password || "",
      };
      this.authService.onLogin(newLogin).subscribe(result=> {
        if(result){
          this.router.navigate(['home']);
        }
      });
    }
  }
}
