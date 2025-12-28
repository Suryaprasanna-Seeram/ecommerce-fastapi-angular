import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class Register {

  username: string = '';
  password: string = '';
  firstname: string= '';
  lastname: string='';
  phone: string='';
  message: string = '';

  usernamePattern = '^[A-Za-z_][A-Za-z0-9_]*$';
  phonePattern = '^[0-9]{10}$';

  constructor(private authService: AuthService,
    private router: Router
  ) {}

   register(form: any) {
    if (form.invalid) {
       this.message = 'Please correct the highlighted errors';
     return;
   }
    this.authService.register(this.username, this.password, this.firstname, this.lastname, this.phone).subscribe({
      next: () => {
        this.message = 'Registration successful';
         this.username = '';
         this.password = '';
         this.firstname='';
         this.lastname='';
         this.phone='';
         this.router.navigate(['/login']);
      },
      error: () => {
        this.message = 'Registration failed';
      }
    });
  }
}
