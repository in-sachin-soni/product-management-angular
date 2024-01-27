import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  _isAuthenticated;
  constructor(private tokenService:TokenService, private router:Router){
    this._isAuthenticated = this.tokenService.isAuthenticated.value;
  }

  onLogout(){
    this.tokenService.removeToken();
    this.router.navigate(['']);
  }
}
