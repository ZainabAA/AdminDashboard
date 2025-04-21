import { Component, effect, ViewChild } from '@angular/core';
import { UsersService } from '../../services/users/users.service';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { User } from '../../../data/users';
import { SelectionModel } from '@angular/cdk/collections';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatCheckboxModule,
    FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  users = this.usersService.usersList();
  displayedColumns: string[] = ['name', 'email', 'role', 'status'];
  dataSource = new MatTableDataSource<User>(this.users);
  clickedRow: User | null = null;
  
  nameInput = new FormControl(this.clickedRow?.name);
  emailInput = new FormControl(this.clickedRow?.email);
  roleInput = new FormControl(this.clickedRow?.role);
  // emailInput = new FormControl('');

  initialSelection = [];
  allowMultiSelect = false;
  selection = new SelectionModel<User>(this.allowMultiSelect, this.initialSelection);

  usersEffect = effect(() => {
    this.users = this.usersService.usersList();
  })

  editClickedRow(row: User){
    this.clickedRow = row;
    this.nameInput.setValue(this.clickedRow?.name);
    this.emailInput.setValue(this.clickedRow?.email);
    this.roleInput.setValue(this.clickedRow?.role);
  }

  constructor(private usersService: UsersService){
    console.log("users: ", this.users)
  }
}
