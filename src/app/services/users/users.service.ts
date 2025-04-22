import { Injectable, signal } from '@angular/core';
import { User, USERS } from '../../../data/users';
import { ToastService } from '../toast/toast.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  usersList = signal(USERS);

  addUser(user: User){
    this.usersList.update(current => [...current, user]);
    this.toastService.add("user added", "success");
  }

  deleteUser(user: User){
    this.usersList.update(current => current.filter(users => users != user));
    this.toastService.add("user deleted", "success");
  }

  updateUser(user: User){
    
    this.usersList.update(current => {
      return current.map(usr => {
        if(usr.id === user.id)
          return user
        return usr
      })
    })
    this.toastService.add("user updated", "success");
  }

  constructor(private toastService: ToastService) { }
}
