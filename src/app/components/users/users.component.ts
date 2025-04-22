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
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { MatSelectChange } from '@angular/material/select';


@Component({
  selector: 'app-users',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatCheckboxModule,
    FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule,
    MatButtonModule, MatSelectModule
  ],
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
  nameSub = new Subject<string>();
  // emailInput = new FormControl('');

  initialSelection = [];
  allowMultiSelect = false;
  selection = new SelectionModel<User>(this.allowMultiSelect, this.initialSelection);

  ngOnInit() {
    this.nameInput.valueChanges.pipe(
      debounceTime(3000),
      distinctUntilChanged()
    ).subscribe(value => {
      // Call your function here, e.g., performSearch(searchTerm)
      if(this.clickedRow){
        this.clickedRow.name = value ?? this.clickedRow.name
        this.usersService.updateUser(this.clickedRow);
      }
    });

    this.emailInput.valueChanges.pipe(
      debounceTime(3000),
      distinctUntilChanged()
    ).subscribe(value => {
      // Call your function here, e.g., performSearch(searchTerm)
      if(this.clickedRow){
        this.clickedRow.email = value ?? this.clickedRow.email
        this.usersService.updateUser(this.clickedRow);
      }
    });

    this.roleInput.valueChanges.pipe(
      debounceTime(3000),
      distinctUntilChanged()
    ).subscribe(value => {
      // Call your function here, e.g., performSearch(searchTerm)
      if(this.clickedRow){
        this.clickedRow.role = value ?? this.clickedRow.role
        this.usersService.updateUser(this.clickedRow);
      }
    });
  }

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

  constructor(private usersService: UsersService){
    console.log("users: ", this.users)
  }

  ngOnDestroy() {
    this.nameSub.complete();
  }
}
