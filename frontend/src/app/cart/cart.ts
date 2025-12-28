import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../services/product';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.html',
  styleUrls: ['./cart.css']
})
export class CartComponent implements OnInit {

  cartItems: any[] = [];
  error = '';
  message = '';   

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart() {
    this.productService.getCart().subscribe({
      next: (data) => {
        this.cartItems = data;
      },
      error: () => {
        this.error = 'Failed to load cart';
      }
    });
  }

  removeItem(productId: number) {
  this.productService.removeFromCart(productId).subscribe({
    next: () => {
      this.message = 'Item removed from cart';

      // wait before refreshing cart
      setTimeout(() => {
        this.loadCart();
        this.message = '';
      }, 1500);
    },
    error: () => {
      this.error = 'Failed to remove item';
    }
  });
}

}
