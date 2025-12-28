import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-product.html',
  styleUrl: './add-product.css'
})
export class AddProduct {

  name = '';
  description = '';
  price: number | null = null;
  message = '';

  private apiUrl = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient, private router: Router) {}

  addProduct() {
    const token = localStorage.getItem('token');

    const body = {
      name: this.name,
      description: this.description,
      price: this.price
    };

    this.http.post(
      `${this.apiUrl}/admin/products`,
      body,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    ).subscribe({
      next: () => {
        this.message = 'Product added successfully!';
        this.name = '';
        this.description = '';
        this.price = null;
      },
      error: () => {
        this.message = 'Only admin can add products';
      }
    });
  }
}
