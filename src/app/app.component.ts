import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AdminHomeComponent } from "./pages/admin-home/admin-home.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { ToastComponent } from "./components/toast/toast.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AdminHomeComponent, NavbarComponent, ToastComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'admin-dashboard';
}
