import { Component } from '@angular/core';
import { ToastService } from '../../services/toast/toast.service';
import { NgFor } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [NgFor, MatCardModule, MatButtonModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css'
})
export class ToastComponent {
  constructor(public toastService: ToastService) {}
  removeToast(ind: number){
    this.toastService.remove(ind);
  }
}
