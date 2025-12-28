import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {

  username: string = '';
  password: string = '';
  message: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login() {
  this.authService.login(this.username, this.password).subscribe({
    next: (res) => {
      localStorage.setItem('token', res.access_token);
      this.message = 'Login successful! Redirecting...';

      setTimeout(() => {
        if (this.authService.isAdmin()) {
          this.router.navigate(['/add-product']);
        } else {
          this.router.navigate(['/products']);
        }

      }, 1000);
    },
    error: () => {
      this.message = 'Invalid credentials';
    }
  });
}

}
