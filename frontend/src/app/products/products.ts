import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../services/product';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.html',
  styleUrls: ['./products.css']
})
export class Products implements OnInit {

  products: any[] = [];
  error: string = '';

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (data: any[]) => {
        this.products = data;
      },
      error: () => {
        this.error = 'Unauthorized or server error';
      }
    });
  }

  addToCart(productId: number) {
    this.productService.addToCart(productId).subscribe({
      next: () => {
        alert('Product added to cart');
      },
      error: () => {
        alert('Failed to add to cart');
      }
    });
  }

   
}
