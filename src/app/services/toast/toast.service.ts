import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor() { }

  toasts: { message: string; duration: number; type: 'success' | 'error' }[] = [];
 
  add(message: string, type: 'success' | 'error' = 'success', duration: number = 5000) {
    this.toasts.push({ message, duration, type });
    setTimeout(() => this.remove(0), duration);
  }

  remove(index: number) {
    this.toasts.splice(index, 1);
  }
}
