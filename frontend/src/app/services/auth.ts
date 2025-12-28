import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {jwtDecode} from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient) {}

  register(username: string, password: string, firstname: string, lastname: string, phone: string) {
    const params = new HttpParams()
      .set('username', username)
      .set('password', password)
      .set('firstname', firstname)
      .set('lastname', lastname)
      .set('phone', phone);

    return this.http.post(
      `${this.apiUrl}/register`,
      null,
      { params }
    );
  }

  login(username: string, password: string) {
  const body = new URLSearchParams();
  body.set('username', username);
  body.set('password', password);

  return this.http.post<any>(
    `${this.apiUrl}/login`,
    body.toString(),
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
  );
}

 getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getRole(): string | null {
    const token = this.getToken();
    if (!token) return null;

    const decoded: any = jwtDecode(token);
    return decoded.role; // backend must send role
  }

  isAdmin(): boolean {
    return this.getRole() === 'admin';
  }

  isUser(): boolean {
    return this.getRole() === 'user';
  }

}
