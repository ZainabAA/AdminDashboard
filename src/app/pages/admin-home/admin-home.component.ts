import { Component, effect } from '@angular/core';
import { LoginService } from '../../services/login/login.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-admin-home',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.css'
})
export class AdminHomeComponent {
  userSignal = this._loginService.user;

  userEffect = effect(() => {
    this.userSignal = this._loginService.user;
  })

  constructor(private _loginService: LoginService){
    _loginService.login( "AliceJ", "");
  }

  
}
