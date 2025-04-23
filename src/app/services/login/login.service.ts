import { effect, Injectable, signal } from '@angular/core';
import { User } from '../../../data/users';
import { USER_LOGIN } from '../../../data/userLogin';
import { Observable } from 'rxjs';
import { UsersService } from '../users/users.service';
import { ToastService } from '../toast/toast.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  user = signal<User | null>(null);

  tokenSignal = signal(this.getStoredToken());
  
  signalEffect = effect(() => {
    sessionStorage.setItem('token', this.tokenSignal());
    let usernameMatch = USER_LOGIN.filter(usr => usr.userName === this.tokenSignal())
    this.user.set(this.userService.usersList().filter(usr => usr.id === usernameMatch[0]?.userId)[0])
    console.log("user changes");
  }, { allowSignalWrites: true });

  getStoredToken() {
    return sessionStorage.getItem('token') ?? '';
  }

  login(username: string, password: string){
    let usernameMatch = USER_LOGIN.filter(usr => usr.userName === username)
    if(usernameMatch.length == 0){
      this.toastService.add("Incorrect username", "error")
    }
    else{
      if(usernameMatch[0].password != password)
        this.toastService.add("Incorrect password", "error")
      else{
        let loggedInUser = this.userService.usersList().filter(usr => usr.id === usernameMatch[0].userId)
        if(loggedInUser){
          // this.user.set(loggedInUser[0]);
          this.tokenSignal.set(username);
          sessionStorage.setItem('token', this.tokenSignal());
          this.user.set(loggedInUser[0]);
          this.toastService.add("Logged in", "success");
        }
        else
          this.toastService.add("Cannot find user", "error")
      }
    }
  }

  logout(){
    this.user.set(null);
  }
  constructor(private userService: UsersService, private toastService: ToastService) { }
}
