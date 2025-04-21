import { Component, effect } from '@angular/core';
import { LoginService } from '../../services/login/login.service';
import { DatePipe } from '@angular/common';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-home',
  standalone: true,
  imports: [NavbarComponent, RouterOutlet],
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.css'
})
export class AdminHomeComponent {
  
}
