import { Component, effect } from '@angular/core';
import { LoginService } from '../../services/login/login.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

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
