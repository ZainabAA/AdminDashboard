import { Component, effect } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from '../../services/login/login.service';
import { Router } from '@angular/router';
import { ToastService } from '../../services/toast/toast.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  user = this._loginService.user();
  loginStatus = '';

  userEffect = effect(() => {
    console.log("user: ", this.user)
    this.user = this._loginService.user()
    if(this.user){
      console.log("user update: ", this.user)
      this.router.navigate(['/admin']);
    }
  });

  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  })

  constructor(private _loginService: LoginService, private router : Router, 
      private toastService: ToastService) {
    console.log("user: ", this.user)
    if(this.user)
      this.router.navigate(['/admin']);
  }

  onFormSubmit(){
    this._loginService.login(this.loginForm.get('username')?.value ?? "", 
      this.loginForm.get('password')?.value ?? "");
    console.log("user: ", this.user)
  }
}
