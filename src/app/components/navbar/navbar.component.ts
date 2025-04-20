import { Component } from '@angular/core';
import { LoginService } from '../../services/login/login.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isActive: boolean = false;
  userSignal = this.loginService.user;

  userEffect = () => {
    this.userSignal = this.loginService.user;
    console.log("user: ", this.userSignal)
  }

  constructor(private loginService: LoginService){
    console.log("user: ", this.userSignal);
  }
}
