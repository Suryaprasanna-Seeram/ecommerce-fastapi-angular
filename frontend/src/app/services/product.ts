import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders ,HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient) {}

  getProducts() {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<any[]>(`${this.apiUrl}/products`, { headers });
  }

  addToCart(productId: number, quantity: number = 1) {
  const token = localStorage.getItem('token');

  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
  });

  const params = {
    product_id: productId,
    quantity: quantity
  };

  return this.http.post(
    `${this.apiUrl}/cart/add`,
    null,
    { headers, params }
  );
}
// get cart 
getCart() {
  const token = localStorage.getItem('token');

  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
  });

  return this.http.get<any[]>(`${this.apiUrl}/cart`, { headers });
}

//  remove cart
removeFromCart(productId: number) {
  const token = localStorage.getItem('token');

  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
  });

  const params = new HttpParams()
    .set('product_id', productId);

  return this.http.delete(
    `${this.apiUrl}/cart/remove`,
    { headers, params }
  );
}

 
}
