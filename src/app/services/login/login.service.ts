import { Injectable, signal } from '@angular/core';
import { User } from '../../../data/users';
import { USER_LOGIN } from '../../../data/userLogin';
import { Observable } from 'rxjs';
import { UsersService } from '../users/users.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  user = signal<User | null>(null);

  login(username: string, password: string){
    let usernameMatch = USER_LOGIN.filter(usr => usr.userName === username)
    if(!usernameMatch){
      return "Incorrect username"
    }
    else{
      if(usernameMatch[0].password != password)
        return "Incorrect password"
      else{
        let loggedInUser = this.userService.usersList().filter(usr => usr.id === usernameMatch[0].userId)
        if(loggedInUser)
          this.user.set(loggedInUser[0]);
        else
        return "Cannot find user"
      }
    }
    return "Logged in";
  }

  logout(){
    this.user.set(null);
  }
  constructor(private userService: UsersService) { }
}
