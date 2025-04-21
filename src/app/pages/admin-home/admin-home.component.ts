import { Component, effect } from '@angular/core';
import { LoginService } from '../../services/login/login.service';
import { DatePipe } from '@angular/common';
import { NavbarComponent } from "../../components/navbar/navbar.component";

@Component({
  selector: 'app-admin-home',
  standalone: true,
  imports: [DatePipe, NavbarComponent],
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.css'
})
export class AdminHomeComponent {
  userSignal = this._loginService.user();

  userEffect = effect(() => {
    console.log("user: ", this.userSignal)
    this.userSignal = this._loginService.user();
  })

  constructor(private _loginService: LoginService){
    console.log("user: ", this.userSignal)
    this.userSignal = this._loginService.user();
  }

  
}
