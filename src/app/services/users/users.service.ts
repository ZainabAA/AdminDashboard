import { Injectable, signal } from '@angular/core';
import { User, USERS } from '../../../data/users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  usersList = signal(USERS);

  addUser(user: User){
    this.usersList.update(current => [...current, user]);
  }

  deleteProduct(id: number){
    this.usersList.update(current => [...current.filter(user => user.id === id)])
  }

  updateProduct(user: User){
    
    this.usersList.update(current => {
      return current.map(usr => {
        if(usr.id === user.id)
          return user
        return usr
      })
    })
  }

  constructor() { }
}
