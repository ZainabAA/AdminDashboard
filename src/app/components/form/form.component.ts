import { Component, EventEmitter, Input, Output, output } from '@angular/core';
import { UsersService } from '../../services/users/users.service';
import { User } from '../../../data/users';
import { SelectionModel } from '@angular/cdk/collections';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { MatSelectChange } from '@angular/material/select';
@Component({
  selector: 'app-form',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule,
    MatButtonModule, MatSelectModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
  @Input() inputType!: "select" | "string";
  @Input() label!: string
  @Input() initValue: string = "";
  @Input() selectOptions: string[] = [];
  @Output() onSelectionChange = new EventEmitter();
  @Output() onInputChange = new EventEmitter();


  formCont = new FormControl(this.initValue);

  triggerSelectionChange(event: MatSelectChange){
    this.onSelectionChange.emit(event);
  }

  ngOnInit() {
    this.formCont = new FormControl(this.initValue);

    this.formCont.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(value => {
      // Call your function here, e.g., performSearch(searchTerm)
      this.onInputChange.emit(value)
    });
  }

}
