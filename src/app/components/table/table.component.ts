import { Component, EventEmitter, Input, Output } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import { FormComponent } from "../form/form.component";
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule,
    MatButtonModule, MatSelectModule, FormComponent, TitleCasePipe],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {

  @Input() dataSource!: any[];
  @Input() columnMeta!: object;
  @Output() deleteAction = new EventEmitter();
  @Output() inputChange = new EventEmitter();

  clickedRow: any | null = null;

  editClickedRow(row: any){
    this.clickedRow = row;
  }

  deleteRow(){
    this.deleteAction.emit();
  }

  onInputChange(){

  }
}
