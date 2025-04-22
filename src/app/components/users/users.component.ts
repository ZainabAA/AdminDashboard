import { Component, effect, ViewChild } from '@angular/core';
import { UsersService } from '../../services/users/users.service';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { User } from '../../../data/users';
import { SelectionModel } from '@angular/cdk/collections';
import {FormControl} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import { MatSelectChange } from '@angular/material/select';
import { FormComponent } from "../form/form.component";


@Component({
  selector: 'app-users',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule,
    MatButtonModule, MatSelectModule, FormComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  users = this.usersService.usersList();
  displayedColumns: string[] = ['name', 'email', 'role', 'status', 'delete'];
  dataSource = new MatTableDataSource<User>(this.users);
  clickedRow: User | null = null;
  statusOpt = ['active', 'inactive', 'banned']
  
  nameInput = new FormControl<string>(this.clickedRow?.name ?? '');
  emailInput = new FormControl<string>(this.clickedRow?.email ?? '');
  roleInput = new FormControl(this.clickedRow?.role);

  
  usersEffect = effect(() => {
    console.log(this.usersService.usersList());
    this.users = this.usersService.usersList();
    this.dataSource = new MatTableDataSource<User>(this.users);
  })

  onRoleSelected(event: MatSelectChange){
    if(this.clickedRow){
      this.clickedRow.status = event.value ?? this.clickedRow.status
      this.usersService.updateUser(this.clickedRow);
    }
  }

  onInputChange<K extends keyof User>(param: K, value: User[K]){
    if(this.clickedRow && param in this.clickedRow){
      this.clickedRow[param] = value ?? this.clickedRow[param]
      this.usersService.updateUser(this.clickedRow);
    }
  }
  editClickedRow(row: User){
    this.clickedRow = row;
    this.nameInput.setValue(this.clickedRow?.name);
    this.emailInput.setValue(this.clickedRow?.email);
    this.roleInput.setValue(this.clickedRow?.role);
  }

  deleteUser(){
    if(this.clickedRow)
      this.usersService.deleteUser(this.clickedRow);
  }

  addUser() {
    const newUser: User = {
      id: this.users.length+1,
      name: '',
      email: '',
      role: 'customer',
      status: 'inactive',
      createdAt: new Date(),
      lastLogin: null,
      isEmailVerified: false,
      avatarUrl: ''
    };
    // Set the new row as the clickedRow to enable inline editing
    this.editClickedRow(newUser);
    this.usersService.addUser(newUser);
  
    // Add the new row to the beginning of the data array
    this.dataSource.data = [newUser, ...this.dataSource.data];
  
  }

  constructor(private usersService: UsersService){
  }
}
