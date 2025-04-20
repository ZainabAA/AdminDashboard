import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from '../../services/login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  user = this._loginService.user;

  userEffect = () => {
    console.log("user: ", this.user())
    this.user = this._loginService.user
    if(this.user())
      this.router.navigate(['/home']);
  }
  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  })

  constructor(private _loginService: LoginService, private router : Router) {
    console.log("user: ", this.user())
    if(this.user())
      this.router.navigate(['/home']);
  }

  onFormSubmit(){
    this._loginService.login( "AliceJ", "");
  }
}
